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

  // Load profile data from localStorage on mount
  useEffect(() => {
    const loadProfileData = () => {
      try {
        const storedProfile = localStorage.getItem("taskbuddy-profile");
        const currentUser = auth.currentUser;
        
        if (storedProfile) {
          const parsedProfile = JSON.parse(storedProfile);
          setProfileData({
            ...parsedProfile,
            // Always sync email from Firebase if available
            email: currentUser?.email || parsedProfile.email,
            // Sync display name from Firebase if not set in local storage
            displayName: parsedProfile.displayName || currentUser?.displayName || ""
          });
        } else if (currentUser) {
          // Initialize with Firebase data if no stored profile
          setProfileData(prev => ({
            ...prev,
            displayName: currentUser.displayName || "",
            email: currentUser.email || ""
          }));
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadProfileData();
  }, []);

  // Save to localStorage whenever profileData changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("taskbuddy-profile", JSON.stringify(profileData));
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