import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, Settings, Award, Calendar } from "lucide-react";
import SidebarMenu from "../components/SidebarMenu";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: auth.currentUser?.displayName || "John Doe",
    email: auth.currentUser?.email || "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate task organizer and productivity enthusiast. Love turning chaos into order!",
    joinDate: "March 2024",
    completedTasks: 247,
    activeGoals: 8
  });

  const handleSave = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: profileData.displayName
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-400">Manage your account information and preferences</p>
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
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                  {profileData.displayName.charAt(0).toUpperCase()}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Camera size={16} />
                </motion.button>
              </div>

              <h2 className="text-2xl font-bold mb-2">{profileData.displayName}</h2>
              <p className="text-gray-400 mb-4">{profileData.email}</p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-purple-400">{profileData.completedTasks}</div>
                  <div className="text-xs text-gray-400">Completed Tasks</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="w-6 h-6 text-pink-400" />
                  </div>
                  <div className="text-2xl font-bold text-pink-400">{profileData.activeGoals}</div>
                  <div className="text-xs text-gray-400">Active Goals</div>
                </div>
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
                    onClick={() => setIsEditing(false)}
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
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <User size={16} />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                  />
                ) : (
                  <p className="p-3 bg-white/5 border border-white/10 rounded-xl">{profileData.displayName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <p className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400">{profileData.email} (Cannot be changed)</p>
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Phone size={16} />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                  />
                ) : (
                  <p className="p-3 bg-white/5 border border-white/10 rounded-xl">{profileData.phone}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <MapPin size={16} />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                  />
                ) : (
                  <p className="p-3 bg-white/5 border border-white/10 rounded-xl">{profileData.location}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  About Me
                </label>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                  />
                ) : (
                  <p className="p-3 bg-white/5 border border-white/10 rounded-xl">{profileData.bio}</p>
                )}
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Member Since
                </label>
                <p className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400">{profileData.joinDate}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Settings Section */}
        <motion.div
          variants={itemVariants}
          className="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Settings size={24} />
            Account Settings
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Settings size={20} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium group-hover:text-purple-300 transition-colors">Notification Settings</h4>
                  <p className="text-sm text-gray-400">Manage your notification preferences</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                  <User size={20} className="text-pink-400" />
                </div>
                <div>
                  <h4 className="font-medium group-hover:text-pink-300 transition-colors">Privacy Settings</h4>
                  <p className="text-sm text-gray-400">Control your privacy and data</p>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;