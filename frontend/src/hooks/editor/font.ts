export const FONTS = [
  { value: "Inter", label: "Inter" },
  { value: "Apple", label: "Apple" },
  { value: "Roboto", label: "Roboto" },
  { value: "Gmarket", label: "Gmarket" },
];

// TODO: px -> pt 적용
export const FONTSIZES = [
  { value: "11px", label: "8pt" }, // 10.66 → 11
  { value: "12px", label: "9pt" }, // 12
  { value: "13px", label: "10pt" }, // 13.33 → 13
  { value: "15px", label: "11pt" }, // 14.66 → 15
  { value: "16px", label: "12pt" }, // 16
  { value: "19px", label: "14pt" }, // 18.66 → 19
  { value: "21px", label: "16pt" }, // 21.33 → 21
  { value: "24px", label: "18pt" }, // 24
  { value: "27px", label: "20pt" }, // 26.66 → 27
  { value: "29px", label: "22pt" }, // 29.33 → 29
  { value: "32px", label: "24pt" }, // 32
  { value: "35px", label: "26pt" }, // 34.66 → 35
  { value: "37px", label: "28pt" }, // 37.33 → 37
  { value: "43px", label: "32pt" }, // 42.66 → 43
  { value: "64px", label: "48pt" }, // 64
  { value: "96px", label: "72pt" }, // 96
];

export const COLORS = [
  { value: "#000000", label: "검은색", outline: "#E6E5E3" },
  { value: "#A7A6A7", label: "회색", outline: "#E6E5E3" },
  { value: "#B1A299", label: "갈색", outline: "#E0CDC0" },
  { value: "#C39061", label: "주황색", outline: "#EACCB2" },
  { value: "#D9B682", label: "노란색", outline: "#E8D497" },
  { value: "#6E9284", label: "초록색", outline: "#BED9C9" },
  { value: "#5081A7", label: "파란색", outline: "#B6D6F5" },
  { value: "#937B9C", label: "보라색", outline: "#DBC8E8" },
  { value: "#A86587", label: "분홍색", outline: "#EAC4D5" },
  { value: "#CF5148", label: "빨간색", outline: "#F0C5BE" },
];

export const BACKGROUNDCOLORS = [
  { value: "#FFFFFF", label: "검은색", outline: "#E6E5E3" },
  { value: "#EFEFED", label: "회색", outline: "#E6E5E3" },
  { value: "#F5EDE9", label: "갈색", outline: "#E0CDC0" },
  { value: "#FBEBDF", label: "주황색", outline: "#EACCB2" },
  { value: "#FAF4DD", label: "노란색", outline: "#E8D497" },
  { value: "#E8F1EC", label: "초록색", outline: "#BED9C9" },
  { value: "#E6F2FC", label: "파란색", outline: "#B6D6F5" },
  { value: "#F1EAF8", label: "보라색", outline: "#DBC8E8" },
  { value: "#FAE9F1", label: "분홍색", outline: "#EAC4D5" },
  { value: "#FDE9E7", label: "빨간색", outline: "#DDC4C5" },
];

export interface RecentlyUsedProps {
  type: "color" | "background";
  color: string;
  outline: string;
}
