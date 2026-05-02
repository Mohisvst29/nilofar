"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/DataContext";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { language, dir } = useLanguage();
  const data = useSiteData();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = data.company.phone.replace(/[^0-9]/g, ""); // Clean the phone number
    
    let text = "";
    if (language === "en") {
      text = `*New Contact Message*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`;
    } else {
      text = `*رسالة تواصل جديدة*\n\n*الاسم:* ${formData.name}\n*رقم الهاتف:* ${formData.phone}\n*الرسالة:* ${formData.message}`;
    }

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact-section" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "en" ? "Get In Touch" : "تواصل معنا"}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === "en" 
              ? "Have a question or need our services? Feel free to drop us a message."
              : "لديك استفسار أو تحتاج إلى خدماتنا؟ لا تتردد في إرسال رسالة إلينا."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: dir === "ltr" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "en" ? "Full Name" : "الاسم الكامل"}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                  placeholder={language === "en" ? "John Doe" : "أحمد محمد"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "en" ? "Phone Number" : "رقم الهاتف"}
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                  placeholder="+966 5X XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "en" ? "Message" : "الرسالة"}
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none dark:text-white"
                  placeholder={language === "en" ? "How can we help you?" : "كيف يمكننا مساعدتك؟"}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                {language === "en" ? "Send Message" : "إرسال الرسالة"}
              </button>
            </form>
          </motion.div>

          {/* Contact Details & Map */}
          <motion.div
            initial={{ opacity: 0, x: dir === "ltr" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {language === "en" ? "Call Us" : "اتصل بنا"}
                  </h3>
                  <a href={`tel:${data.company.phone}`} dir="ltr" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 block">
                    {data.company.phone}
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {language === "en" ? "Email Us" : "راسلنا"}
                  </h3>
                  <a href={`mailto:${data.company.email}`} className="text-gray-600 dark:text-gray-400 hover:text-green-600 block break-all">
                    {data.company.email}
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start gap-4 md:col-span-2">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {language === "en" ? "Location" : "موقعنا"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {data.company.location} (PO Box: {data.company.po_box})
                  </p>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="w-full h-64 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115858.74716943542!2d46.64344405527184!3d24.84364020963167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2efbba9ca210bd%3A0x868b446272fb6cb9!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1714583210123!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
