import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// NOTE: File renamed from PrivacyPolicy.jsx to avoid ad/privacy blockers (ERR_BLOCKED_BY_CLIENT)
const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

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

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, profile information you provide when creating an account",
        "Usage Data: How you interact with TaskBuddy, features used, time spent, and performance metrics",
        "Device Information: Browser type, operating system, IP address, and device identifiers",
        "Task and Goal Data: The tasks, goals, and productivity information you create and manage in the app"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Provide and maintain TaskBuddy services and functionality",
        "Personalize your experience and improve our algorithms",
        "Send you important updates, notifications, and support communications",
        "Analyze usage patterns to enhance our product features",
        "Ensure security and prevent fraud or unauthorized access"
      ]
    },
    {
      icon: Shield,
      title: "Data Protection & Security",
      content: [
        "We use industry-standard encryption (AES-256) to protect your data",
        "All data transmission is secured using TLS/SSL protocols",
        "Regular security audits and vulnerability assessments",
        "Access controls and authentication mechanisms for all systems",
        "Data backup and disaster recovery procedures in place"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights & Controls",
      content: [
        "Access: Request a copy of all personal data we hold about you",
        "Correction: Update or correct any inaccurate personal information",
        "Deletion: Request deletion of your account and associated data",
        "Portability: Export your data in a common, machine-readable format",
        "Objection: Opt-out of certain data processing activities"
      ]
    },
    {
      icon: Lock,
      title: "Data Sharing & Third Parties",
      content: [
        "We do not sell your personal information to third parties",
        "Limited sharing with trusted service providers (hosting, analytics) under strict agreements",
        "Data may be disclosed if required by law or to protect our rights",
        "Anonymous, aggregated data may be used for research and product improvement",
        "You can control data sharing preferences in your account settings"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Data Retention & Deletion",
      content: [
        "Active account data is retained while your account is active",
        "Inactive accounts may be deleted after 2 years of inactivity",
        "You can request immediate account deletion at any time",
        "Some data may be retained for legal compliance (up to 7 years)",
        "Anonymized analytics data may be retained indefinitely"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
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
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Privacy Policy</h1>
                <p className="text-sm text-gray-400">Last updated: {currentDate}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="max-w-6xl mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Shield className="text-purple-400" size={24} />
              Your Privacy Matters
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              At TaskBuddy, we are committed to protecting your privacy and ensuring transparency 
              about how we collect, use, and safeguard your personal information. This Privacy Policy 
              explains our practices and your rights regarding your data.
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:bg-gray-800/70 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                  <section.icon size={24} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-12">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <UserCheck className="text-blue-400" size={24} />
              Questions About Your Privacy?
            </h3>
            <p className="text-gray-300 mb-4">
              If you have any questions about this Privacy Policy or how we handle your data, 
              please don't hesitate to contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong>Email:</strong> privacy@taskbuddy.com</p>
              <p><strong>Address:</strong> TaskBuddy Inc., 123 Privacy Lane, San Francisco, CA 94102</p>
              <p><strong>Data Protection Officer:</strong> dpo@taskbuddy.com</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            This Privacy Policy was last updated on {currentDate}. We may update this policy 
            from time to time, and we will notify you of any significant changes.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;