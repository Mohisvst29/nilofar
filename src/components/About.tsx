"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/DataContext";
import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function About() {
  const { language } = useLanguage();
  const data = useSiteData();

  return (
    <section id="about" className="py-24 relative bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              {language === "en" ? "About Us" : "من نحن"}
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed pt-4">
              {language === "en" ? data.about.text_en : data.about.text_ar}
            </p>

            <div className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden mt-8 shadow-2xl">
              <Image 
                src={data.images?.about || "/talent_about.png"} 
                alt="About Nilofar Talent" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-2xl text-blue-600 dark:text-blue-400">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {language === "en" ? "Our Vision" : "رؤيتنا"}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "en" ? data.vision_mission.vision_en : data.vision_mission.vision_ar}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-2xl text-green-600 dark:text-green-400">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {language === "en" ? "Our Mission" : "رسالتنا"}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {language === "en" ? data.vision_mission.mission_en : data.vision_mission.mission_ar}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
