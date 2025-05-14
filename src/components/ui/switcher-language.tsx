// "use client";
//
// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// // import type { Locales } from "@/types/locales";
//
//
// export default function LanguageSwitcher() {
//   const [locales, setLocales] = useState<Locales[]>([]);
//   const [currentLocale, setCurrentLocale] = useState<Locales | null>(null);
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//
//   useEffect(() => {
//     const fetchLocales = async () => {
//       try {
//         const response = await fetch("http://localhost:1337/api/i18n/locales");
//         const data: Locales[] = await response.json();
//         setLocales(data);
//         const pathParts = pathname.split("/").filter(Boolean);
//         const initialLocale =
//           data.find((locale) => locale.code === pathParts[0]) ||
//           data.find((locale) => locale.isDefault);
//         setCurrentLocale(initialLocale || null);
//       } catch (error) {
//         console.error("Error fetching locales:", error);
//       }
//     };
//
//     fetchLocales();
//   }, [pathname]);
//
//   const getLocalizedPath = (localeCode: string) => {
//     const pathParts = pathname.split("/").filter(Boolean);
//     if (locales.some((locale) => locale.code === pathParts[0])) {
//       pathParts[0] = localeCode;
//     } else {
//       pathParts.unshift(localeCode);
//     }
//     return `/${pathParts.join("/")}`;
//   };
//
//   const handleLanguageChange = (locale: Locales) => {
//     setIsDropdownOpen(false);
//     router.push(getLocalizedPath(locale.code));
//   };
//
//   const availableLocales = locales.filter(
//     (locale) => locale.code !== currentLocale?.code,
//   );
//
//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
//       >
//         {currentLocale ? currentLocale.name : "Loading..."}
//       </button>
//       {isDropdownOpen && (
//         <ul className="absolute top-full left-0 bg-white border border-gray-300 shadow-md rounded-md mt-1 w-40 z-10">
//           {availableLocales.map((locale) => (
//             <li key={locale.id} className="hover:bg-gray-100">
//               <button
//                 onClick={() => handleLanguageChange(locale)}
//                 className="block w-full text-left px-4 py-2 text-gray-700 hover:text-gray-900"
//               >
//                 {locale.name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
