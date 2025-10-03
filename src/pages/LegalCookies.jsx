import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Settings, Eye, BarChart, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// NOTE: File renamed from CookiePolicy.jsx to avoid ad/privacy blockers (ERR_BLOCKED_BY_CLIENT)
const CookiePolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  const handleCookieToggle = (type) => {
    if (type === 'essential') return;
    setCookieSettings(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

  const cookieTypes = [
    { id: 'essential', icon: Shield, title: 'Essential Cookies', desc: 'Necessary for core functionality.', examples: ['Auth session', 'Security token', 'Load balancer', 'CSRF protection'], req: true },
    { id: 'functional', icon: Settings, title: 'Functional Cookies', desc: 'Store preferences and personalization.', examples: ['Theme mode', 'Language', 'Recent panels', 'Layout choices'], req: false },
    { id: 'analytics', icon: BarChart, title: 'Analytics Cookies', desc: 'Anonymous usage insights.', examples: ['Feature usage', 'Page timings', 'Navigation flows', 'Error events'], req: false },
    { id: 'marketing', icon: Eye, title: 'Marketing Cookies', desc: 'Ad relevance & measurement.', examples: ['Ad impressions', 'Campaign source', 'Social share tracking', 'Retarget flags'], req: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.div className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <motion.button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white" whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
              <ArrowLeft size={20} /> <span>Back</span>
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

      <motion.div className="max-w-6xl mx-auto px-6 py-12" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><Cookie className="text-orange-400" size={24} /> About Cookies</h2>
            <p className="text-gray-300 mb-4">Cookies store small pieces of data that let TaskBuddy remember preferences and understand usage patterns to improve your experience.</p>
            <p className="text-gray-300">You may disable non-essential categories below; essential cookies are required for secure operation.</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3"><Settings className="text-purple-400" size={24} /> Cookie Preferences</h3>
            <div className="grid gap-5">
              {cookieTypes.map(ct => (
                <div key={ct.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <ct.icon size={20} className="text-orange-400" />
                      <h4 className="font-medium">{ct.title}</h4>
                      {ct.req && <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-md border border-red-500/30">Required</span>}
                    </div>
                    <motion.button onClick={() => !ct.req && handleCookieToggle(ct.id)} disabled={ct.req} whileTap={{ scale: 0.95 }} className={`p-1 ${ct.req ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {cookieSettings[ct.id] ? <ToggleRight size={26} className="text-green-400" /> : <ToggleLeft size={26} className="text-gray-500" />}
                    </motion.button>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{ct.desc}</p>
                  <p className="text-gray-500 text-xs mb-1 font-medium">Examples:</p>
                  <ul className="grid sm:grid-cols-2 gap-1 text-xs text-gray-400">
                    {ct.examples.map((ex,i)=>(
                      <li key={i} className="flex items-start gap-1"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1"/> {ex}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div variants={itemVariants} className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3"><Shield className="text-blue-400" size={20} /> Managing Cookies</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"/>Browser settings can block or clear cookies</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"/>Use this preference panel anytime</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"/>Opt-out tools from analytics providers</li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3"><BarChart className="text-green-400" size={20} /> Third-Party Cookies</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"/>Analytics (usage patterns)</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"/>Performance monitoring</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"/>Optional social embeds</li>
            </ul>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3"><Eye className="text-cyan-400" size={24} /> Questions About Cookies?</h3>
          <p className="text-gray-300 mb-4">Reach out to our privacy team with any questions about how TaskBuddy uses cookies on the platform.</p>
          <div className="space-y-1 text-gray-300 text-sm">
            <p><strong>Email:</strong> cookies@taskbuddy.com</p>
            <p><strong>Privacy Team:</strong> privacy@taskbuddy.com</p>
            <p><strong>Address:</strong> TaskBuddy Inc., 123 Cookie Lane, San Francisco, CA 94102</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-sm text-gray-500">This Cookie Policy was last updated on {currentDate}. Updates may follow product or regulatory changes.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CookiePolicy;