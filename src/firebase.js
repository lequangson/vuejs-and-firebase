import { initializeApp } from 'firebase'

// firebase init goes here
const config = {
  apiKey: "AIzaSyCN53l-VNTESV-mHsiiA5BSbZSVGrCHNvI",
  authDomain: "fortest-ec55e.firebaseapp.com",
  databaseURL: "https://fortest-ec55e.firebaseio.com",
  projectId: "fortest-ec55e",
  storageBucket: "fortest-ec55e.appspot.com",
  messagingSenderId: "498213447034",
  appId: "1:498213447034:web:fc97e267897016023d22c3",
  measurementId: "G-QPD7T6NFLQ"
}
const app = initializeApp(config)
export const db = app.firestore()
export const todosCollection = db.collection('todos')
