import { Block } from "@/types/blocks";

export interface HomePageProps {
  id: number;
  documentId: string;
  title?: string;
  description?: string;
  locale: string;
  blocks?: Block[];
}
