import axios from "axios"
import { useAppContext } from "./context/AppContext"
import { useAuth } from "./context/AuthContext"

export const useApi = () => {
  const { API_URL } = useAppContext()
  const { token } = useAuth()

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })

  return api
}    