// Debug utility for Profile data
// Run this in browser console to check and fix profile data

console.log("=== Profile Data Debug ===");

// Check all localStorage keys
const allKeys = Object.keys(localStorage);
console.log("All localStorage keys:", allKeys);

// Find profile-related keys
const profileKeys = allKeys.filter(key => key.includes('profile'));
console.log("Profile keys:", profileKeys);

// Check each profile key
profileKeys.forEach(key => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    console.log(`${key}:`, data);
    
    // Fix if displayName contains "Profile"
    if (data.displayName && data.displayName.toLowerCase().includes('profile')) {
      console.log(`Fixing ${key} - removing "Profile" from displayName`);
      data.displayName = ""; // Clear it so it falls back to Firebase name
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`Fixed ${key}:`, data);
    }
  } catch (e) {
    console.error(`Error parsing ${key}:`, e);
  }
});

// Check Firebase auth
if (window.auth && window.auth.currentUser) {
  console.log("Firebase user:", {
    displayName: window.auth.currentUser.displayName,
    email: window.auth.currentUser.email,
    uid: window.auth.currentUser.uid
  });
}

console.log("=== End Debug ===");

// Quick fix function
window.fixProfile = () => {
  const profileKeys = Object.keys(localStorage).filter(key => key.includes('profile'));
  profileKeys.forEach(key => {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (data.displayName && data.displayName.toLowerCase().includes('profile')) {
        data.displayName = "Subrata Saha"; // Set the correct name
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`Fixed ${key} with name "Subrata Saha"`);
      }
    } catch (e) {
      console.error(`Error fixing ${key}:`, e);
    }
  });
  console.log("Profile fix complete! Refresh the page.");
};

console.log("Run fixProfile() to manually set the correct name");