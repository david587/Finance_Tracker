import { Children, createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

// 1, AuthContext:
// This is a React context object created using the createContext API. It will be used to share authentication-related data (e.g., user session) across the React component tree.
// 2, authReducer:
// This is a reducer function, which takes the current state and an action object as input and returns the new state based on the action type.
// In this case, the reducer function does not handle any actions yet and returns the current state as is.
// 3, AuthContextProvider:
// This is a higher-order component (HOC) that wraps the entire application and provides the AuthContext to all the components in the tree using the AuthContext.Provider component.
// It uses the useReducer hook to manage the authentication-related state and dispatch actions to update the state.


export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return  { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true}
        default:
            return state
    }
}

//entire app will be surrounded with this provider, all comp can access this
export const AuthContextProvider = ({ children }) => {
    const [state,dispatch] = useReducer(authReducer, {
        user: null,
        //we have to save the state before refresh
        authIsReady: false
    })

    //this is why after refresh the user is loggge din in frontend
    useEffect(()=>{
        //communicate with firebase, run when auth changes
        const unsub = projectAuth.onAuthStateChanged((user)=> {
            dispatch({ type: 'AUTH_IS_READY', payload: user })
            //only run 1time->only when the page is refreshed
            unsub()
        })
    },[])

    console.log('AuthContext state:' , state);
    

    return(
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {/* childer is the app component */}
            { children }
        </AuthContext.Provider>
    )
}