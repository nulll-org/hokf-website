import firebase from 'firebase/app';

import 'firebase/firestore'

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timeStamp = firebase.firestore.Timestamp.fromDate(new Date());

const productCollection = firebaseApp.firestore().collection('products')
const orderCollection = firebaseApp.firestore().collection('orders')
const inventoryCollection = firebaseApp.firestore().collection('inventory')

export { timeStamp, productCollection, orderCollection, inventoryCollection }
export default firebaseApp.firestore()