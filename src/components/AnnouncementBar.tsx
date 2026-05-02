"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/DataContext";
import { motion, AnimatePresence } from "framer-motion";

export default function AnnouncementBar() {
  const { language } = useLanguage();
  const data = useSiteData();

  if (!data?.settings?.announcement?.show) return null;

  const announcement = data.settings.announcement;
  const text = language === "en" ? announcement.text_en : announcement.text_ar;

  if (!text) return null;

  const sizeClass = 
    announcement.size === "small" ? "py-1.5 text-xs" :
    announcement.size === "large" ? "py-3 text-base font-semibold" :
    "py-2 text-sm"; // medium

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="w-full relative z-[60] flex items-center justify-center text-center px-4"
        style={{
          backgroundColor: announcement.backgroundColor || "#2563eb",
          color: announcement.textColor || "#ffffff"
        }}
      >
        <div className={sizeClass}>
          {text}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
