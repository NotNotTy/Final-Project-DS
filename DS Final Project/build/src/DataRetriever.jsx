import {db} from './firebase.js'
import { doc, getDoc, setDoc } from "firebase/firestore";


const getTheme = async function(themeID) {
    const docRef = doc(db, "themes", themeID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    const data = docSnap.get("theme")
    return data;
   
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
    }

    // getDoc(doc(db, "themes",themeID)).then(docSnap => {
    //     if (docSnap.exists()) {
    //       console.log("Document data:", docSnap.data());
    //       return docSnap.get("theme");
    //     } else {
    //       console.log("No such document!");
    //       return null;
    //     }
    //   })

}

const getField = async function(themeID, fieldID){
    const fields = ["item1","item2","item3","item4","item5"];
    const docRef = doc(db, "themes", themeID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    const data = docSnap.get(fieldID);
    return data.toUpperCase();
   
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
    }

}

export {getTheme, getField}