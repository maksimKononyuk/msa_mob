import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  // apiKey: 'AIzaSyDzsyE7Ic65LXRgSihQX_8ZEVa434JugNw',
  // authDomain: 'msa-cloud.firebaseapp.com',
  // projectId: 'msa-cloud',
  // storageBucket: 'msa-cloud.appspot.com',
  // messagingSenderId: '753517963044',
  // appId: '1:753517963044:web:f3ab0b5f86ada6c63675b1'

  // For testing

  apiKey: 'AIzaSyCIr-D2P0n1eOsIwfYoFaRJf-BA2cHhdTM',
  authDomain: 'msa-project-5d390.firebaseapp.com',
  projectId: 'msa-project-5d390',
  storageBucket: 'msa-project-5d390.appspot.com',
  messagingSenderId: '970376848595',
  appId: '1:970376848595:web:e520b8971ee3a6cf9b6026'
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export default storage
