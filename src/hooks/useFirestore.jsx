import { useReducer,useEffect,useState } from "react";
import { projectFirestore,timestamp } from "../firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state,action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return  { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return {...state, isPending: false, document: action.payload, success: true, error: null}
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }    
        default:
            return state
    }
}

//The useReducer hook is likely used to manage the state of the Firestore data, 
//while the useEffect hook is likely used to fetch the data from the Firestore collection and update the state when changes are made.

//When the state needs to be updated, you can dispatch an action object to the reducer function using the dispatch function returned from the useReducer hook. 
export const useFirestore = (collection) => {
    //dispatch new acxtions to reducer func
    const [response,dispatch] = useReducer(firestoreReducer,initialState)
    //need this to cleanup
    const [ isCancelled, setIsCancelled ] = useState(false)

    //collection ref
    const ref = projectFirestore.collection(collection)

    //we can call this
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled){
            dispatch(action)
        }
    }
    
    //add a document-> doc object
    const addDocument = async (doc) => {
        //first update is pending to be true
        dispatch({type: 'IS_PENDING' })

        try {
            const createdAt = timestamp.fromDate(new Date())
            //pass the created at
            const addedDocument = await ref.add({...doc, createdAt})
            dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })

        } catch (err) {
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message })
        }
    }

    //delete a document
    const deleteDocument = async (id) => {

    }

    //cleanup, never goinna run again beacause of the empty dependency array
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }
}
