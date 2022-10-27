import { getDatabase } from '@firebase/database';
import firebase from  'firebase/compat/app' 
import 'firebase/compat/auth'
import { getFirestore } from 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: 'https://auth-development-70c39-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID 
})

const db = getFirestore(app);
const database = getDatabase(app);

export const auth = app.auth()
export default app
export { db, database };