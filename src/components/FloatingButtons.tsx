"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useSiteData } from "@/context/DataContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function FloatingButtons() {
  const data = useSiteData();
  const { dir } = useLanguage();

  const phone = data?.company?.phone;
  const whatsapp = data?.company?.whatsapp || phone;

  // Format whatsapp number for API link (remove non-digits, keep country code)
  const formattedWhatsapp = whatsapp ? whatsapp.replace(/[^\d+]/g, "") : "";

  return (
    <div 
      className={`fixed bottom-6 ${dir === "rtl" ? "left-6" : "right-6"} flex flex-col gap-4 z-50`}
      dir={dir}
    >
      {phone && (
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={`tel:${phone}`}
          className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-blue-400 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.6)] transition-all relative group"
        >
          <Phone className="w-6 h-6" />
          <span className={`absolute top-1/2 -translate-y-1/2 ${dir === "rtl" ? "left-full ml-4" : "right-full mr-4"} bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg`}>
            {dir === "rtl" ? "اتصل بنا" : "Call Us"}
          </span>
        </motion.a>
      )}

      {formattedWhatsapp && (
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={`https://wa.me/${formattedWhatsapp.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-tr from-green-500 to-green-400 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(34,197,94,0.4)] hover:shadow-[0_4px_25px_rgba(34,197,94,0.6)] transition-all relative group"
        >
          <MessageCircle className="w-7 h-7" />
          <span className={`absolute top-1/2 -translate-y-1/2 ${dir === "rtl" ? "left-full ml-4" : "right-full mr-4"} bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg`}>
            {dir === "rtl" ? "تواصل عبر واتساب" : "WhatsApp Us"}
          </span>
        </motion.a>
      )}
    </div>
  );
}
