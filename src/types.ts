export interface BoundingBox {
  label: string;
  box: [number, number, number, number]; // [ymin, xmin, ymax, xmax] coordinates normalized (0-100)
}

export interface ClinicalFinding {
  name: string;
  status: string; // e.g. "طبيعي", "غير طبيعي", "ملحوظ"
  description: string;
}

export interface EyeAnalysisResult {
  primary_diagnosis: string;
  confidence: number;
  severity: "منخفض" | "متوسط" | "مرتفع" | string;
  description: string;
  findings: ClinicalFinding[];
  bounding_boxes: BoundingBox[];
  recommendations: string[];
  disclaimer: string;
}

export interface SampleCase {
  id: string;
  title: string;
  arabicName: string;
  icon: string;
  imageUrl: string; // base64 or public path
  description: string;
}
