import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();



// import Firebase from 'firebase/compat/app';
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import 'firebase/compat/firestore';
// import 'firebase/compat/auth'; 

// import { FieldValue, SnapshotMetadata, arrayUnion } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// import { json } from 'react-router';


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_PUBLIC_API_KEY,
//     authDomain: process.env.REACT_APP_PUBLIC_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PUBLIC_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_PUBLIC_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_PUBLIC_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_PUBLIC_APP_ID,
//     measurementId: process.env.REACT_APP_PUBLIC_MEASUREMENT_ID
//   };
 
// export const createUserProfileDocument = async (userAuth, userInfo) => {
//   if (!userAuth) {
//     return;
//   } else {
//     const userRef = firestore.doc(`users/${userAuth.uid}`);

//     const snapShot = await userRef.get();

//     if (!snapShot.exists) {
//       const { email, uid } = userAuth;
//       const {name, phone, gender,admin, prayerGroup} = userInfo;
//       const createdAt = new Date();

//       try {
//         await userRef.set({
//           name,
//           phone,
//           email,
//           gender,
//           uid,
//           prayerGroup,
//           admin,
//           createdAt
//         })
//       } catch (error) {
//         console.log('error creating user', error.message);
//       }
//     }

//     return userRef;
//   }}


// // }



// Firebase.initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// export const auth = Firebase.auth();
// export const firestore = Firebase.firestore();

// // const provider = new Firebase.auth.GoogleAuthProvider();
// // provider.setCustomParameters({prompt: 'select_account'});
// // export const signInWithGoogle = () => auth.signInWithPopup(provider);

// export default Firebase;