// src/components/SidebarMenu.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Calendar, Target, Menu, LogOut, User, Settings } from "lucide-react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";
import LogoutModal from "./LogoutModal";
import { useUserProfile } from "../context/UserProfileContext";
import { useSidebar } from "../context/SidebarContext";

export default function SidebarMenu() {
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isOpen, isMobile, toggleSidebar, closeSidebar, openSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData } = useUserProfile();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Get display name or fallback to email or default
  const getDisplayName = () => {
    if (profileData.displayName) return profileData.displayName;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return "User";
  };

  const handleLogout = async () => {
    try {
      // Note: We don't remove profile data anymore as each user has their own storage
      // Profile data is now stored per user UID, so it will persist correctly
      
      await signOut(auth);
      setShowLogoutModal(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  // Helper function to handle navigation on mobile
  const handleMobileNavigation = () => {
    if (isMobile) {
      closeSidebar();
    }
  };

  const linkClasses = (path) =>
    `flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group relative overflow-hidden ${
      location.pathname === path ? 
        "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg" : 
        "text-gray-300 hover:text-white"
    }`;

  const sidebarVariants = {
    open: { 
      width: "256px",
      x: 0
    },
    closed: { 
      width: "80px",
      x: 0
    },
    hidden: {
      width: "256px", 
      x: "-100%"
    }
  };

  const linkVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 }
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      <motion.div
        animate={isMobile && !isOpen ? "hidden" : isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white h-screen p-4 flex flex-col border-r border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden fixed left-0 top-0 z-50"
      >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-40 right-4 w-12 h-12 bg-pink-500/10 rounded-full blur-lg animate-pulse delay-1000" />

      {/* Logo + Toggle */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <motion.h1
          animate={isOpen ? "open" : "closed"}
          variants={linkVariants}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent whitespace-nowrap"
        >
          {isOpen && "TaskBuddy"}
        </motion.h1>

        <motion.button
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-300"
        >
          <Menu size={20} />
        </motion.button>
      </div>

      {/* Profile Section */}
      <motion.div 
        className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm relative z-10"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Link to="/profile" className="flex items-center gap-3 group" onClick={handleMobileNavigation}>
          <div className="relative w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            {profileData.profileImage ? (
              <img 
                src={profileData.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            ) : (
              <User size={18} className="text-white" />
            )}
          </div>
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={linkVariants}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex-1"
          >
            {isOpen && (
              <div>
                <p className="font-medium text-white group-hover:text-purple-300 transition-colors">{getDisplayName()}</p>
                <p className="text-xs text-gray-400">View Profile</p>
              </div>
            )}
          </motion.div>
        </Link>
      </motion.div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 flex-1 relative z-10">
        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
          <Link to="/dashboard" className={linkClasses("/dashboard")} onClick={handleMobileNavigation}>
            <Home size={22} className="group-hover:text-purple-400 transition-colors" />
            <motion.span
              animate={isOpen ? "open" : "closed"}
              variants={linkVariants}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {isOpen && "Dashboard"}
            </motion.span>
            {location.pathname === "/dashboard" && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute right-2 w-2 h-2 bg-purple-400 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            )}
          </Link>
        </motion.div>

        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
          <Link to="/daily" className={linkClasses("/daily")} onClick={handleMobileNavigation}>
            <ClipboardList size={22} className="group-hover:text-purple-400 transition-colors" />
            <motion.span
              animate={isOpen ? "open" : "closed"}
              variants={linkVariants}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {isOpen && "Daily Tasks"}
            </motion.span>
            {location.pathname === "/daily" && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute right-2 w-2 h-2 bg-purple-400 rounded-full"
              />
            )}
          </Link>
        </motion.div>

        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
          <Link to="/weekly" className={linkClasses("/weekly")} onClick={handleMobileNavigation}>
            <Calendar size={22} className="group-hover:text-purple-400 transition-colors" />
            <motion.span
              animate={isOpen ? "open" : "closed"}
              variants={linkVariants}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {isOpen && "Weekly Tasks"}
            </motion.span>
            {location.pathname === "/weekly" && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute right-2 w-2 h-2 bg-purple-400 rounded-full"
              />
            )}
          </Link>
        </motion.div>

        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
          <Link to="/goals" className={linkClasses("/goals")} onClick={handleMobileNavigation}>
            <Target size={22} className="group-hover:text-purple-400 transition-colors" />
            <motion.span
              animate={isOpen ? "open" : "closed"}
              variants={linkVariants}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {isOpen && "Goals"}
            </motion.span>
            {location.pathname === "/goals" && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute right-2 w-2 h-2 bg-purple-400 rounded-full"
              />
            )}
          </Link>
        </motion.div>

        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
          <Link to="/settings" className={linkClasses("/settings")} onClick={handleMobileNavigation}>
            <Settings size={22} className="group-hover:text-purple-400 transition-colors" />
            <motion.span
              animate={isOpen ? "open" : "closed"}
              variants={linkVariants}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {isOpen && "Settings"}
            </motion.span>
            {location.pathname === "/settings" && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute right-2 w-2 h-2 bg-purple-400 rounded-full"
              />
            )}
          </Link>
        </motion.div>
      </nav>

      {/* Logout Button */}
      <motion.div 
        className="mt-auto pt-4 border-t border-white/10 relative z-10"
        whileHover={{ x: 4 }} 
        transition={{ duration: 0.2 }}
      >
        <motion.button
          onClick={openLogoutModal}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 group"
        >
          <LogOut size={22} className="group-hover:rotate-12 transition-transform" />
          <motion.span
            animate={isOpen ? "open" : "closed"}
            variants={linkVariants}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {isOpen && "Logout"}
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Logout Confirmation Modal */}
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={closeLogoutModal}
        onConfirm={handleLogout}
      />
    </motion.div>

    {/* Mobile Menu Button - Fixed position when sidebar is closed */}
    {isMobile && !isOpen && (
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openSidebar}
        className="fixed top-4 left-4 z-50 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 md:hidden"
      >
        <Menu size={20} />
      </motion.button>
    )}
    </>
  );
}
