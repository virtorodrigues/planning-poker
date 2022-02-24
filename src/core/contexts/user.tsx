import { child, get, push, ref, set, ThenableReference } from "firebase/database";
import { createContext, ReactNode, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { database } from "../../services/firebase";
import { UserProps } from "../types";

type UserProviderProps = {
  children: ReactNode;
}

type UserContextProps = {
  user: UserProps;
  setUser: (user: UserProps) => void;
  createUser: ({ roomKey, userRef }: CreateUserProps) => Promise<void>;
}

type CreateUserProps = {
  roomKey: string;
  userRef: ThenableReference;
}

const UserContext = createContext({} as UserContextProps);

const UserProvider = ({ children }: UserProviderProps) => {
  const [cookie] = useCookies(['planning-poker-user-name']);
  const [user, setUser] = useState({} as UserProps);

  async function createUser({ roomKey, userRef }: CreateUserProps): Promise<void> {
    const dbRef = ref(database);

    const newUser = {
      name: cookie['planning-poker-user-name'] || '',
      admin: false,
      score: 0,
      status: 'initial',
    };

    await get(child(dbRef, `rooms/${roomKey}/users`)).then((snapshot) => {

      if (!snapshot.val()) {
        newUser.admin = true;
      }

      set(userRef, newUser);

    }).catch((error) => {

      console.error(error);
    });

    setUser({ ...newUser, key: userRef.key || '' });
  }

  const value = useMemo(() => ({
    user, setUser, createUser
  }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext };