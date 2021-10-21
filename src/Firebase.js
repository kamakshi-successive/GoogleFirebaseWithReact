import firebase from 'firebase';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCR_CTdPFvjrdzLNttVapGU0aM2HqcAh8",
    authDomain: "microfrontend-d44ea.firebaseapp.com",
    projectId: "microfrontend-d44ea",
    storageBucket: "microfrontend-d44ea.appspot.com",
    messagingSenderId: "530631021528",
    appId: "1:530631021528:web:2c5b18590b7f04387198ad",
    measurementId: "G-RECLPTY6EJ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

// we are using a try…catch block along with async functions
//  so that we can handle errors easily and avoid callbacks as 
// much as possible.

const googleProvider = new firebase.auth.GoogleAuthProvider();
const dbs = db.collection("/tutorials");


const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        const user = res.user;
        const query = await db
            .collection("users")
            .where("uid", "==", user.uid)
            .get();
        if (query.docs.length === 0) {
            await db.collection("users").add({
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            })
        }
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const sendPasswordResetEmail = async(email) =>{
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset Link sent!");
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
}

const getAll = () => {
    return dbs;
}

const create = (data) => {
    return dbs.add(data);
}

const update = (id, val) =>{
    return dbs.doc(id).update(val);
}

const remove = (id) => {
    return dbs.doc(id).delete();
}


// const analytics = getAnalytics(app);

export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
    getAll,
    create,
    update,
    remove
};