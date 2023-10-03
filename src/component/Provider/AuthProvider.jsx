import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../../Firebase/firebase.config";



export const AuthContext = createContext(null);

 const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginUser = (email, password) =>{
        setLoading(true);
        
        return signInWithEmailAndPassword(auth, email, password)
    }

    // ::: SIGN OUT BUTTON OBSERVING :::
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // :::: OBSERVE THE AUTH CHANGED :::
    useEffect(() =>{
        const unSubscribe =  onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false);
            console.log('Current value of the current user',currentUser);
        })
        return ()=>{
            unSubscribe();
        }
    } ,[])

    const authInfo = { user, createUser, loginUser, logOut, loading }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}