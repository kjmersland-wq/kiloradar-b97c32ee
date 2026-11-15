export type CountryCode = "NO" | "SE" | "DK" | "UK";
export interface Country { code: CountryCode; name: string; flag: string; currency: string; locale: string; }
export const countries: Country[] = [
  { code: "NO", name: "Norway", flag: "🇳🇴", currency: "NOK", locale: "nb-NO" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", currency: "SEK", locale: "sv-SE" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", currency: "DKK", locale: "da-DK" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", locale: "en-GB" },
];
export type Period = "week" | "month" | "year";
export interface StoreRank { chain: string; basket: number; change: number; }
export const rankings: Record<CountryCode, Record<Period, StoreRank[]>> = {
  NO: {
    week: [{ chain: "Rema 1000", basket: 1184, change: -1.2 }, { chain: "Kiwi", basket: 1196, change: -0.4 }, { chain: "Extra", basket: 1211, change: 0.8 }, { chain: "Coop Prix", basket: 1248, change: 0.3 }, { chain: "Meny", basket: 1389, change: 1.1 }],
    month: [{ chain: "Kiwi", basket: 1190, change: -0.9 }, { chain: "Rema 1000", basket: 1193, change: -0.2 }, { chain: "Extra", basket: 1219, change: 0.5 }, { chain: "Coop Prix", basket: 1251, change: 1.0 }, { chain: "Meny", basket: 1394, change: 1.6 }],
    year: [{ chain: "Rema 1000", basket: 1178, change: 4.1 }, { chain: "Kiwi", basket: 1188, change: 4.6 }, { chain: "Extra", basket: 1207, change: 5.2 }, { chain: "Coop Prix", basket: 1240, change: 5.9 }, { chain: "Meny", basket: 1371, change: 6.3 }],
  },
  SE: {
    week: [{ chain: "Willys", basket: 1342, change: -0.8 }, { chain: "Lidl", basket: 1358, change: 0.1 }, { chain: "City Gross", basket: 1402, change: 0.6 }, { chain: "Coop", basket: 1466, change: 0.9 }, { chain: "ICA Maxi", basket: 1489, change: 0.4 }],
    month: [{ chain: "Lidl", basket: 1349, change: -1.1 }, { chain: "Willys", basket: 1351, change: -0.3 }, { chain: "City Gross", basket: 1410, change: 0.7 }, { chain: "ICA Maxi", basket: 1478, change: 0.2 }, { chain: "Coop", basket: 1471, change: 1.2 }],
    year: [{ chain: "Willys", basket: 1338, change: 3.4 }, { chain: "Lidl", basket: 1355, change: 3.0 }, { chain: "City Gross", basket: 1398, change: 4.2 }, { chain: "ICA Maxi", basket: 1470, change: 4.8 }, { chain: "Coop", basket: 1460, change: 5.1 }],
  },
  DK: {
    week: [{ chain: "Lidl", basket: 892, change: -0.6 }, { chain: "Netto", basket: 905, change: 0.2 }, { chain: "Rema 1000", basket: 911, change: -0.1 }, { chain: "Føtex", basket: 968, change: 0.7 }, { chain: "Irma", basket: 1072, change: 1.3 }],
    month: [{ chain: "Netto", basket: 899, change: -0.7 }, { chain: "Lidl", basket: 901, change: 0.0 }, { chain: "Rema 1000", basket: 914, change: 0.3 }, { chain: "Føtex", basket: 972, change: 0.9 }, { chain: "Irma", basket: 1080, change: 1.5 }],
    year: [{ chain: "Lidl", basket: 888, change: 3.9 }, { chain: "Netto", basket: 897, change: 4.4 }, { chain: "Rema 1000", basket: 909, change: 4.0 }, { chain: "Føtex", basket: 961, change: 5.0 }, { chain: "Irma", basket: 1066, change: 6.1 }],
  },
  UK: {
    week: [{ chain: "Aldi", basket: 112.4, change: -0.9 }, { chain: "Lidl", basket: 113.1, change: -0.3 }, { chain: "Tesco", basket: 124.8, change: 0.4 }, { chain: "Asda", basket: 125.6, change: 0.2 }, { chain: "Sainsbury's", basket: 129.3, change: 0.8 }],
    month: [{ chain: "Aldi", basket: 112.9, change: -0.4 }, { chain: "Lidl", basket: 113.5, change: 0.1 }, { chain: "Asda", basket: 124.9, change: 0.5 }, { chain: "Tesco", basket: 125.2, change: 0.6 }, { chain: "Sainsbury's", basket: 130.1, change: 1.0 }],
    year: [{ chain: "Aldi", basket: 111.8, change: 2.9 }, { chain: "Lidl", basket: 112.6, change: 3.1 }, { chain: "Tesco", basket: 123.9, change: 3.8 }, { chain: "Asda", basket: 124.2, change: 4.0 }, { chain: "Sainsbury's", basket: 128.4, change: 4.6 }],
  },
};
export interface Product { barcode: string; name: string; brand: string; emoji: string; unit: "g" | "ml"; oldSize: number; newSize: number; oldPrice: number; newPrice: number; changed: string; }
export const products: Product[] = [
  { barcode: "7038010009457", name: "Melkesjokolade", brand: "Freia", emoji: "🍫", unit: "g", oldSize: 200, newSize: 180, oldPrice: 42.9, newPrice: 44.9, changed: "Sep 2026" },
  { barcode: "7311041013120", name: "Potetgull Original", brand: "Maarud", emoji: "🥔", unit: "g", oldSize: 275, newSize: 250, oldPrice: 39.9, newPrice: 39.9, changed: "Aug 2026" },
  { barcode: "5000159459228", name: "Chocolate Bar", brand: "Snickers", emoji: "🥜", unit: "g", oldSize: 50, newSize: 48, oldPrice: 1.0, newPrice: 1.1, changed: "Jul 2026" },
  { barcode: "7310865004703", name: "Havregryn", brand: "AXA", emoji: "🌾", unit: "g", oldSize: 1000, newSize: 900, oldPrice: 29.9, newPrice: 31.9, changed: "Jun 2026" },
  { barcode: "7038010055720", name: "Appelsinjuice", brand: "Tine", emoji: "🍊", unit: "ml", oldSize: 1000, newSize: 900, oldPrice: 34.9, newPrice: 34.9, changed: "Oct 2026" },
  { barcode: "8000500310427", name: "Hazelnut Spread", brand: "Nutella", emoji: "🌰", unit: "g", oldSize: 400, newSize: 350, oldPrice: 49.9, newPrice: 47.9, changed: "May 2026" },
];
export function unitPrice(price: number, size: number, unit: "g" | "ml") { return size > 0 ? (price / size) * 1000 : 0; }
export function shrinkflation(oldP: number, oldS: number, newP: number, newS: number) {
  const a = oldP / oldS, b = newP / newS; return a > 0 ? ((b - a) / a) * 100 : 0;
}
export function fmt(v: number, c: Country, digits = 2) {
  return new Intl.NumberFormat(c.locale, { style: "currency", currency: c.currency, maximumFractionDigits: digits, minimumFractionDigits: digits }).format(v);
}
