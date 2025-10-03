import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Scale, AlertCircle, Users, CreditCard, Shield, Gavel } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
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
      icon: Users,
      title: "Acceptance of Terms",
      content: [
        "By accessing or using TaskBuddy, you agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please do not use our service",
        "We may update these terms from time to time, and continued use constitutes acceptance",
        "You must be at least 13 years old to use TaskBuddy"
      ]
    },
    {
      icon: FileText,
      title: "Service Description",
      content: [
        "TaskBuddy is a productivity and task management application",
        "We provide tools for organizing tasks, setting goals, and tracking progress",
        "Features include task creation, goal setting, progress tracking, and productivity analytics",
        "We reserve the right to modify, suspend, or discontinue any part of the service"
      ]
    },
    {
      icon: CreditCard,
      title: "Account Registration & Billing",
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the security of your account credentials",
        "Subscription fees are billed in advance and are non-refundable except as required by law",
        "We may change pricing with 30 days notice to existing subscribers",
        "Free accounts may have limited features and usage restrictions"
      ]
    },
    {
      icon: Shield,
      title: "User Conduct & Responsibilities",
      content: [
        "You agree to use TaskBuddy only for lawful purposes",
        "You will not attempt to gain unauthorized access to our systems",
        "You will not upload malicious code, spam, or inappropriate content",
        "You are responsible for all activities that occur under your account",
        "You will not share your account credentials with others"
      ]
    },
    {
      icon: Scale,
      title: "Intellectual Property",
      content: [
        "TaskBuddy and its content are protected by copyright, trademark, and other laws",
        "You retain ownership of the content you create (tasks, goals, notes)",
        "You grant us a license to use your content to provide the service",
        "You may not copy, modify, or distribute our software or content",
        "All TaskBuddy trademarks and logos are our exclusive property"
      ]
    },
    {
      icon: AlertCircle,
      title: "Limitation of Liability",
      content: [
        "TaskBuddy is provided 'as is' without warranties of any kind",
        "We are not liable for any indirect, incidental, or consequential damages",
        "Our total liability is limited to the amount you paid in the last 12 months",
        "We do not guarantee uninterrupted or error-free service",
        "You use TaskBuddy at your own risk"
      ]
    },
    {
      icon: Gavel,
      title: "Termination & Suspension",
      content: [
        "You may terminate your account at any time through your account settings",
        "We may suspend or terminate accounts that violate these terms",
        "Upon termination, your access to TaskBuddy will cease immediately",
        "We may retain some data as required by law or for legitimate business purposes",
        "Paid subscriptions will continue until the end of the billing period"
      ]
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Terms of Service</h1>
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
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Scale className="text-blue-400" size={24} />
              Legal Agreement
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              These Terms of Service govern your use of TaskBuddy and constitute a legally binding 
              agreement between you and TaskBuddy Inc. Please read these terms carefully before 
              using our service.
            </p>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:bg-gray-800/70 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                  <section.icon size={24} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Governing Law */}
        <motion.div variants={itemVariants} className="mt-12">
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Gavel className="text-amber-400" size={24} />
              Governing Law & Disputes
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                These Terms are governed by the laws of the State of California, United States, 
                without regard to conflict of law principles.
              </p>
              <p>
                Any disputes arising from these Terms or your use of TaskBuddy will be resolved 
                through binding arbitration in San Francisco, California.
              </p>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining 
                provisions will continue in full force and effect.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={itemVariants} className="mt-8">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Users className="text-green-400" size={24} />
              Questions About These Terms?
            </h3>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong>Email:</strong> legal@taskbuddy.com</p>
              <p><strong>Address:</strong> TaskBuddy Inc., 123 Legal Street, San Francisco, CA 94102</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            These Terms of Service were last updated on {currentDate}. We may update these terms 
            from time to time, and we will notify you of any material changes.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;