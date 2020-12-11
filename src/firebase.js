import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAAxASUVPOTL0CMqeYte3PDbW5SWZHsXJQ',
  authDomain: 'livetl-web.firebaseapp.com',
  projectId: 'livetl-web',
  storageBucket: 'livetl-web.appspot.com',
  messagingSenderId: '203054119514',
  appId: '1:203054119514:web:b9ec00c7f16461adf37663'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const auth = firebase.auth();

export {
  firebase, database, auth
};
