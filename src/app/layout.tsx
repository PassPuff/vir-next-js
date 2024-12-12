// Since we have a `not-found.tsx` page on the root, a layout
// file is required, even if it's just passing children through.
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}