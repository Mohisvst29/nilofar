"use client";

import { useState, useEffect } from "react";
import { Save, Image as ImageIcon, Settings, Layout, Palette, Briefcase, Plus, Trash2, MapPin, User, LogIn, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminDashboard() {
  const { language, dir } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  useEffect(() => {
    // Check Auth
    fetch("/api/auth/login")
      .then((res) => res.json())
      .then((json) => {
        setIsAuthenticated(json.authenticated);
        if (json.authenticated) {
          fetchData();
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const fetchData = () => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const result = await res.json();
      if (result.success) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        alert(language === "en" ? "Invalid credentials" : "بيانات الدخول غير صحيحة");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();
      if (result.success) {
        alert(language === "en" ? "Credentials updated successfully!" : "تم تحديث بيانات الدخول بنجاح!");
        setCredentials({ username: "", password: "" });
      } else {
        alert("Failed to update credentials");
      }
    } catch (error) {
      alert("Error");
    }
    setSaving(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) alert(language === "en" ? "Saved successfully!" : "تم الحفظ بنجاح!");
    } catch (error) {
      alert("Error saving");
    }
    setSaving(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string[]) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const result = await res.json();

    if (result.success) {
      updateData(path, result.url);
    } else {
      alert("Upload failed");
    }
  };

  const updateData = (path: (string | number)[], value: any) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  if (isAuthenticated === null) return <div className="p-20 text-center">Loading...</div>;

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4" dir={dir}>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center">
              <LogIn className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {language === "en" ? "Admin Login" : "تسجيل دخول الإدارة"}
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {language === "en" ? "Username" : "اسم المستخدم"}
              </label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {language === "en" ? "Password" : "كلمة المرور"}
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
            >
              {language === "en" ? "Login" : "دخول"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!data) return <div className="p-20 text-center">Loading Data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20 pb-12 flex" dir={dir}>
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-80px)] p-4 shadow-sm flex flex-col gap-2">
        <h2 className="text-lg font-bold px-4 py-3 text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700">
          {language === "en" ? "Dashboard" : "لوحة التحكم"}
        </h2>
        
        {[
          { id: "settings", icon: Settings, label: language === "en" ? "General Info" : "البيانات الأساسية" },
          { id: "theme", icon: Palette, label: language === "en" ? "Theme & Colors" : "المظهر والألوان" },
          { id: "media", icon: ImageIcon, label: language === "en" ? "Media & Images" : "الصور والميديا" },
          { id: "sections", icon: Layout, label: language === "en" ? "Sections Content" : "محتوى الأقسام" },
          { id: "services", icon: Briefcase, label: language === "en" ? "Services & Sectors" : "الخدمات والقطاعات" },
          { id: "seo", icon: Search, label: language === "en" ? "Search Engine (SEO)" : "محركات البحث (SEO)" },
          { id: "account", icon: User, label: language === "en" ? "Account Settings" : "إعدادات الحساب" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm w-full text-start ${
              activeTab === tab.id 
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}

        <div className="mt-auto pt-8">
          <button
            onClick={handleSave}
            disabled={saving || activeTab === "account"}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-bold shadow-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? (language === "en" ? "Saving..." : "جاري الحفظ...") : (language === "en" ? "Save Changes" : "حفظ التعديلات")}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 max-w-5xl">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 min-h-[600px]">
          
          {/* TAB: Account Settings */}
          {activeTab === "account" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-md">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {language === "en" ? "Change Credentials" : "تغيير بيانات الدخول"}
              </h3>
              <form onSubmit={handleUpdateCredentials} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    {language === "en" ? "New Username" : "اسم المستخدم الجديد"}
                  </label>
                  <input
                    type="text"
                    required
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    {language === "en" ? "New Password" : "كلمة المرور الجديدة"}
                  </label>
                  <input
                    type="password"
                    required
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full flex items-center justify-center py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
                >
                  {saving ? (language === "en" ? "Updating..." : "جاري التحديث...") : (language === "en" ? "Update Credentials" : "تحديث البيانات")}
                </button>
              </form>
            </div>
          )}

          {/* TAB: Settings */}
          {activeTab === "settings" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {language === "en" ? "Company Information" : "بيانات الشركة الأساسية"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['name_ar', 'name_en', 'phone', 'whatsapp', 'email', 'location', 'po_box'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 capitalize">
                      {field.replace('_', ' ')}
                    </label>
                    <input
                      type="text"
                      value={data.company?.[field] || ""}
                      onChange={(e) => updateData(['company', field], e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>

              <h4 className="text-xl font-bold mt-10 mb-4 pt-8 border-t border-gray-100 dark:border-gray-700">Social Media & Map</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['linkedin', 'twitter', 'facebook', 'instagram'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 capitalize">
                      {field} Link
                    </label>
                    <input
                      type="text"
                      value={data.company?.social?.[field] || ""}
                      onChange={(e) => updateData(['company', 'social', field], e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Google Maps iFrame URL (src)
                  </label>
                  <input
                    type="text"
                    value={data.company?.map_iframe || ""}
                    onChange={(e) => updateData(['company', 'map_iframe'], e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: Theme */}
          {activeTab === "theme" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {language === "en" ? "Theme & Branding" : "الهوية والألوان"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Primary Color</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="color"
                      value={data.settings?.primaryColor || "#2563eb"}
                      onChange={(e) => updateData(['settings', 'primaryColor'], e.target.value)}
                      className="w-14 h-14 rounded cursor-pointer border-none"
                    />
                    <input
                      type="text"
                      value={data.settings?.primaryColor || "#2563eb"}
                      onChange={(e) => updateData(['settings', 'primaryColor'], e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Secondary Color</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="color"
                      value={data.settings?.secondaryColor || "#22c55e"}
                      onChange={(e) => updateData(['settings', 'secondaryColor'], e.target.value)}
                      className="w-14 h-14 rounded cursor-pointer border-none"
                    />
                    <input
                      type="text"
                      value={data.settings?.secondaryColor || "#22c55e"}
                      onChange={(e) => updateData(['settings', 'secondaryColor'], e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Arabic Font</label>
                  <select 
                    value={data.settings?.arabicFont || "Cairo"}
                    onChange={(e) => updateData(['settings', 'arabicFont'], e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none"
                  >
                    <option value="Cairo">Cairo</option>
                    <option value="Tajawal">Tajawal</option>
                    <option value="Almarai">Almarai</option>
                    <option value="Amiri">Amiri</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">English Font</label>
                  <select 
                    value={data.settings?.englishFont || "Inter"}
                    onChange={(e) => updateData(['settings', 'englishFont'], e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Montserrat">Montserrat</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Media */}
          {activeTab === "media" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {language === "en" ? "Media & Images" : "إدارة الصور"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Logo */}
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-2xl">
                  <label className="block text-sm font-bold mb-4">Website Logo</label>
                  {data.settings?.logoUrl && (
                    <img src={data.settings.logoUrl} alt="Logo" className="h-16 object-contain mb-4 bg-gray-100 p-2 rounded" />
                  )}
                  <input type="file" onChange={(e) => handleUpload(e, ['settings', 'logoUrl'])} className="w-full text-sm" />
                  
                  <label className="block text-sm font-semibold mt-4 mb-2">Logo Size (Height in px)</label>
                  <input
                    type="number"
                    value={data.settings?.logoSize || 40}
                    onChange={(e) => updateData(['settings', 'logoSize'], Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none"
                  />
                </div>

                {/* Section Images */}
                {['hero', 'about', 'services', 'sectors'].map((img) => (
                  <div key={img} className="border border-gray-200 dark:border-gray-700 p-4 rounded-2xl">
                    <label className="block text-sm font-bold mb-4 capitalize">{img} Section Image</label>
                    {data.images?.[img] && (
                      <img src={data.images[img]} alt={img} className="h-24 w-full object-cover mb-4 rounded-xl" />
                    )}
                    <input type="file" onChange={(e) => handleUpload(e, ['images', img])} className="w-full text-sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Sections Content */}
          {activeTab === "sections" && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Hero Section */}
              <div>
                <h3 className="text-2xl font-bold mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">Hero Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['title_ar', 'title_en', 'subtitle_ar', 'subtitle_en'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-semibold mb-2 capitalize text-gray-700 dark:text-gray-300">{field.replace('_', ' ')}</label>
                      {field.includes('subtitle') ? (
                        <textarea
                          rows={3}
                          value={data.hero?.[field] || ""}
                          onChange={(e) => updateData(['hero', field], e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={data.hero?.[field] || ""}
                          onChange={(e) => updateData(['hero', field], e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* About Section */}
              <div>
                <h3 className="text-2xl font-bold mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">About Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['text_ar', 'text_en'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-semibold mb-2 capitalize text-gray-700 dark:text-gray-300">About {field.replace('text_', '')}</label>
                      <textarea
                        rows={5}
                        value={data.about?.[field] || ""}
                        onChange={(e) => updateData(['about', field], e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: Services & Sectors */}
          {activeTab === "services" && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Services */}
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <h3 className="text-2xl font-bold">Services</h3>
                  <button
                    onClick={() => {
                      const newServices = [...(data.services || []), { title_ar: "خدمة جديدة", title_en: "New Service", description_ar: "", description_en: "" }];
                      updateData(['services'], newServices);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 rounded-lg text-sm font-bold hover:bg-blue-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Service
                  </button>
                </div>
                <div className="space-y-4">
                  {data.services?.map((service: any, index: number) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-slate-800/50 relative">
                      <button
                        onClick={() => {
                          const newServices = data.services.filter((_: any, i: number) => i !== index);
                          updateData(['services'], newServices);
                        }}
                        className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-10 rtl:ml-10 rtl:mr-0">
                        <input
                          type="text"
                          value={service.title_ar}
                          onChange={(e) => updateData(['services', index, 'title_ar'], e.target.value)}
                          placeholder="Title AR"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-900 text-sm outline-none"
                        />
                        <input
                          type="text"
                          value={service.title_en}
                          onChange={(e) => updateData(['services', index, 'title_en'], e.target.value)}
                          placeholder="Title EN"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-900 text-sm outline-none"
                        />
                        <textarea
                          value={service.description_ar}
                          onChange={(e) => updateData(['services', index, 'description_ar'], e.target.value)}
                          placeholder="Description AR"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-900 text-sm outline-none"
                        />
                        <textarea
                          value={service.description_en}
                          onChange={(e) => updateData(['services', index, 'description_en'], e.target.value)}
                          placeholder="Description EN"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-900 text-sm outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sectors */}
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <h3 className="text-2xl font-bold">Sectors</h3>
                  <button
                    onClick={() => {
                      const newSectors = [...(data.sectors || []), { name_ar: "قطاع جديد", name_en: "New Sector", description_ar: "", description_en: "" }];
                      updateData(['sectors'], newSectors);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 rounded-lg text-sm font-bold hover:bg-blue-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Sector
                  </button>
                </div>
                <div className="space-y-4">
                  {data.sectors?.map((sector: any, index: number) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-slate-800/50 relative">
                      <button
                        onClick={() => {
                          const newSectors = data.sectors.filter((_: any, i: number) => i !== index);
                          updateData(['sectors'], newSectors);
                        }}
                        className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-10 rtl:ml-10 rtl:mr-0">
                        <input
                          type="text"
                          value={sector.name_ar}
                          onChange={(e) => updateData(['sectors', index, 'name_ar'], e.target.value)}
                          placeholder="Name AR"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-900 text-sm outline-none"
                        />
                        <input
                          type="text"
                          value={sector.name_en}
                          onChange={(e) => updateData(['sectors', index, 'name_en'], e.target.value)}
                          placeholder="Name EN"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-900 text-sm outline-none"
                        />
                        <textarea
                          value={sector.description_ar}
                          onChange={(e) => updateData(['sectors', index, 'description_ar'], e.target.value)}
                          placeholder="Description AR"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-900 text-sm outline-none"
                        />
                        <textarea
                          value={sector.description_en}
                          onChange={(e) => updateData(['sectors', index, 'description_en'], e.target.value)}
                          placeholder="Description EN"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-900 text-sm outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
          
          {/* TAB: SEO */}
          {activeTab === "seo" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {language === "en" ? "Search Engine Optimization (SEO)" : "إعدادات محركات البحث (SEO)"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Arabic SEO */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold border-b border-gray-100 dark:border-gray-700 pb-2">عربي (Arabic)</h4>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Meta Title</label>
                    <input
                      type="text"
                      value={data.seo?.title_ar || ""}
                      onChange={(e) => updateData(['seo', 'title_ar'], e.target.value)}
                      placeholder="نيلوفر | لاستقطاب المواهب"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Meta Description</label>
                    <textarea
                      rows={4}
                      value={data.seo?.description_ar || ""}
                      onChange={(e) => updateData(['seo', 'description_ar'], e.target.value)}
                      placeholder="وصف الموقع الذي يظهر في جوجل..."
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Keywords (Comma separated)</label>
                    <textarea
                      rows={2}
                      value={data.seo?.keywords_ar || ""}
                      onChange={(e) => updateData(['seo', 'keywords_ar'], e.target.value)}
                      placeholder="توظيف, موارد بشرية, استقطاب"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* English SEO */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold border-b border-gray-100 dark:border-gray-700 pb-2">English</h4>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Meta Title</label>
                    <input
                      type="text"
                      value={data.seo?.title_en || ""}
                      onChange={(e) => updateData(['seo', 'title_en'], e.target.value)}
                      placeholder="Nilofar | Talent Acquisition"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Meta Description</label>
                    <textarea
                      rows={4}
                      value={data.seo?.description_en || ""}
                      onChange={(e) => updateData(['seo', 'description_en'], e.target.value)}
                      placeholder="Site description that appears on Google..."
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Keywords (Comma separated)</label>
                    <textarea
                      rows={2}
                      value={data.seo?.keywords_en || ""}
                      onChange={(e) => updateData(['seo', 'keywords_en'], e.target.value)}
                      placeholder="hiring, recruitment, hr"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
