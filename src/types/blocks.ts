import { ImageProps } from "./base";
import { type BlocksContent } from "@strapi/blocks-react-renderer";

type ComponentType =
  | "blocks.section-choice"
  | "blocks.section-mission"
  | "blocks.section-purchase-procedure";

interface Base<
  T extends ComponentType,
  D extends object = Record<string, unknown>,
> {
  id: number;
  __component?: T;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  data?: D;
}

export type Block =
  | SectionChoiceProps
  | SectionMissionProps
  | SectionPurchaseProcedureProps;

export interface SectionChoiceProps extends Base<"blocks.section-choice"> {
  id: number;
  title: string;
  text?: BlocksContent;
  image?: ImageProps;
}

export interface SectionMissionProps extends Base<"blocks.section-mission"> {
  id: number;
  subHeading?: string;
  heading?: string;
}

export interface SectionPurchaseProcedureProps
  extends Base<"blocks.section-purchase-procedure"> {
  id: number;
  heading?: string;
  cards?: PurchaseProcedureCard[];
}

interface PurchaseProcedureCard {
  id: number;
  title: string;
  description: string;
  image: ImageProps | null;
}
