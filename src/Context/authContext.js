import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Components/Firebase';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('No hay proveedor de autentificación')
    return context
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const signup = (email, password) =>
        // console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
    
    const login = (email, password) => 
        signInWithEmailAndPassword(auth, email, password)
    
    const logout = () => signOut(auth)

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    };

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
    }
    
    useEffect(() => {
        // console.log('provedor de autentificación cargado');
        const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log(currentUser);
            setUser(currentUser);
            setLoading(false)
        })

        return () => unSuscribe()
    }, [])

    return ( 
        <AuthContext.Provider value={{signup, login, user, logout, loading, loginWithGoogle, resetPassword}}>
            {children}
        </AuthContext.Provider>
    )
    
}