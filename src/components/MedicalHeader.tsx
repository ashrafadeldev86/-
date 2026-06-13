import React, { useEffect, useState } from "react";
import { Eye, ShieldCheck, AlertCircle } from "lucide-react";

export default function MedicalHeader() {
  const [status, setStatus] = useState<{ initialized: boolean; hasApiKey: boolean; loading: boolean }>({
    initialized: false,
    hasApiKey: false,
    loading: true,
  });

  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => {
        setStatus({
          initialized: data.initialized,
          hasApiKey: data.hasApiKey,
          loading: false,
        });
      })
      .catch(() => {
        setStatus({ initialized: false, hasApiKey: false, loading: false });
      });
  }, []);

  return (
    <header className="bg-white border border-slate-200 shadow-xs p-5 rounded-2xl mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shrink-0 transition-all" id="medical-header">
      {/* Branding & Logo */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-blue-500/20 shrink-0">
          <Eye className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            بصيرة <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            منظومة إرشادية طبية ذكية لتقييم صحة العين باستخدام الرؤية الحاسوبية
          </p>
        </div>
      </div>

      {/* System & API Status */}
      <div className="flex items-center gap-3 text-xs flex-wrap">
        {status.loading ? (
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 text-slate-500 rounded-lg border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-ping"></span>
            جاري المزامنة...
          </div>
        ) : status.hasApiKey ? (
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-800 font-semibold rounded-lg border border-emerald-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            نظام الذكاء الاصطناعي متصل ومستعد للتشخيص
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-800 font-semibold rounded-lg border border-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            يُرجى تكوين مفتاح الـ API في الإعدادات
          </div>
        )}

        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-slate-50 text-slate-600 font-mono text-[11px] rounded-lg border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          المرجع المباشر: 2026-06-13
        </div>
      </div>
    </header>
  );
}
