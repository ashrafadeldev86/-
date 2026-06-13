import React from "react";
import { SAMPLE_CASES } from "../data/samples";
import { SampleCase } from "../types";
import { Play, Sparkles } from "lucide-react";

interface SampleImagesProps {
  onSelectSample: (sample: SampleCase) => void;
  selectedSampleId: string | null;
  analyzingId: string | null;
}

export default function SampleImages({ onSelectSample, selectedSampleId, analyzingId }: SampleImagesProps) {
  return (
    <div className="space-y-4" id="sample-images-panel">
      <div className="flex items-center gap-2 border-b border-slate-150 pb-2.5">
        <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
        <div>
          <h3 className="text-sm font-extrabold text-slate-700">تجارب فحص سريرية معدّة مسبقاً</h3>
          <p className="text-xs text-slate-400">اختر إحدى العينات الفحصية الجاهزة لتجريب تحليل الذكاء الاصطناعي فوراً</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SAMPLE_CASES.map((caseItem) => {
          const isSelected = selectedSampleId === caseItem.id;
          const isAnalyzingThis = analyzingId === caseItem.id;

          return (
            <div
              key={caseItem.id}
              onClick={() => !isAnalyzingThis && onSelectSample(caseItem)}
              className={`p-3.5 rounded-2xl border transition-all duration-350 cursor-pointer flex flex-col justify-between h-full bg-white select-none ${
                isSelected
                  ? "border-blue-500 ring-4 ring-blue-500/10 shadow-md transform -translate-y-0.5"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-xs"
              }`}
              id={`sample-card-${caseItem.id}`}
            >
              <div className="space-y-3">
                {/* Embedded SVG graphic thumbnail */}
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 relative group">
                  <img
                    src={caseItem.imageUrl}
                    alt={caseItem.title}
                    className="w-full h-full object-cover select-none transition-transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>

                <div className="space-y-1.5 text-right">
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">
                    {caseItem.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                    {caseItem.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3">
                <button
                  disabled={isAnalyzingThis}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSample(caseItem);
                  }}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-extrabold border border-blue-200"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/40"
                  }`}
                  id={`sample-btn-${caseItem.id}`}
                >
                  <Play className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                  {isAnalyzingThis ? "جاري فحص العينة..." : isSelected ? "العينة المحددة" : "فحص هذه العينة"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
