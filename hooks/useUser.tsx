import { Delete, FindAll } from "../utils/useSWRConfig";

const endPoint = "/users";

export const useUsers = () => {
  return {
    getUserStats: () => FindAll(`${endPoint}/stats`),
    getUsers: () => FindAll(`${endPoint}`),
    deleteUser: (id: string | null) => Delete(`${endPoint}/${id}`),
  }
}