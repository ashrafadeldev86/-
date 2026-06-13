import React from "react";
import { EyeAnalysisResult } from "../types";
import { AlertTriangle, CheckCircle, Info, Heart } from "lucide-react";

interface DiagnosticCardProps {
  result: EyeAnalysisResult;
}

export default function DiagnosticCard({ result }: DiagnosticCardProps) {
  const getSeverityStyles = (severity: string) => {
    switch (severity?.trim()) {
      case "مرتفع":
        return {
          bg: "bg-rose-50/50 border-rose-200",
          text: "text-rose-700",
          badge: "bg-rose-600 text-white",
          dot: "bg-rose-600",
        };
      case "متوسط":
        return {
          bg: "bg-amber-50/50 border-amber-200",
          text: "text-amber-700",
          badge: "bg-amber-500 text-white",
          dot: "bg-amber-500",
        };
      case "منخفض":
      default:
        return {
          bg: "bg-blue-50/50 border-blue-200",
          text: "text-blue-700",
          badge: "bg-blue-600 text-white",
          dot: "bg-blue-600",
        };
    }
  };

  const sevStyles = getSeverityStyles(result.severity);

  // Map confidence level to a solid rating descriptor
  const getConfidenceLevelArabic = (score: number) => {
    if (score >= 90) return "دقة بالغة وقوية";
    if (score >= 75) return "موثوقية سريرية جيدة";
    return "تحليل استرشادي أولي";
  };

  return (
    <div className="space-y-6 animate-fade-in" id="diagnostic-card">
      {/* Primary Result Banner */}
      <div className={`p-6 rounded-2xl border ${sevStyles.bg} flex flex-col md:flex-row gap-5 items-center justify-between shadow-xs bg-white`}>
        <div className="space-y-2.5 text-right w-full md:w-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
              التشخيص الرئيسي المحتمل
            </span>
            <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold leading-none ${sevStyles.badge}`}>
              حجم الخطورة: {result.severity || "منخفضة"}
            </span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${sevStyles.text}`}>
            {result.primary_diagnosis}
          </h2>
        </div>

        {/* Confidence Circle/Stat */}
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-slate-200 shadow-2xs min-w-[150px] text-center w-full md:w-auto shrink-0">
          <span className="text-[11px] text-slate-400 font-bold mb-1.5">معدل ثقة النظام</span>
          <div className="w-full flex items-center justify-center gap-1.5">
            <span className="text-3xl font-black text-slate-800 font-mono">
              %{result.confidence}
            </span>
          </div>
          {/* Visual confidence gauge bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden border border-slate-200/50">
            <div 
              style={{ width: `${result.confidence}%` }} 
              className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
            />
          </div>
          <span className="text-[10px] text-emerald-700 font-bold mt-2 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            {getConfidenceLevelArabic(result.confidence)}
          </span>
        </div>
      </div>

      {/* Narrative Medical Description */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-slate-700 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Info className="w-4 h-4 text-blue-600" />
          التقرير الطبي المفسر لحالة العين
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed text-justify">
          {result.description}
        </p>
      </div>

      {/* Sub-clinical Findings checklist */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-700 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Heart className="w-4 h-4 text-blue-600" />
          مخرجات الفحص والملاحظات السريرية
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.findings && result.findings.length > 0 ? (
            result.findings.map((item, index) => {
              const isNormal = item.status === "طبيعي" || item.status.includes("سليم");
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/30 hover:bg-slate-50 transition-colors flex gap-3 items-start"
                  id={`finding-${index}`}
                >
                  <div className="mt-1">
                    {isNormal ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isNormal
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center text-xs text-slate-400 py-3">
              لا توجد مخرجات سريرية فرعية للفصل
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
