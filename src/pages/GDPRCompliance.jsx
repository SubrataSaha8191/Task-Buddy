import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Download, Trash2, Edit, Eye, Mail, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GDPRCompliance = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const [requestType, setRequestType] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleDataRequest = (type) => {
    setRequestType(type);
    // In a real app, this would trigger an API call
    setTimeout(() => {
      setRequestSubmitted(true);
      setTimeout(() => setRequestSubmitted(false), 3000);
    }, 500);
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

  const gdprRights = [
    {
      icon: Eye,
      title: "Right to Access",
      description: "You have the right to know what personal data we hold about you and how it's being processed.",
      action: "Request Data Copy",
      actionType: "access"
    },
    {
      icon: Edit,
      title: "Right to Rectification",
      description: "You can request corrections to any inaccurate or incomplete personal data we hold.",
      action: "Request Correction",
      actionType: "rectification"
    },
    {
      icon: Trash2,
      title: "Right to Erasure",
      description: "You can request deletion of your personal data under certain circumstances.",
      action: "Request Deletion",
      actionType: "erasure"
    },
    {
      icon: Download,
      title: "Right to Data Portability",
      description: "You can receive your personal data in a structured, machine-readable format.",
      action: "Export Data",
      actionType: "portability"
    }
  ];

  const dataProcessingInfo = [
    {
      category: "Account Information",
      data: ["Name", "Email address", "Profile picture", "Account preferences"],
      purpose: "Account management and authentication",
      retention: "Active account + 2 years after deletion",
      lawfulBasis: "Contract performance"
    },
    {
      category: "Task & Goal Data",
      data: ["Tasks", "Goals", "Progress tracking", "Productivity metrics"],
      purpose: "Service delivery and personalization",
      retention: "Active account + 1 year after deletion",
      lawfulBasis: "Contract performance"
    },
    {
      category: "Usage Analytics",
      data: ["Feature usage", "Performance metrics", "Error logs"],
      purpose: "Service improvement and support",
      retention: "2 years",
      lawfulBasis: "Legitimate interest"
    },
    {
      category: "Communication Data",
      data: ["Support messages", "Email communications", "Notification preferences"],
      purpose: "Customer support and communication",
      retention: "3 years",
      lawfulBasis: "Contract performance"
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
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">GDPR Compliance</h1>
                <p className="text-sm text-gray-400">Last updated: {currentDate}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="max-w-6xl mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Introduction */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Shield className="text-green-400" size={24} />
              Your Data Protection Rights
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Under the General Data Protection Regulation (GDPR), you have several rights regarding 
              your personal data. TaskBuddy is committed to respecting these rights and making it 
              easy for you to exercise them.
            </p>
          </div>
        </motion.div>

        {/* Request Status */}
        {requestSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 flex items-center gap-3">
              <CheckCircle className="text-green-400" size={24} />
              <div>
                <h3 className="font-medium text-green-400">Request Submitted Successfully</h3>
                <p className="text-sm text-gray-300">
                  Your {requestType} request has been submitted. We'll process it within 30 days and contact you via email.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Your GDPR Rights */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Exercise Your Rights</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {gdprRights.map((right, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                    <right.icon size={20} className="text-green-400" />
                  </div>
                  <h4 className="font-medium">{right.title}</h4>
                </div>
                <p className="text-gray-300 text-sm mb-4">{right.description}</p>
                <motion.button
                  onClick={() => handleDataRequest(right.actionType)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {right.action}
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Processing Information */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-xl font-semibold mb-6">How We Process Your Data</h3>
          <div className="space-y-6">
            {dataProcessingInfo.map((info, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h4 className="font-medium text-lg mb-4 text-green-400">{info.category}</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-2 text-gray-300">Data Collected:</h5>
                    <ul className="space-y-1 text-sm text-gray-400">
                      {info.data.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-gray-300">Purpose:</h5>
                      <p className="text-sm text-gray-400">{info.purpose}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-300">Retention Period:</h5>
                      <p className="text-sm text-gray-400">{info.retention}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-300">Lawful Basis:</h5>
                      <p className="text-sm text-gray-400">{info.lawfulBasis}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Protection Officer */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Mail className="text-blue-400" size={24} />
              Data Protection Officer
            </h3>
            <p className="text-gray-300 mb-4">
              Our Data Protection Officer (DPO) oversees our data protection practices and is your 
              primary contact for all GDPR-related matters.
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong>Email:</strong> dpo@taskbuddy.com</p>
              <p><strong>Address:</strong> Data Protection Officer, TaskBuddy Inc., 123 GDPR Street, San Francisco, CA 94102</p>
              <p><strong>Response Time:</strong> We aim to respond to all inquiries within 72 hours</p>
            </div>
          </div>
        </motion.div>

        {/* Important Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div variants={itemVariants}>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 h-full">
              <h4 className="font-medium mb-4 flex items-center gap-3">
                <Clock className="text-yellow-400" size={20} />
                Processing Timeframes
              </h4>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Data Access Requests:</span>
                  <span className="text-yellow-400">30 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Correction:</span>
                  <span className="text-yellow-400">30 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Deletion:</span>
                  <span className="text-yellow-400">30 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Portability:</span>
                  <span className="text-yellow-400">30 days</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 h-full">
              <h4 className="font-medium mb-4 flex items-center gap-3">
                <AlertTriangle className="text-orange-400" size={20} />
                Supervisory Authority
              </h4>
              <div className="space-y-3 text-sm text-gray-300">
                <p>You have the right to lodge a complaint with your local data protection authority if you believe we have not handled your data properly.</p>
                <div className="space-y-1">
                  <p><strong>EU Residents:</strong> Your national data protection authority</p>
                  <p><strong>US Residents:</strong> FTC or state attorney general</p>
                  <p><strong>Other Regions:</strong> Local privacy regulator</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Shield className="text-purple-400" size={24} />
              Need Help with Your Rights?
            </h3>
            <p className="text-gray-300 mb-4">
              Our privacy team is here to help you exercise your data protection rights. 
              Contact us for any questions or assistance.
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong>Privacy Team:</strong> privacy@taskbuddy.com</p>
              <p><strong>GDPR Inquiries:</strong> gdpr@taskbuddy.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567 (GDPR Hotline)</p>
              <p><strong>Response Time:</strong> Within 72 hours for urgent matters</p>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            This GDPR Compliance page was last updated on {currentDate}. We regularly review 
            and update our data protection practices to ensure continued compliance.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GDPRCompliance;