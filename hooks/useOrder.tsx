import { Delete, FindAll, FindOne, Update } from "../utils/useSWRConfig"


const endpoint = '/orders'
export const useOrder = () => {
  return {
    getOrders: () => FindAll(`${endpoint}`),
    getOrder: (id: string | null) => FindOne(`${endpoint}/${id}`),
    updateOrder: (id: string | null, params = {}) => Update(`${endpoint}/${id}`, params),
    deleteOrder: (id: string | null) => Delete(`${endpoint}/${id}`)
  }
}