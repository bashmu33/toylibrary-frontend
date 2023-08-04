import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { addUserToBackend } from '../api';

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

        //here i am storing additional data in backend
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

async function isAdmin() {
    if (currentUser) {
    const adminEmails = ['adastudent123@gmail.com'];
    return adminEmails.includes(currentUser.email);
    }
    return false;
}

const value = {
    currentUser,
    login,
    signup,
    isAdmin,
};

return (
    <AuthContext.Provider value={value}>
    {!loading && children}
    </AuthContext.Provider>
);
}
