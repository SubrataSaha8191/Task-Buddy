import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

// Create context
const UserProfileContext = createContext();

// Provider component
export function UserProfileProvider({ children }) {
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    profileImage: null
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Load profile data from localStorage on mount and listen for auth changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      const loadProfileData = () => {
        try {
          if (!currentUser) {
            // User logged out, reset to empty profile
            setProfileData({
              displayName: "",
              email: "",
              phone: "",
              location: "",
              bio: "",
              profileImage: null
            });
            setIsLoaded(true);
            return;
          }

          // Use user-specific key in localStorage
          const userProfileKey = `taskbuddy-profile-${currentUser.uid}`;
          const storedProfile = localStorage.getItem(userProfileKey);
          
          if (storedProfile) {
            // Load existing profile for this specific user
            const parsedProfile = JSON.parse(storedProfile);
            
            // Clean up displayName if it contains "Profile" text (from old data)
            let cleanDisplayName = parsedProfile.displayName || currentUser?.displayName || "";
            if (cleanDisplayName && (cleanDisplayName.toLowerCase().includes('profile') || cleanDisplayName === 'Profile')) {
              cleanDisplayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || "";
            }
            
            const finalProfile = {
              ...parsedProfile,
              // Always sync email from Firebase if available
              email: currentUser?.email || parsedProfile.email,
              // Use cleaned display name
              displayName: cleanDisplayName,
              // Use Google profile photo if available and no custom image set
              profileImage: parsedProfile.profileImage || currentUser?.photoURL || null
            };
            
            setProfileData(finalProfile);
          } else if (currentUser) {
            // Initialize with Firebase data if no stored profile (new user or first login)
            const newProfile = {
              displayName: currentUser.displayName || "",
              email: currentUser.email || "",
              phone: "",
              location: "",
              bio: "",
              profileImage: currentUser.photoURL || null
            };
            
            setProfileData(newProfile);
            // Save the new profile to user-specific localStorage key
            localStorage.setItem(userProfileKey, JSON.stringify(newProfile));
          }
        } catch (error) {
          console.error("Error loading profile data:", error);
        } finally {
          setIsLoaded(true);
        }
      };

      loadProfileData();
    });

    return () => unsubscribe();
  }, []);

  // Save to localStorage whenever profileData changes
  useEffect(() => {
    if (isLoaded && auth.currentUser) {
      try {
        // Save to user-specific key
        const userProfileKey = `taskbuddy-profile-${auth.currentUser.uid}`;
        localStorage.setItem(userProfileKey, JSON.stringify(profileData));
      } catch (error) {
        console.error("Error saving profile data:", error);
      }
    }
  }, [profileData, isLoaded]);

  // Update profile data
  const updateProfileData = (updates) => {
    setProfileData(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Update profile image
  const updateProfileImage = (imageData) => {
    setProfileData(prev => ({
      ...prev,
      profileImage: imageData
    }));
  };

  // Reset profile data
  const resetProfileData = () => {
    const currentUser = auth.currentUser;
    setProfileData({
      displayName: currentUser?.displayName || "",
      email: currentUser?.email || "",
      phone: "",
      location: "",
      bio: "",
      profileImage: null
    });
  };

  // Get member since date
  const getMemberSinceDate = () => {
    if (auth.currentUser?.metadata?.creationTime) {
      const creationDate = new Date(auth.currentUser.metadata.creationTime);
      return creationDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
    }
    return "March 2024"; // fallback
  };

  const value = {
    profileData,
    updateProfileData,
    updateProfileImage,
    resetProfileData,
    getMemberSinceDate,
    isLoaded
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

// Custom hook
export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}