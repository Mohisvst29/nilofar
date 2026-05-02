"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/DataContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useModals } from "@/context/ModalContext";

export default function Hero() {
  const { language, dir } = useLanguage();
  const data = useSiteData();
  const { openModal } = useModals();

  const heroImages = data.images?.heroImages?.length > 0 
    ? data.images.heroImages 
    : [data.images?.hero || "/talent_about.png"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroImages.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 z-10"></div>
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            src={heroImages[currentImageIndex]} 
            alt="Hero Background" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-semibold tracking-wider uppercase border border-blue-200 dark:border-blue-800">
              {language === "en" ? data.company.name_en : data.company.name_ar}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.2] md:leading-[1.1]">
            {language === "en" ? data.hero.title_en : data.hero.title_ar}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            {language === "en" ? data.hero.subtitle_en : data.hero.subtitle_ar}
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 px-4">
            <button
              onClick={() => openModal('request')}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 md:px-8 md:py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-[0_0_40px_rgba(0,72,160,0.4)] cursor-pointer"
            >
              {language === "en" ? "Request Employees Now" : "اطلب موظفين الان"}
              {dir === "ltr" ? (
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              ) : (
                <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              )}
            </button>
            
            <button
              onClick={() => openModal('apply')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 md:px-8 md:py-4 text-base font-bold text-green-600 dark:text-green-500 transition-all duration-200 bg-green-50 dark:bg-green-500/10 border-2 border-green-500 dark:border-green-500 rounded-full hover:bg-green-100 dark:hover:bg-green-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
            >
              {language === "en" ? "Apply for a Job Now" : "قدم على وظيفتك الان"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
