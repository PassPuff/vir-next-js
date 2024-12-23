export default interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  orderPrice: number;
  stockPrice: number;
  newPrice: number;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  imageMain: {
    url: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
    };
  };
  category: {
    slug: string;
    name: string;
    description: string;
  };
  data: {
    title: string;
    description: string;
  };
}
