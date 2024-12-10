export default interface Main {
  id: number;
  documentId: string;
  title: string;
  description: string;
  name: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: {
    url: string;
  };
}
