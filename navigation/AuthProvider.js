import React, {useState} from 'react';
import {createContext} from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const ref = firebase.firestore().collection('Users')
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async(email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch(e) {
                        console.log(e);
                    }
                },
                register: async(email, password, handle, first, last) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                        await ref.add({
                            handle: handle,
                            first: first,
                            last: last,
                            uid: user.uid,
                        });
                    } catch(e) {
                        console.log(e);
                    }
                },

                logout: async() => {
                    try{
                        await auth().signOut();
                    } catch(e) {
                        console.log(e);
                    }
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
};

