import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
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

async function isAdmin() {
    if (currentUser) {
        try {
            const snapshot = await firestore.collection('roles').doc('admin').get();
            const adminData = snapshot.data();

            if (adminData && adminData.permissions && adminData.permissions.manageUsers) {
                return true;
            }
        } catch (error) {
            console.error('Error checking admin role:', error);
        }
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

