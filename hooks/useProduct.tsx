import { Create, Delete, FindAll, FindOne, Update } from "utils/useSWRConfig";


const endPoint = "/products";
export const useProducts = () => {
  return {
    createProduct: (params = {}) => Create(`${endPoint}`, params),
    editProduct: (slug: string | null, params = {}) => Update(`${endPoint}/${slug}`, params),
    getProductBySlug: (slug: string | null) =>
      FindOne(`${endPoint}/${slug || ""}`),
    getProductParams: (params = {}) => FindAll(`${endPoint}/params`, params),
    getProducts: (params = {}) => FindAll(`${endPoint}`, params),
    searchProduct: (params = {}) => FindAll(`${endPoint}/search`, params),
    deleteProduct: (id: string | null) => Delete(`${endPoint}/${id}`),
  };
};
