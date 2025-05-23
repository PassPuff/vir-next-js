export interface LinkProps {
  id: number;
  label: string;
  href: string;
  isExternal: boolean;
  isButtonLink: boolean;
  type: string;
}

export interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

export interface VideoProps {
  id: number;
  documentId: string;
  url: string;
}

export interface Locales {
  id: number;
  documentId: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  isDefault: boolean;
}
