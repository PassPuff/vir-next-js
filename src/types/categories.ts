import { ImageProps } from "./base";

export interface CategoryProps {
  id: number;
  documentId: string;
  name: string;
  description: string;
  sorting: number;
  locale: string;
  slug: string;
  image?: ImageProps;
}
