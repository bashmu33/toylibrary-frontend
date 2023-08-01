import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth'; 

const AuthContext = React.createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
const [currentUser, setCurrentUser] = useState(null);
const [loading, setLoading] = useState(true);

function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
    setLoading(false);
    setCurrentUser(user);
    });
        return () => unsubscribe();
}, []);

const value = {
    currentUser,
    signup,
};

return (
    <AuthContext.Provider value={value}>
    {!loading && children}
    </AuthContext.Provider>
);
}

