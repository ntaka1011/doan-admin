import { Create } from "../utils/useSWRConfig";

const endPoint = "/auth"

export const useAuth = () => {
  return {
    loginUser: (params = {}) => Create(`${endPoint}/login`, params),
  }
}