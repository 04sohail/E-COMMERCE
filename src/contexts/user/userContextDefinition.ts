import { createContext } from "react";
import { LoginUserData } from "../types/types";

// Create UserContext
interface UserContextType {
    user: LoginUserData;
    loginUser: (user: LoginUserData) => void;
    logoutUser: () => void;
}

export const UserContext = createContext<UserContextType>({
    user: {} as LoginUserData,
    loginUser: () => { },
    logoutUser: () => { }
});
