import { useEffect, useState } from "react";
import { UserContext } from "./userContextDefinition";
import { ReactNode } from "react";
import { LoginUserData } from "../../types/types";



export const UserProvider = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        const userData: LoginUserData = JSON.parse(sessionStorage.getItem("loginUserData") || "[]" as string)
        setUser(userData)
    }, [])
    const [user, setUser] = useState<LoginUserData>({} as LoginUserData);

    const loginUser = (user: LoginUserData) => {
        setUser(user);
        sessionStorage.setItem("loginUserData", JSON.stringify(user))
    };

    const logoutUser = () => {
        sessionStorage.clear()
        setUser({} as LoginUserData); // Clear user data on logout
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
