import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    settings: {
      logoUrl: { type: String, default: "" },
      logoSize: { type: Number, default: 40 },
      primaryColor: { type: String, default: "#2563eb" }, // blue-600
      secondaryColor: { type: String, default: "#22c55e" }, // green-500
      arabicFont: { type: String, default: "Cairo" },
      englishFont: { type: String, default: "Inter" },
    },
    adminCredentials: {
      username: { type: String, default: "admin" },
      password: { type: String, default: "admin123" },
    },
    images: {
      hero: { type: String, default: "" },
      about: { type: String, default: "/talent_about.png" },
      services: { type: String, default: "" },
      sectors: { type: String, default: "/talent_sectors.png" },
    },
    seo: {
      title_ar: { type: String, default: "نيلوفر | لاستقطاب الكفاءات والمواهب" },
      title_en: { type: String, default: "Nilofar | Talent Acquisition" },
      description_ar: { type: String, default: "نحن في نيلوفر نقدم حلولاً متكاملة لاستقطاب أفضل المواهب وتوظيف الكفاءات لتعزيز نجاح الشركات في المملكة." },
      description_en: { type: String, default: "At Nilofar, we provide comprehensive solutions for attracting top talent to enhance corporate success." },
      keywords_ar: { type: String, default: "توظيف, كفاءات, موارد بشرية, السعودية, الرياض, وظائف" },
      keywords_en: { type: String, default: "hiring, talent, HR, Saudi Arabia, Riyadh, jobs" },
    },
    company: {
      name_en: String,
      name_ar: String,
      location: String,
      po_box: String,
      email: String,
      phone: String,
      whatsapp: String,
      map_iframe: { type: String, default: "" },
      social: {
        linkedin: String,
        twitter: String,
        facebook: String,
        instagram: String
      }
    },
    hero: {
      title_en: String,
      title_ar: String,
      subtitle_en: String,
      subtitle_ar: String,
      cta_en: String,
      cta_ar: String,
    },
    about: {
      text_en: String,
      text_ar: String,
    },
    vision_mission: {
      vision_en: String,
      vision_ar: String,
      mission_en: String,
      mission_ar: String,
    },
    services: [
      {
        title_en: String,
        title_ar: String,
        description_en: String,
        description_ar: String,
      },
    ],
    sectors: [
      {
        name_en: String,
        name_ar: String,
        description_en: String,
        description_ar: String,
      },
    ],
    advantages: [
      {
        title_en: String,
        title_ar: String,
      },
    ],
    global_presence: {
      countries_en: [String],
      countries_ar: [String],
    },
    cta: {
      title_en: String,
      title_ar: String,
      button_en: String,
      button_ar: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);
