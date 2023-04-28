import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// This is a custom hook that provides access to the AuthContext object and its associated state and dispatch function.
// If the context object is not available, it throws an error message.

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw Error("useAuthCOntext must be inside an AuthContextProvider")
    }
    return context
}