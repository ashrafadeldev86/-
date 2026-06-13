import React from "react";
import { Check, ShieldAlert, HeartHandshake, Sparkles } from "lucide-react";

interface RecommendationsListProps {
  recommendations: string[];
  disclaimer: string;
}

export default function RecommendationsList({ recommendations, disclaimer }: RecommendationsListProps) {
  return (
    <div className="space-y-6" id="recommendations-list">
      {/* Clinician Advice Panel - Elegant Blue-900 from Design HTML */}
      <div className="bg-blue-900 text-white p-6 rounded-2xl border border-blue-950 shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-x-10 -translate-y-10 blur-2xl pointer-events-none"></div>
        
        <h3 className="text-md font-extrabold flex items-center gap-2 border-b border-white/10 pb-3 relative z-10 text-white">
          <Sparkles className="w-4 h-4 text-blue-300 animate-pulse" />
          التوصيات والنصائح الطبية المقترحة
        </h3>

        <ul className="space-y-3.5 mt-4 relative z-10">
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-start gap-3.5 text-sm leading-relaxed text-blue-100 bg-blue-800/30 p-3 rounded-xl border border-blue-800/40"
                id={`recommendation-${index}`}
              >
                <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-300 stroke-[3]" />
                </div>
                <div className="flex-1 text-blue-50/90">{rec}</div>
              </li>
            ))
          ) : (
            <li className="text-xs text-blue-300/80 text-center py-2">
              جاري مراجعة وإعداد الإرشادات الطبية المخصصة لحالة العين...
            </li>
          )}
        </ul>
      </div>

      {/* Structured Legal and Clinical Disclaimer */}
      <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-start gap-4">
        <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-1 border border-amber-200">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-sm font-extrabold text-amber-900 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-amber-700" />
            إخلاء مسؤولية طبي هام للغاية
          </h4>
          <p className="text-xs text-amber-800/90 leading-relaxed text-justify">
            {disclaimer ||
              "تم توليد هذه النتائج الفحصية تلقائيًا بواسطة نظام فحص ذكاء اصطناعي استرشادي. لا تعد هذه المؤشرات بديلاً تحت أي ظرف عن الفحص والتشخيص السريري المباشر لدى طبيب العيون الاستشاري المختص داخل عيادته الطبية المرخصة."}
          </p>
        </div>
      </div>
    </div>
  );
}
