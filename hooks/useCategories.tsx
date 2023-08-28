import { Create, Delete, FindAll, FindOne } from "../utils/useSWRConfig";

const endPoint = "/categories";
export const useCategory = () => {
  return {
    createProduct: (params = {}) => Create(`${endPoint}`, params),
    getCategory: (slug: string | null, params = {}) =>
      FindOne(`${endPoint}/${slug}`, params),
    getCategories: (params = {}) => FindAll(`${endPoint}`, params),
    deleteCategories: (slug: string | null) => Delete(`${endPoint}/${slug}`)
  };
};
