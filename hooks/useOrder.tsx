import { Delete, FindAll, FindOne, Update } from '../utils/useSWRConfig'

const endpoint = '/orders'
export const useOrder = () => {
  return {
    getOrders: () => FindAll(`${endpoint}`),
    getOrder: (id: string | null) => FindOne(`${endpoint}/${id}`),
    getOrderMonth: () => FindAll(`${endpoint}/totalmonth/`),
    getOrderQuantityMonth: () => FindAll(`${endpoint}/quantityorder/`),
    getOrderIncome: () => FindAll(`${endpoint}/income`),
    updateOrder: (id: string | null, params = {}) => Update(`${endpoint}/${id}`, params),
    deleteOrder: (id: string | null) => Delete(`${endpoint}/${id}`)
  }
}
