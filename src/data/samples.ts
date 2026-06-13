import { SampleCase } from "../types";

// Base64-encoded SVG representations for consistent rendering and easy transfer to Gemini.

// SVG 1: Healthy Eye
const normalEyeSvg = `
<svg viewBox="0 0 400 300" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0f172a"/>
  <!-- Orbit outline -->
  <path d="M 40 150 C 100 60, 300 60, 360 150 C 300 240, 100 240, 40 150 Z" fill="#1e293b" stroke="#334155" stroke-width="2"/>
  <!-- Sclera (White of the eye) -->
  <path d="M 60 150 C 110 80, 290 80, 340 150 C 290 220, 110 220, 60 150 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <!-- Tiny natural veins (very subtle) -->
  <path d="M 65 145 Q 85 140 100 148" stroke="#fecaca" stroke-width="0.8" fill="none" opacity="0.4"/>
  <path d="M 335 152 Q 315 158 300 150" stroke="#fecaca" stroke-width="0.8" fill="none" opacity="0.4"/>
  <!-- Iris (Brownish Hazel) -->
  <circle cx="200" cy="150" r="54" fill="#854d0e" stroke="#1e293b" stroke-width="1.5"/>
  <!-- Iris Pattern -->
  <circle cx="200" cy="150" r="44" fill="none" stroke="#a16207" stroke-width="3" stroke-dasharray="4 2" opacity="0.6"/>
  <circle cx="200" cy="150" r="34" fill="none" stroke="#713f12" stroke-width="2" stroke-dasharray="1 1" opacity="0.8"/>
  <!-- Pupil (Clear Black) -->
  <circle cx="200" cy="150" r="22" fill="#020617"/>
  <!-- Cornea light reflection -->
  <circle cx="184" cy="134" r="8" fill="#ffffff" opacity="0.85"/>
  <circle cx="212" cy="162" r="4" fill="#ffffff" opacity="0.5"/>
</svg>
`;

// SVG 2: Red Bloodshot Eye (Eye redness/strain)
const redEyeSvg = `
<svg viewBox="0 0 400 300" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0f172a"/>
  <!-- Orbit outline -->
  <path d="M 40 150 C 100 60, 300 60, 360 150 C 300 240, 100 240, 40 150 Z" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
  <!-- Sclera (Suffused with redness / pinkish tint) -->
  <path d="M 60 150 C 110 80, 290 80, 340 150 C 290 220, 110 220, 60 150 Z" fill="#fef2f2" stroke="#fca5a5" stroke-width="2"/>
  <!-- Prominent Congested Blood vessels (Redness) -->
  <path d="M 65 145 C 90 135, 110 145, 130 140" stroke="#dc2626" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 65 145 Q 80 160 115 155" stroke="#ef4444" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M 100 120 Q 120 130 145 125" stroke="#ef4444" stroke-width="1" fill="none" stroke-linecap="round"/>
  <path d="M 335 152 C 305 145, 280 160, 255 150" stroke="#dc2626" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M 325 120 Q 300 132 270 135" stroke="#ef4444" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="M 310 180 Q 285 165 260 162" stroke="#dc2626" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- Iris (Greenish-Blue, tired looking) -->
  <circle cx="200" cy="150" r="54" fill="#0d9488" stroke="#1e293b" stroke-width="1.5"/>
  <!-- Tired Iris lines -->
  <circle cx="200" cy="150" r="44" fill="none" stroke="#14b8a6" stroke-width="2" stroke-dasharray="3 3" opacity="0.5"/>
  <!-- Pupil (Slightly dilated due to fatigue) -->
  <circle cx="200" cy="150" r="24" fill="#020617"/>
  <!-- Cornea light reflection -->
  <circle cx="184" cy="134" r="8" fill="#ffffff" opacity="0.8"/>
  <circle cx="212" cy="162" r="3" fill="#ffffff" opacity="0.4"/>
</svg>
`;

// SVG 3: Yellow Jaundice Eye (Scleral icterus)
const yellowEyeSvg = `
<svg viewBox="0 0 400 300" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0f172a"/>
  <!-- Orbit outline -->
  <path d="M 40 150 C 100 60, 300 60, 360 150 C 300 240, 100 240, 40 150 Z" fill="#1e293b" stroke="#eab308" stroke-width="1.5"/>
  <!-- Sclera (明显黄色 - Icteric yellow) -->
  <path d="M 60 150 C 110 80, 290 80, 340 150 C 290 220, 110 220, 60 150 Z" fill="#fef9c3" stroke="#fef08a" stroke-width="2"/>
  <!-- Edge shading yellow-orange -->
  <path d="M 60 150 C 110 80, 290 80, 340 150" fill="none" stroke="#facc15" stroke-width="6" opacity="0.3"/>
  <path d="M 340 150 C 290 220, 110 220, 60 150" fill="none" stroke="#eab308" stroke-width="5" opacity="0.3"/>
  <!-- Subtle dark veins -->
  <path d="M 70 140 Q 90 145 110 138" stroke="#ca8a04" stroke-width="1" fill="none" opacity="0.4"/>
  <path d="M 325 155 Q 305 150 280 158" stroke="#ca8a04" stroke-width="1" fill="none" opacity="0.4"/>
  <!-- Iris (Dark Brown) -->
  <circle cx="200" cy="150" r="54" fill="#451a03" stroke="#1e293b" stroke-width="1.5"/>
  <!-- Pupil -->
  <circle cx="200" cy="150" r="22" fill="#020617"/>
  <!-- Reflection -->
  <circle cx="184" cy="134" r="8" fill="#ffffff" opacity="0.85"/>
</svg>
`;

// SVG 4: Cataracts Eye (Clouded pupil)
const cataractsEyeSvg = `
<svg viewBox="0 0 400 300" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0f172a"/>
  <!-- Orbit outline -->
  <path d="M 40 150 C 100 60, 300 60, 360 150 C 300 240, 100 240, 40 150 Z" fill="#1e293b" stroke="#334155" stroke-width="2"/>
  <!-- Sclera (Healthy pearlescent white) -->
  <path d="M 60 150 C 110 80, 290 80, 340 150 C 290 220, 110 220, 60 150 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <!-- Iris (Ocean Blue) -->
  <circle cx="200" cy="150" r="54" fill="#1d4ed8" stroke="#1e293b" stroke-width="1.5"/>
  <!-- Iris detailing -->
  <circle cx="200" cy="150" r="46" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="2 2" opacity="0.7"/>
  <!-- Cataract Pupil (Cloudy, grayish-blue-white instead of pitch black) -->
  <circle cx="200" cy="150" r="22" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1" />
  <!-- Cloudy density radial gradients simulated with opacity circles -->
  <circle cx="200" cy="150" r="18" fill="#f1f5f9" opacity="0.6"/>
  <circle cx="196" cy="147" r="12" fill="#ffffff" opacity="0.4"/>
  <!-- Corneal reflection (sits on top of the cloudy lens) -->
  <circle cx="184" cy="134" r="8" fill="#ffffff" opacity="0.9"/>
  <circle cx="212" cy="162" r="4" fill="#ffffff" opacity="0.5"/>
</svg>
`;

// Simple conversion helper to base64 Data URLs so the <img /> tag and Gemini API can consume them natively
function svgToDataUrl(svgString: string): string {
  const cleanSvg = svgString.trim();
  const base64 = btoa(unescape(encodeURIComponent(cleanSvg)));
  return `data:image/svg+xml;base64,${base64}`;
}

export const SAMPLE_CASES: SampleCase[] = [
  {
    id: "healthy",
    title: "عين سليمة وطبيعية",
    arabicName: "فحص حالة سليمة",
    icon: "Eye",
    imageUrl: svgToDataUrl(normalEyeSvg),
    description: "نموذج لعين تتميز ببياض ناصع وعين رطبة ومؤشرات سليمة وخلوها من المياه البيضاء أو الاحتقان السطحي."
  },
  {
    id: "redness",
    title: "احتقان العين واحمرار الملتحمة",
    arabicName: "فحص حالة احمرار/إجهاد",
    icon: "EyeOff",
    imageUrl: svgToDataUrl(redEyeSvg),
    description: "نموذج يحاكي توسع وتضخم الأوعية الدموية في ملتحمة العين بسبب التهاب أو تعب وهيجان ملحوظ."
  },
  {
    id: "yellowing",
    title: "اصفرار صلبة العين (اليرقان)",
    arabicName: "فحص حالة اصفرار العين",
    icon: "FlameKindling",
    imageUrl: svgToDataUrl(yellowEyeSvg),
    description: "نموذج يحاكي تراكم مادة البيليروبين وتلون بياض العين بلون أصفر شاحب، المؤشر الهام سريرياً."
  },
  {
    id: "cataracts",
    title: "تعتيم عدسة العين (المياه البيضاء)",
    arabicName: "فحص حالة مياه بيضاء",
    icon: "ShieldAlert",
    imageUrl: svgToDataUrl(cataractsEyeSvg),
    description: "نموذج يحاكي تغيم بؤبؤ العين وتكون سحابة أو عتامة رمادية تمنع مرور الضوء بسلاسة إلى الشبكية."
  }
];
