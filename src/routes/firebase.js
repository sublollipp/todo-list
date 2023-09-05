// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, addDoc } from "firebase/firestore";
import { goto } from "$app/navigation";
import { userIn, currentId, items } from "./stores";
import { PUBLIC_APIKEY, PUBLIC_AUTHDOMAIN, PUBLIC_PROJECTID, PUBLIC_STORAGEBUCKET, PUBLIC_MESSAGINGSENDERID, PUBLIC_APPID } from "$env/static/public"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase

export const firebaseConfig = {
    apiKey: PUBLIC_APIKEY,
    authDomain: PUBLIC_AUTHDOMAIN,
    projectId: PUBLIC_PROJECTID,
    storageBucket: PUBLIC_STORAGEBUCKET,
    messagingSenderId: PUBLIC_MESSAGINGSENDERID,
    appId: PUBLIC_APPID
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();


//Funktionen for at logge ind. Pt. er Google den eneste måde, jeg har implementeret.
export function GoogleSignIn() {
    //Checker om brugeren findes
    if (auth.currentUser == null || auth.currentUser == undefined) {
        //Hvis ikke, kommer der en google login popup.
        signInWithPopup(auth, GoogleProvider).then((result)=>{userIn.set(result.user);});
    } else {
        //Hvis brugeren er logget ind på sin enhed, auto-loginner knappen bare en.
        userIn.set(auth.currentUser);
    }
}

export function GithubSignIn() {
    //Checker om brugeren findes
    if (auth.currentUser == null || auth.currentUser == undefined) {
        //Hvis ikke, kommer der en google login popup.
        signInWithPopup(auth, GithubProvider).then((result)=>{userIn.set(result.user);});
    } else {
        //Hvis brugeren er logget ind på sin enhed, auto-loginner knappen bare en.
        userIn.set(auth.currentUser);
    }
}

export let loginerror = "";

export function emailSignUp(email, password, username) {
    //Hvis der er et brugernavn
    if (username != null && username != "") {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //"Neeeej, du må ikke neste .then stateme-" stfu
            updateProfile(userCredential.user, {displayName: username}).then(userIn.set(auth.currentUser));
            //Siden skal af en eller anden grund reloade, før brugernavnet reloader ordentligt i ProfilHeader
            window.location.href="/"
        })
    .catch((error)=>{
        //Det godt at kunne vise brugeren dette her, men pt. er jeg for doven. Symbolske variabler, som man bla. kan bruge til at hacke folks konti.
        console.log("Code: " + error.code);
        console.log("Message: " + error.message);
        if (error.code == "auth/invalid-email") {
            loginerror = "Du skal bruge en email";
        } else if (error.code == "auth/missing-password") {
            loginerror = "Du skal bruge et password";
        } else if (error.code == "auth/email-already-in-use") {
            loginerror = "Denne email bruges allerede";
        } else if (error.code == "auth/invalid-email") {
            loginerror = "Din e-mail ser lidt spøjs ud. Check lige, at du har skrevet den rigtigt."
        }
    })};
}

//Når nogen prøve at logge ind
export function emailSignInAttempt(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    userIn.set(userCredential.user);
    console.log("Email-bruger: " + JSON.stringify(userCredential.user));
  })
  .catch((error) => {
    console.log("Code: " + error.code);
    console.log("Message: " + error.message);
    /*
    Imagine at have sikkerhed. Denne error code bliver returnet af firebase, når man prøver at logge ind med en email, der ikke er tilknyttet en konto.
    Hvordan Fandt jeg ud af det? console.log statements
    */
    if (error.code == "auth/user-not-found") {
        //Personligt hader jeg at skulle taste email og password igen efter at blive redirected. Voliá; En (yderst sikker og yderst innovativ) løsning!
        localStorage.setItem("tempmail", email);
        localStorage.setItem("temppass", password);
        goto('/SignUp');
    }
  });
}

//Log ud af tingen. Google er arbitrært, skulle bare finde på et eller andet navn, som firebase ikke har nuppet
export async function signOutOfGoogle() {
    await signOut(auth);
    userIn.set(null);
    items.set([]);
}

//Napper brugerens noter
export async function fetchUserData() {
    //Docref skal vente med at sætte sin værdi til der rent faktisk er en
    const docRef = await getDoc(doc(db, "users", auth.currentUser.uid));
    //Sætter currentId til 0 for at forhindre at den bliver sat til null eller undefined på mærkelige måder
    currentId.set(0);
    //Nogle gange defaulter online-listen til et object, som man ikke kan f.eks. læse længden af med .length. Det kan vi ikke have kommer ned i browseren, for så kommer der errors.
    if (Array.isArray(docRef.get('list'))) {items.set(docRef.get('list'));}
    //Som sagt, ikke noget af det "id undefined" pis.
    if (docRef.get('id') != undefined) {
    currentId.set(docRef.get('id'));
    }
    //Elsker debugging
    console.log("Fetched?" + JSON.stringify(items) + " id: " + JSON.stringify(currentId));
}

//Kører når brugeren skifter bruger eller logger ind. U er vistnok det nye auth state (useren, eller null/undefined hvis man er logget ud)
onAuthStateChanged(auth, (u)=>{if (u != null) {
    userIn.set(auth.currentUser); console.log("auth changed " + auth.currentUser.uid);
    fetchUserData(auth.currentUser.uid);
}})

//SetItem kan ikke lide stores
let nedid = 0;
//id har det med at blive sat til null. Hellere for mange safety measures end for få.
currentId.subscribe((i)=>{if (currentId != null) {nedid = i}});
//items.subscribe kører, når items ændrer sig. "i" er den nye værdi. Her er det ikke som store, men som ren værdi. Derfor kan den parses direkte videre til firebase (firebase hader stores)
items.subscribe((i)=>{if (auth.currentUser != null && i != undefined && nedid != undefined) {console.log("i is " + JSON.stringify(i) + " and id is " + JSON.stringify(nedid)); setDoc(doc(db, "users", auth.currentUser.uid), {id: nedid, list: i})}});

//(Btw den der items.subscribe ting kører sådan en milliard gange af en eller anden grund)