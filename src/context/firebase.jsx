import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCczPrduYlyNrDOdvLfootFvo1M2fB4xsQ",
    authDomain: "alpaago-ea46c.firebaseapp.com",
    projectId: "alpaago-ea46c",
    storageBucket: "alpaago-ea46c.appspot.com",
    messagingSenderId: "1061021753803",
    appId: "1:1061021753803:web:2cbefa23fd6f9cb167564e",
    measurementId: "G-VDJVTTD44F",
    databaseURL: "https://alpaago-ea46c-default-rtdb.firebaseio.com"

  };

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp); 

const FirebaseContext = createContext(null);

export const useFirebase = useContext(FirebaseContext)

export const FirebaseProvider = (props) => {

    const registerWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }


    return (
        <FirebaseContext.Provider value={{ registerWithEmailAndPassword }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}