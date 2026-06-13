import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  UploadCloud, 
  RefreshCw, 
  AlertCircle, 
  Info, 
  CheckCircle,
  FileText,
  Bookmark,
  Sparkles
} from "lucide-react";

import MedicalHeader from "./components/MedicalHeader";
import DiagnosticCard from "./components/DiagnosticCard";
import RecommendationsList from "./components/RecommendationsList";
import EyeVisualizer from "./components/EyeVisualizer";
import SampleImages from "./components/SampleImages";
import { EyeAnalysisResult, SampleCase } from "./types";

export default function App() {
  // Application State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);
  
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<string>("");
  
  const [result, setResult] = useState<EyeAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Progressive loading messages to keep the doctor/patient experience immersive
  const progressMessages = [
    "جاري قراءة بيانات الصورة ومسح أبعاد مقلة العين...",
    "جاري فحص صلابة العين (المنطقة البيضاء) وتدفق الشعيرات...",
    "جاري قياس مستويات العتامة والتصبغات على القرنية والحدقة...",
    "جاري بناء الخارطة البصرية وتقدير صناديق العزل التلقائي...",
    "جاري صياغة التشخيص النهائي والتوصيات الإرشادية وصناديق الإحاطة..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (analyzing) {
      let index = 0;
      setProgressStep(progressMessages[0]);
      interval = setInterval(() => {
        index = (index + 1) % progressMessages.length;
        setProgressStep(progressMessages[index]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [analyzing]);

  // Handle Drag Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Convert File to Base64 and stage it
  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("الرجاء تحديد ملف صورة صحيح (JPEG, PNG, WEBP).");
      return;
    }

    setError(null);
    setSelectedSampleId(null);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedImage(reader.result);
        
        // Extract exact mime type
        const match = reader.result.match(/data:(.*?);/);
        if (match && match[1]) {
          setMimeType(match[1]);
        }
        
        // Auto trigger eye analysis for smooth UX
        triggerAnalysis(reader.result, match ? match[1] : "image/jpeg");
      }
    };
    reader.readAsDataURL(file);
  };

  // Trigger automated medical evaluation call to server-side endpoint
  const triggerAnalysis = async (dataUrl: string, explicitMimeType: string, sampleId?: string | null) => {
    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      // Split off metadata prefix to supply only pure base64 payload to the server API
      const base64String = dataUrl.split(",")[1];
      
      const response = await fetch("/api/analyze-eye", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64String,
          mimeType: explicitMimeType,
          sampleId: sampleId || selectedSampleId
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "فشل تحليل الصورة من قبل الخادم.");
      }

      const parsedReport: EyeAnalysisResult = await response.json();
      setResult(parsedReport);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "حدث خطأ غير متوقع أثناء معالجة الصورة. يرجى إعادة المحاولة.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Action: Select preset clinic samples
  const handleSelectSample = (sample: SampleCase) => {
    setError(null);
    setSelectedImage(sample.imageUrl);
    setSelectedSampleId(sample.id);
    
    // Auto trigger analysis
    triggerAnalysis(sample.imageUrl, "image/svg+xml", sample.id);
  };

  // Action: Reset Analyzer for new upload
  const handleReset = () => {
    setSelectedImage(null);
    setSelectedSampleId(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl" id="app-root">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Dynamic Medical Top Header */}
        <MedicalHeader />

        {/* Informational Guidance Alert */}
        <div className="bg-blue-50/60 text-blue-900 rounded-2xl p-5 shadow-2xs border border-blue-200/60 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between animate-fade-in" id="quick-banner">
          <div className="flex gap-3">
            <span className="p-2.5 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center shrink-0 border border-blue-200/50">
              <Bookmark className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs text-blue-800 font-extrabold mb-0.5">تعليمات الفحص التصويرية</p>
              <h2 className="text-sm font-semibold text-slate-700 leading-relaxed">
                التقط صورة واضحة ومقربة لعين واحدة في إضاءة جيدة أو استعمل عينات الفحص المجهري أدناه للتجربة الفورية.
              </h2>
            </div>
          </div>
          <div className="text-xs bg-blue-600 text-white py-1.5 px-3.5 rounded-xl shrink-0 font-bold select-none shadow-sm shadow-blue-500/15">
            إرشادي • دقيق • لحظي
          </div>
        </div>

        {/* Clinic Samples Row Selector */}
        <SampleImages 
          onSelectSample={handleSelectSample} 
          selectedSampleId={selectedSampleId} 
          analyzingId={analyzing ? selectedSampleId : null} 
        />

        {/* Primary Interactive Board */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4" id="main-analyzer-board">
          
          {/* Right Column: Upload Input vs Image visual overlay (Takes 5 cols) */}
          <section className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              {!selectedImage ? (
                // Drag and Drop Upload Card
                <motion.div
                  key="uploader"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all min-h-[350px] flex flex-col justify-center items-center bg-white space-y-4 shadow-sm group ${
                    isDragging 
                      ? "border-blue-500 bg-blue-50/40 scale-[1.01]" 
                      : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/30"
                  }`}
                  id="drop-zone"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="eye-upload-input"
                  />
                  
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-full group-hover:scale-105 transition-transform duration-300 border border-blue-100/50">
                    <UploadCloud className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-md font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                      اسحب صورة العين هنا
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      أو انقر للتصفح من ملفات جهازك
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <span className="inline-block text-[10px] px-2.5 py-1 text-slate-500 bg-slate-100 rounded-lg font-medium leading-none">
                      الصيغ المدعومة: JPG، PNG، WEBP
                    </span>
                  </div>
                </motion.div>
              ) : (
                // Active Eye Inspection Screen
                <motion.div
                  key="viewer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <EyeVisualizer 
                    imageUrl={selectedImage} 
                    boundingBoxes={result?.bounding_boxes || []} 
                  />

                  {/* Reset/Remake Actions row */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleReset}
                      className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                      id="reset-inspect-btn"
                    >
                      <RefreshCw className="w-4 h-4" />
                      مسح الصورة والبدء من جديد
                    </button>
                    
                    <button
                      disabled={analyzing}
                      onClick={() => triggerAnalysis(selectedImage!, mimeType, selectedSampleId)}
                      className="py-3 px-6 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-2 border border-blue-750 shadow-sm shadow-blue-500/10"
                      id="reanalyze-btn"
                    >
                      إعادة التحليل الطائي
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Left Column: Diagnostics Report, recommendations & Loaders (Takes 7 cols) */}
          <section className="lg:col-span-7 space-y-6">
            
            {/* 1. Loading & inspection state */}
            {analyzing && (
              <div 
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-center space-y-5"
                id="analyzing-skeleton-loader"
              >
                <div className="relative w-16 h-16">
                  {/* Glowing Double clinical ring indicator */}
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                </div>
                
                <div className="space-y-1.5 max-w-sm">
                  <h3 className="text-sm font-extrabold text-slate-800 flex items-center justify-center gap-1.5 animate-pulse">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    جاري فحص وتدقيق شبكية وقرنية العين...
                  </h3>
                  <p className="text-xs font-bold text-blue-600 line-clamp-1">
                    {progressStep}
                  </p>
                </div>
                
                <div className="w-full max-w-xs bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-200">
                  <div className="bg-blue-600 h-full animate-progress-glow rounded-full" />
                </div>
              </div>
            )}

            {/* 2. Error Display */}
            {error && (
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100 flex gap-3 text-right" id="clinical-error-msg">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-rose-800">فشل في استقراء الصورة</h4>
                  <p className="text-xs text-rose-700 leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            {/* 3. Empty State Instructions */}
            {!selectedImage && !analyzing && !error && (
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-2xs text-center min-h-[300px] flex flex-col justify-center items-center space-y-4" id="empty-results-instructions">
                <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <h3 className="text-sm font-bold text-slate-700">تقرير الفحص الذكي فارغ</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    قم برفع صورة مقربة للعين، أو حدد إحدى العينات الفحصية الجاهزة بالأعلى لاستخلاص التشخيص وتحديد موضع العلة بصرياً بالذكاء الاصطناعي.
                  </p>
                </div>
              </div>
            )}

            {/* 4. Complete Diagnosis Results */}
            {result && !analyzing && (
              <div className="space-y-6" id="inspected-results-board">
                <DiagnosticCard result={result} />
                <RecommendationsList 
                  recommendations={result.recommendations} 
                  disclaimer={result.disclaimer} 
                />
              </div>
            )}
          </section>

        </main>

        {/* Standard Medical App Footer */}
        <footer className="pt-10 pb-6 border-t border-slate-200 text-center text-xs text-slate-400 space-y-2" id="app-footer">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>بصيرة لمسح صحة العيون - تطبيق إرشادي مدعوم بالذكاء الاصطناعي للرؤية الحاسوبية</span>
          </div>
          <p>© 2026 بصيرة AI. تطبيق تجريبي مخصص للتوجيه الوقائي فقط.</p>
        </footer>

      </div>
    </div>
  );
}
