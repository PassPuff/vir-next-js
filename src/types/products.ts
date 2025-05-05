import { ImageProps } from "./base";
import { CategoryProps } from "@/types/categories";

export interface ProductsProps {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  article?: string;
  description: string;
  order_price?: number;
  stock_price?: number;
  new_price?: number;
  sorting: number;
  locale: string;
  is_new?: boolean;
  is_popular?: boolean;
  is_special_offer?: boolean;
  is_display_from?: boolean;

  image?: ImageProps;
  category?: CategoryProps | undefined;
  characteristics?: {
    id: number;
    documentId: string;
    name: string;
    description: string;
    sorting: number;
    locale: string;
    slug: string;
  }[];
}
