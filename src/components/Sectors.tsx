"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/DataContext";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function Sectors() {
  const { language } = useLanguage();
  const data = useSiteData();

  return (
    <section id="sectors" className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Decorative background with generated image */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
        <Image 
          src="/talent_sectors.png" 
          alt="Corporate Network Background" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {language === "en" ? "Sectors We Serve" : "القطاعات التي نخدمها"}
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full mb-8"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {language === "en" 
                ? "We provide specialized talent acquisition services across a wide range of industries, understanding the unique requirements and challenges of each sector."
                : "نقدم خدمات استقطاب المواهب المتخصصة عبر مجموعة واسعة من الصناعات، مع فهم المتطلبات والتحديات الفريدة لكل قطاع."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.sectors.map((sector: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col gap-2 p-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {language === "en" ? sector.name_en : sector.name_ar}
                  </span>
                </div>
                {sector.description_en && sector.description_ar && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 pl-8 rtl:pl-0 rtl:pr-8 leading-relaxed">
                    {language === "en" ? sector.description_en : sector.description_ar}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
