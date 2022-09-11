// Import the functions you need from the SDKs you need
// firebase의 버전이 v9이면 경로를 compat/추가되어야함.
import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // firebase 인증 모듈
// import "firebase/compat/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// API KEY는 반드시 환경 변수를 사용하여 공개되지 않도록 주의해야한다.
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PRODUCT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.auth함수의 반환값이 null이면 로그인 하지 않은 상태임.
export const authService = firebase.auth();
