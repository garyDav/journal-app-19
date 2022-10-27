import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBU-EsZOgeqkPIxwpQF2PDK_gtwtBPP2wI',
  authDomain: 'react-app-cursos-b5ccf.firebaseapp.com',
  projectId: 'react-app-cursos-b5ccf',
  storageBucket: 'react-app-cursos-b5ccf.appspot.com',
  messagingSenderId: '878862343949',
  appId: '1:878862343949:web:498dac698e1f35bf111a44',
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { db, googleAuthProvider, firebase }
