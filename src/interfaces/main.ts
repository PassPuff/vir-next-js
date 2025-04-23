export interface Link {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
  isButtonLink: boolean;
  type: string;
}

export interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

export interface HeroBanner {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  isSpecial: boolean;
  link: Link;
  image: Image;
  video: string;
}

export interface SectionMissionBlock {
  __component: "blocks.section-mission";
  id: number;
  subHeading: string;
  heading: string;
}

export interface PurchaseProcedureCard {
  id: number;
  title: string;
  description: string;
  image: Image | null;
}

export interface SectionPurchaseProcedureBlock {
  __component: "blocks.section-purchase-procedure";
  id: number;
  header: string;
  cards: PurchaseProcedureCard[];
}

export type Block = SectionMissionBlock | SectionPurchaseProcedureBlock;

export interface Data {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  heroBanner: HeroBanner[];
  blocks: Block[];
}

export interface ApiResponse {
  data: Data;
  meta: Record<string, unknown>;
}
