import { CategoryProps } from '@/types/categories';
import fetchApi from './strapi';




export const getCategories = async (locale: string) => {
	return await fetchApi<CategoryProps[]>({
		endpoint: "categories",
		locale,
		next: {
			cache: "force-cache",
		},
		wrappedByKey: "data",
	});
};
