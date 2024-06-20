import React, { createContext, useContext, useEffect, useState } from "react";
import { IFirebaseUser} from "../types";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../lib/firebase/api";
import { auth } from "../lib/firebase/config";

export interface ContextType {
    user: IFirebaseUser;
    isAuth: boolean;
}

export const INITIAL_USER = {
    id: "",
    name: "",
    email: "",
    department: ""
}

export const INITIAL_STATE = {
    user: INITIAL_USER,
    isAuth: false,
}

const GlobalContext = createContext<ContextType>(INITIAL_STATE)

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<IFirebaseUser>(INITIAL_USER)
    const [isAuth, setIsAuth] = useState(false)

    const {
        data: userData,
        isSuccess,
        isPending,
        isFetching
    } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    })


    auth.onAuthStateChanged((currentUser) => {
        if(currentUser){
            setIsAuth(true)
        }
        else setIsAuth(false)
    })

    const checkAuth = async() => {

        if(isSuccess){

            const userOb = {
                id: userData?.id,
                name: userData?.name,
                email: userData?.email,
                department: userData?.department
            }

            setUser(() => userOb)

            return true
        }
        else return false
    }

    useEffect(() => {

        const unsubscribe = () => {
            checkAuth();

        }

        return unsubscribe
    },[isAuth, isPending, isFetching])

    return (
        <GlobalContext.Provider value={{user, isAuth}}>
            {children}
        </GlobalContext.Provider>
    )

}

export const useGlobalContext = () => useContext(GlobalContext);