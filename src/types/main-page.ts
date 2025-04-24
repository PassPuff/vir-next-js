import { Block } from "./blocks";
import { LinkProps, ImageProps, VideoProps } from "./base";

export interface HeroBanner {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  isSpecial: boolean;
  link: LinkProps;
  image: ImageProps;
  video: VideoProps;
}

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
