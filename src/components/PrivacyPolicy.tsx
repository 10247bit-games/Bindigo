import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Lock, Eye, Server, UserCheck, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Information We Collect",
      content: [
        "Game statistics and performance data",
        "Device information for optimal gameplay",
        "User preferences and settings"
      ]
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "How We Use Your Information",
      content: [
        "Improve game performance and user experience",
        "Maintain game statistics and leaderboards",
        "Provide technical support",
        "Send important updates about the game"
      ]
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: "Data Storage and Security",
      content: [
        "We implement industry-standard security measures to protect your information",
        "Game data is stored locally on your device",
        "Data is synchronized with secure servers only during multiplayer modes"
      ]
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: "Your Rights",
      content: [
        "Access your personal data",
        "Request data deletion",
        "Opt-out of non-essential data collection",
        "Update your preferences"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-indigo-600 
                   transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br 
                          from-indigo-100 to-purple-100 rounded-full -translate-y-32 
                          translate-x-32 opacity-50" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 
                              rounded-xl shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text 
                               bg-gradient-to-r from-indigo-600 to-purple-600">
                    Privacy Policy
                  </h1>
                  <p className="text-gray-500 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                At BIDINGO, we value your privacy and are committed to protecting your personal information.
                This policy outlines how we collect, use, and safeguard your data while using our game.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl 
                         transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 
                                rounded-lg">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <span className="text-indigo-400 mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Contact Us</h2>
            </div>
            <p className="text-gray-600 mb-4">
              For privacy-related questions or concerns, please contact us at:
            </p>
            <a 
              href="mailto:privacy@bidingo.com"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r 
                       from-indigo-600 to-purple-600 text-white rounded-lg 
                       hover:from-indigo-700 hover:to-purple-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              privacy@bidingo.com
            </a>
          </motion.div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 
                         border border-indigo-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              By using BIDINGO, you agree to this Privacy Policy. We may update this
              policy periodically, and will notify you of any significant changes through
              the game or via email if provided.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}