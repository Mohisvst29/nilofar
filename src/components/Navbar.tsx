"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/DataContext";
import { motion } from "framer-motion";
import { Globe, ChevronDown, Briefcase, UserPlus } from "lucide-react";

import { useModals } from "@/context/ModalContext";

export default function Navbar() {
  const { language, setLanguage, dir } = useLanguage();
  const data = useSiteData();
  const { openModal } = useModals();

  return (
    <nav className="fixed w-full z-50 glass top-0 transition-all duration-300 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/">
            <motion.div
              initial={{ opacity: 0, x: dir === "ltr" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer"
            >
              {data.settings?.logoUrl ? (
                <img src={data.settings.logoUrl} alt="Logo" style={{ height: data.settings.logoSize || 40 }} className="object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-green-500 flex items-center justify-center text-white font-bold text-xl">
                  N
                </div>
              )}
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white hidden sm:block">
                {language === "en" ? "Nilofar Talent" : "نيلوفر للمواهب"}
              </span>
            </motion.div>
          </a>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
              {language === "en" ? "Home" : "الرئيسية"}
            </a>
            <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
              {language === "en" ? "About Us" : "من نحن"}
            </a>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <a href="/services" className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium py-8">
                {language === "en" ? "Services" : "خدماتنا"}
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </a>
              <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-slate-900 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden">
                {data.services?.map((service: any, index: number) => (
                  <a 
                    key={index} 
                    href={`/services`} 
                    className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-0"
                  >
                    {language === "en" ? service.title_en : service.title_ar}
                  </a>
                ))}
              </div>
            </div>

            {/* Sectors Dropdown */}
            <div className="relative group">
              <a href="/sectors" className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium py-8">
                {language === "en" ? "Sectors" : "القطاعات"}
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </a>
              <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-slate-900 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden">
                {data.sectors?.map((sector: any, index: number) => (
                  <a 
                    key={index} 
                    href={`/sectors`} 
                    className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-0"
                  >
                    {language === "en" ? sector.name_en : sector.name_ar}
                  </a>
                ))}
              </div>
            </div>

            <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
              {language === "en" ? "Contact Us" : "تواصل معنا"}
            </a>
          </div>

          {/* Language Switcher & CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "en" ? "عربي" : "EN"}</span>
            </button>
            
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => openModal('request')}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                {language === "en" ? "Request Employees" : "اطلب موظفين الان"}
              </button>
              <button
                onClick={() => openModal('apply')}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-500/10 hover:bg-green-100 dark:hover:bg-green-500/20 border border-green-200 dark:border-green-800 transition-colors cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                {language === "en" ? "Apply for a Job" : "قدم على وظيفتك الان"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
