"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/DataContext";
import { motion } from "framer-motion";
import { Zap, Target, Award, Network } from "lucide-react";

export default function Advantages() {
  const { language } = useLanguage();
  const data = useSiteData();

  const icons = [Zap, Target, Award, Network];

  return (
    <section className="py-24 bg-blue-900 dark:bg-blue-950 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {language === "en" ? "Why Choose Us" : "لماذا تختارنا"}
            </h2>
            <div className="w-20 h-1.5 bg-green-500 rounded-full mx-auto mt-6"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.advantages.map((adv, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {language === "en" ? adv.title_en : adv.title_ar}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
