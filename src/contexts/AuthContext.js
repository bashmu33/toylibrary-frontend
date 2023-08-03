import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { addUserToBackend } from '../api';
// import { createUserWithEmailAndPassword } from 'firebase/auth'; 

const AuthContext = React.createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
const [currentUser, setCurrentUser] = useState(null);
const [loading, setLoading] = useState(true);

function signup(email, password, userData) {
    return auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const { uid } = user;

        // Store additional user data in the backend
        const userDataWithUID = { ...userData, firebase_uid: uid };
        return addUserToBackend(userDataWithUID);
    });
}

function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
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
    login,
    signup,
};

return (
    <AuthContext.Provider value={value}>
    {!loading && children}
    </AuthContext.Provider>
);
}

