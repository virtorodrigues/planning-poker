import { useContext } from "react"
import { UserContext } from "../contexts/user"

export const useUserContext = () => {

  const value = useContext(UserContext);

  if (!value) {
    throw new Error('useUserContext does not exists userProvider');
  }

  return value;
}