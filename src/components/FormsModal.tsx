"use client";

import { useModals } from "@/context/ModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/DataContext";
import { X, Send } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FormsModal() {
  const { activeModal, closeModal } = useModals();
  const { language, dir } = useLanguage();
  const data = useSiteData();

  // Request Employees Form State
  const [reqForm, setReqForm] = useState({ company: "", sector: "", roles: "", phone: "" });
  
  // Apply Job Form State
  const [applyForm, setApplyForm] = useState({ name: "", profession: "", experience: "", phone: "" });

  if (activeModal === "none") return null;

  const isRequest = activeModal === "request";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse the phone number to remove any + or spaces for the wa.me link
    const targetPhone = data.company.phone.replace(/[^0-9]/g, "");
    
    let message = "";
    if (isRequest) {
      message = language === "en" 
        ? `*New Employee Request*\n\n*Company:* ${reqForm.company}\n*Sector:* ${reqForm.sector}\n*Required Roles:* ${reqForm.roles}\n*Phone:* ${reqForm.phone}`
        : `*طلب موظفين جديد*\n\n*الشركة:* ${reqForm.company}\n*القطاع:* ${reqForm.sector}\n*الأدوار المطلوبة:* ${reqForm.roles}\n*رقم الهاتف:* ${reqForm.phone}`;
    } else {
      message = language === "en"
        ? `*New Job Application*\n\n*Name:* ${applyForm.name}\n*Profession:* ${applyForm.profession}\n*Experience:* ${applyForm.experience} years\n*Phone:* ${applyForm.phone}`
        : `*تقديم على وظيفة جديد*\n\n*الاسم:* ${applyForm.name}\n*المهنة:* ${applyForm.profession}\n*سنوات الخبرة:* ${applyForm.experience}\n*رقم الهاتف:* ${applyForm.phone}`;
    }

    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    closeModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
          dir={dir}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 sm:p-8 text-white relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 rtl:left-4 rtl:right-auto p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-2">
              {isRequest 
                ? (language === "en" ? "Request Employees" : "طلب موظفين")
                : (language === "en" ? "Apply for a Job" : "تقديم على وظيفة")}
            </h3>
            <p className="text-blue-100 text-sm">
              {isRequest
                ? (language === "en" ? "Fill out the form below and we will contact you via WhatsApp to discuss your hiring needs." : "قم بتعبئة النموذج أدناه وسنتواصل معك عبر واتساب لمناقشة احتياجاتك الوظيفية.")
                : (language === "en" ? "Send us your details via WhatsApp to kickstart your application process." : "أرسل بياناتك عبر واتساب للبدء في عملية التقديم الخاصة بك.")}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {isRequest ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === "en" ? "Company Name" : "اسم الشركة"}
                  </label>
                  <input 
                    required type="text" 
                    value={reqForm.company} onChange={e => setReqForm({...reqForm, company: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === "en" ? "Sector / Industry" : "القطاع / مجال العمل"}
                  </label>
                  <input 
                    required type="text" 
                    value={reqForm.sector} onChange={e => setReqForm({...reqForm, sector: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === "en" ? "Required Roles" : "الوظائف المطلوبة"}
                  </label>
                  <textarea 
                    required rows={3}
                    value={reqForm.roles} onChange={e => setReqForm({...reqForm, roles: e.target.value})}
                    placeholder={language === "en" ? "e.g., 2 Senior Software Engineers, 1 Marketing Manager" : "مثال: 2 مهندس برمجيات، 1 مدير تسويق"}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === "en" ? "Your Phone Number" : "رقم هاتفك"}
                  </label>
                  <input 
                    required type="tel" 
                    value={reqForm.phone} onChange={e => setReqForm({...reqForm, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    dir="ltr"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === "en" ? "Full Name" : "الاسم الكامل"}
                  </label>
                  <input 
                    required type="text" 
                    value={applyForm.name} onChange={e => setApplyForm({...applyForm, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === "en" ? "Profession / Field" : "المهنة / التخصص"}
                  </label>
                  <input 
                    required type="text" 
                    value={applyForm.profession} onChange={e => setApplyForm({...applyForm, profession: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === "en" ? "Years of Experience" : "سنوات الخبرة"}
                  </label>
                  <input 
                    required type="number" min="0"
                    value={applyForm.experience} onChange={e => setApplyForm({...applyForm, experience: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === "en" ? "Phone Number" : "رقم الهاتف"}
                  </label>
                  <input 
                    required type="tel" 
                    value={applyForm.phone} onChange={e => setApplyForm({...applyForm, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    dir="ltr"
                  />
                </div>
              </>
            )}

            <button 
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-green-500/30"
            >
              {language === "en" ? "Send via WhatsApp" : "إرسال عبر واتساب"}
              <Send className="w-5 h-5 rtl:-scale-x-100" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
