import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Settings, Eye, BarChart, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CookiePolicy = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const [cookieSettings, setCookieSettings] = useState({
    essential: true, // Always enabled
    functional: true,
    analytics: false,
    marketing: false
  });

  const handleCookieToggle = (type) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const cookieTypes = [
    {
      id: 'essential',
      icon: Shield,
      title: "Essential Cookies",
      description: "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.",
      examples: [
        "Authentication tokens to keep you logged in",
        "Session identifiers for maintaining your session",
        "Security tokens to prevent cross-site attacks",
        "Load balancing cookies for website performance"
      ],
      enabled: cookieSettings.essential,
      required: true
    },
    {
      id: 'functional',
      icon: Settings,
      title: "Functional Cookies",
      description: "These cookies enhance functionality and personalization. They remember your preferences and settings to improve your experience.",
      examples: [
        "Theme preferences (dark/light mode)",
        "Language and region settings",
        "Dashboard layout preferences",
        "Recently accessed tasks and goals"
      ],
      enabled: cookieSettings.functional,
      required: false
    },
    {
      id: 'analytics',
      icon: BarChart,
      title: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: [
        "Page views and popular features",
        "Time spent on different sections",
        "User journey and navigation patterns",
        "Performance metrics and error tracking"
      ],
      enabled: cookieSettings.analytics,
      required: false
    },
    {
      id: 'marketing',
      icon: Eye,
      title: "Marketing Cookies",
      description: "These cookies track your activity across websites to show you relevant advertisements and measure advertising effectiveness.",
      examples: [
        "Advertising identifiers and preferences",
        "Social media integration cookies",
        "Retargeting and remarketing data",
        "Campaign performance tracking"
      ],
      enabled: cookieSettings.marketing,
      required: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.div 
        className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </motion.button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Cookie size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Cookie Policy</h1>
                <p className="text-sm text-gray-400">Last updated: {currentDate}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="max-w-4xl mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Introduction */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Cookie className="text-orange-400" size={24} />
              About Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              understanding how you use TaskBuddy.
            </p>
            <p className="text-gray-300 leading-relaxed">
              You have control over which cookies we use. Essential cookies are required for the 
              website to function, but you can choose whether to allow other types of cookies.
            </p>
          </div>
        </motion.div>

        {/* Cookie Settings */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <Settings className="text-purple-400" size={24} />
              Cookie Preferences
            </h3>
            <p className="text-gray-300 mb-6">
              Customize your cookie preferences below. Changes will take effect immediately.
            </p>
            <div className="grid gap-4">
              {cookieTypes.map((cookie) => (
                <div key={cookie.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <cookie.icon size={20} className="text-orange-400" />
                      <h4 className="font-medium">{cookie.title}</h4>
                      {cookie.required && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-md border border-red-500/30">
                          Required
                        </span>
                      )}
                    </div>
                    <motion.button
                      onClick={() => handleCookieToggle(cookie.id)}
                      disabled={cookie.required}
                      className={`p-1 ${cookie.required ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {cookie.enabled ? (
                        <ToggleRight size={24} className="text-green-400" />
                      ) : (
                        <ToggleLeft size={24} className="text-gray-500" />
                      )}
                    </motion.button>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{cookie.description}</p>
                  <div className="text-sm text-gray-500">
                    <p className="mb-2"><strong>Examples:</strong></p>
                    <ul className="space-y-1">
                      {cookie.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div variants={itemVariants}>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-3">
                <Shield className="text-blue-400" size={20} />
                Managing Cookies
              </h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>You can control cookies through:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Browser settings to block or delete cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Our cookie preference center above</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Third-party opt-out tools for advertising cookies</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-3">
                <BarChart className="text-green-400" size={20} />
                Third-Party Cookies
              </h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>We may use third-party services that set cookies:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Google Analytics for website analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Social media platforms for sharing features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Payment processors for secure transactions</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Eye className="text-cyan-400" size={24} />
              Questions About Cookies?
            </h3>
            <p className="text-gray-300 mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong>Email:</strong> cookies@taskbuddy.com</p>
              <p><strong>Privacy Team:</strong> privacy@taskbuddy.com</p>
              <p><strong>Address:</strong> TaskBuddy Inc., 123 Cookie Lane, San Francisco, CA 94102</p>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            This Cookie Policy was last updated on {currentDate}. We may update this policy 
            from time to time to reflect changes in our practices or legal requirements.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CookiePolicy;