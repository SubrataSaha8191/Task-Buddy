import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, Settings, Award, Calendar } from "lucide-react";
import SidebarMenu from "../components/SidebarMenu";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useTasks } from "../context/TaskContext";
import { useGoals } from "../context/GoalContext";
import { useUserProfile } from "../context/UserProfileContext";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const { tasks } = useTasks();
  const { goals } = useGoals();
  const { 
    profileData, 
    updateProfileData, 
    updateProfileImage, 
    getMemberSinceDate,
    isLoaded 
  } = useUserProfile();
  
  // Calculate dynamic stats
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const activeGoalsCount = goals.length;

  // Local state for editing
  const [editData, setEditData] = useState({
    displayName: "",
    phone: "",
    location: "",
    bio: ""
  });

  // Update local edit data when profile data loads
  useEffect(() => {
    if (isLoaded) {
      setEditData({
        displayName: profileData.displayName || auth.currentUser?.displayName || "",
        phone: profileData.phone || "",
        location: profileData.location || "",
        bio: profileData.bio || ""
      });
    }
  }, [profileData, isLoaded]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    document.getElementById('profile-image-input').click();
  };

  const handleSave = async () => {
    try {
      // Update Firebase profile if displayName changed
      if (auth.currentUser && editData.displayName !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: editData.displayName
        });
      }

      // Update local profile data
      updateProfileData({
        displayName: editData.displayName,
        phone: editData.phone,
        location: editData.location,
        bio: editData.bio
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    // Reset to current profile data
    setEditData({
      displayName: profileData.displayName || auth.currentUser?.displayName || "",
      phone: profileData.phone || "",
      location: profileData.location || "",
      bio: profileData.bio || ""
    });
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <SidebarMenu />

      {/* Background Elements */}
      <div className="absolute -z-10 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content with left margin for fixed sidebar */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="ml-80 p-8 relative z-10 transition-all duration-300"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl h-12 font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="theme-text-muted">Manage your account information and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <div className="text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl overflow-hidden cursor-pointer"
                  onClick={() => profileData.profileImage && setShowImageModal(true)}
                  title={profileData.profileImage ? "Click to view full size" : "Upload a profile picture"}
                >
                  {profileData.profileImage ? (
                    <img 
                      src={profileData.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  ) : (
                    <User size={48} className="text-white" />
                  )}
                </motion.div>
                <input
                  id="profile-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={triggerImageUpload}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  title="Change profile picture"
                >
                  <Camera size={16} />
                </motion.button>
              </div>

              <h2 className="text-2xl font-bold mb-2">
                {profileData.displayName || auth.currentUser?.displayName || "User"}
              </h2>
              <p className="theme-text-muted mb-4">
                {profileData.email || auth.currentUser?.email || "No email available"}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-xl p-5 border border-purple-500/20 shadow-lg hover:shadow-purple-500/20 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Award className="w-6 h-6 theme-purple-bright" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold theme-purple-bright mb-1">{completedTasksCount}</div>
                  <div className="text-xs theme-purple-text font-medium">Completed Tasks</div>
                  
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-gradient-to-br from-pink-500/20 to-pink-600/30 rounded-xl p-5 border border-pink-500/20 shadow-lg hover:shadow-pink-500/20 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                      <Calendar className="w-6 h-6 theme-pink-bright" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold theme-pink-bright mb-1">{activeGoalsCount}</div>
                  <div className="text-xs theme-pink-text font-medium">Active Goals</div>
                  
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Information Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Personal Information</h3>
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl transition-all duration-300"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </motion.button>
              ) : (
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl transition-all duration-300"
                  >
                    <Save size={16} />
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl transition-all duration-300"
                  >
                    <X size={16} />
                    Cancel
                  </motion.button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium theme-label mb-2">
                  <User size={16} />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.displayName}
                    onChange={(e) => setEditData({ ...editData, displayName: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                  />
                ) : (
                  <p className="p-3 bg-white/5 border border-white/10 rounded-xl">{profileData.displayName || "Not set"}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium theme-label mb-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <p className="p-3 bg-white/5 border border-white/10 rounded-xl theme-text-secondary">{profileData.email || auth.currentUser?.email || "No email"} </p>
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium theme-label mb-2">
                  <Phone size={16} />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="p-3 bg-white/5 border border-white/10 rounded-xl">{profileData.phone || "Not set"}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium theme-label mb-2">
                  <MapPin size={16} />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                    placeholder="Enter your location"
                  />
                ) : (
                  <p className="p-3 bg-white/5 border border-white/10 rounded-xl">{profileData.location || "Not set"}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium theme-label mb-2">
                  About Me
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    rows={4}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="p-3 bg-white/5 border border-white/10 rounded-xl">{profileData.bio || "No bio added yet"}</p>
                )}
              </div>

              {/* Join Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium theme-label mb-2">
                  <Calendar size={16} />
                  Member Since
                </label>
                <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
                  <p className="theme-blue-bright font-medium">{getMemberSinceDate()}</p>
                  <p className="text-xs theme-text-muted mt-1">Joined Task-Buddy community</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Settings Section */}
        
      </motion.div>

      {/* Image Zoom Modal */}
      {showImageModal && profileData.profileImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowImageModal(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-[95vw] h-[95vh] p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center bg-black/20 rounded-2xl">
              <img 
                src={profileData.profileImage} 
                alt="Profile - Full Size" 
                className="w-auto h-auto rounded-2xl shadow-2xl"
                style={{ 
                  maxWidth: '90vw', 
                  maxHeight: '90vh',
                  minWidth: '60vw',
                  minHeight: '60vh',
                  objectFit: 'contain'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
                title="Close"
              >
                <X size={20} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;