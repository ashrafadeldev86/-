import React, { useState } from "react";
import { BoundingBox } from "../types";
import { Eye, EyeOff, Layers, Sparkles } from "lucide-react";

interface EyeVisualizerProps {
  imageUrl: string;
  boundingBoxes: BoundingBox[];
}

export default function EyeVisualizer({ imageUrl, boundingBoxes }: EyeVisualizerProps) {
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [hoveredBoxIndex, setHoveredBoxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Helper to color-code different eye structures dynamically
  const getBoxColor = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("احمرار") || l.includes("red")) {
      return { border: "border-rose-500", bg: "bg-rose-500/10", text: "bg-rose-600 text-white", textHEX: "#f43f5e" };
    }
    if (l.includes("اصفرار") || l.includes("yellow") || l.includes("يرقان")) {
      return { border: "border-amber-500", bg: "bg-amber-500/10", text: "bg-amber-600 text-white", textHEX: "#f59e0b" };
    }
    if (l.includes("مياه") || l.includes("cataract") || l.includes("تعتيم")) {
      return { border: "border-sky-500", bg: "bg-sky-500/15", text: "bg-sky-600 text-white", textHEX: "#0ea5e9" };
    }
    if (l.includes("حدقة") || l.includes("pupil")) {
      return { border: "border-emerald-500", bg: "bg-emerald-500/5", text: "bg-emerald-600 text-white", textHEX: "#10b981" };
    }
    if (l.includes("قزحية") || l.includes("iris")) {
      return { border: "border-violet-500", bg: "bg-violet-500/5", text: "bg-violet-600 text-white", textHEX: "#8b5cf6" };
    }
    if (l.includes("بياض") || l.includes("sclera") || l.includes("صلبة")) {
      return { border: "border-pink-500", bg: "bg-pink-500/5", text: "bg-pink-600 text-white", textHEX: "#ec4899" };
    }
    return { border: "border-blue-500", bg: "bg-blue-500/10", text: "bg-blue-600 text-white", textHEX: "#2563eb" };
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4" id="eye-visualizer">
      {/* Top Controller Strip */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
        <h3 className="text-sm font-extrabold text-slate-700 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          التحديد البصري للمناطق المكتشفة
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              showOverlays
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
            }`}
            id="toggle-overlays"
          >
            {showOverlays ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                إخفاء المربعات البصرية
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                عرض المربعات البصرية
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Image Overlay Screen */}
      <div className="relative aspect-[4/3] w-full max-w-[550px] mx-auto overflow-hidden rounded-xl bg-slate-100 border border-slate-200 shadow-2xs">
        <img
          src={imageUrl}
          alt="Eye for clinical AI inspection"
          className="w-full h-full object-cover select-none"
          referrerPolicy="no-referrer"
          id="visualizer-target-image"
        />

        {/* Draw Bounding Box elements proportionally */}
        {showOverlays &&
          boundingBoxes &&
          boundingBoxes.map((item, index) => {
            const [ymin, xmin, ymax, xmax] = item.box;
            const styleColors = getBoxColor(item.label);
            const isFilteredOut = activeFilter !== null && activeFilter !== item.label;

            if (isFilteredOut) return null;

            // Calculate percentage sizes safely
            const top = Math.max(0, Math.min(ymin, 100));
            const left = Math.max(0, Math.min(xmin, 100));
            const height = Math.max(0, Math.min(ymax - ymin, 100 - top));
            const width = Math.max(0, Math.min(xmax - xmin, 100 - left));

            return (
              <div
                key={index}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  height: `${height}%`,
                  width: `${width}%`,
                }}
                className={`absolute rounded border-2 ${styleColors.border} ${styleColors.bg} transition-all duration-300 ring-1 ring-white/20`}
                onMouseEnter={() => setHoveredBoxIndex(index)}
                onMouseLeave={() => setHoveredBoxIndex(null)}
                id={`bbox-box-${index}`}
              >
                {/* Visual Label Tag in Arabic positioned inside/outside comfortably */}
                <span
                  style={{
                    backgroundColor: styleColors.text.includes("rose")
                      ? "#f43f5e"
                      : styleColors.text.includes("amber")
                      ? "#d97706"
                      : styleColors.text.includes("sky")
                      ? "#0284c7"
                      : styleColors.text.includes("emerald")
                      ? "#059669"
                      : styleColors.text.includes("violet")
                      ? "#7c3aed"
                      : "#2563eb",
                  }}
                  className="absolute right-0 -top-6 px-1.5 py-0.5 rounded text-[10px] text-white font-bold whitespace-nowrap shadow-xs shadow-black/10 select-none z-10 transition-transform hover:scale-105"
                >
                  {item.label}
                </span>
              </div>
            );
          })}

        {/* Empty Overlay Hint if zero boxes are parsed */}
        {(!boundingBoxes || boundingBoxes.length === 0) && (
          <div className="absolute inset-x-0 bottom-4 text-center px-4">
            <span className="bg-black/75 text-slate-150 text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap">
              جاري فحص الخرائط أو لم يتم التعرف على معالم بعد
            </span>
          </div>
        )}
      </div>

      {/* Structured Box Interactive Selector */}
      {boundingBoxes && boundingBoxes.length > 0 && (
        <div className="pt-2">
          <span className="text-xs font-bold text-slate-450 block mb-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            المعالم المحددة في الصورة:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveFilter(null);
                setShowOverlays(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                activeFilter === null && showOverlays
                  ? "bg-slate-800 text-white border-slate-900 shadow-2xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200/60"
              }`}
              id="filter-all-boxes"
            >
              عرض الكل ({boundingBoxes.length})
            </button>
            {boundingBoxes.map((item, index) => {
              const colors = getBoxColor(item.label);
              const isActive = activeFilter === item.label && showOverlays;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setActiveFilter(item.label);
                    setShowOverlays(true);
                  }}
                  className="relative px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all hover:-translate-y-0.5 cursor-pointer"
                  style={{
                    backgroundColor: isActive ? "rgba(37, 99, 235, 0.05)" : "#ffffff",
                    borderColor: isActive ? colors.textHEX : "#e2e8f0",
                    color: colors.textHEX,
                  }}
                  id={`bbox-filter-btn-${index}`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: colors.textHEX }}
                  ></span>
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
