import { initializeApp } from "firebase/app";
import { getFirestore,collection,doc,getDocs,getDoc,query, where } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAyk9HJ2Jv-z5mc_Hj8H6zN008eHxscP_8",
  authDomain: "vanlife-2a1a5.firebaseapp.com",
  projectId: "vanlife-2a1a5",
  storageBucket: "vanlife-2a1a5.appspot.com",
  messagingSenderId: "156392173232",
  appId: "1:156392173232:web:c4654e19e5d8f2d5be1575"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollectionsRef=collection(db,"van");
export async function getVans()
{
    const querySnapshot=await getDocs(vansCollectionsRef);
    const dataArr=querySnapshot.docs.map(doc=>({
        ...doc.data(),
        id:doc.id
    }));
    console.log(dataArr);
    return dataArr;
}
export async function getVan(id)
{
    const docRef=doc(db,"van",id);
    const vanSnapshot=await getDoc(docRef);
    return {
        ...vanSnapshot.data(),
        id:vanSnapshot.id
    };
}
export async function getHostVans()
{
    const q=query(vansCollectionsRef,where("hostId","==","123"));
    const querySnapshot=await getDocs(q);
    const dataArr=querySnapshot.docs.map(doc=>({
        ...doc.data(),
        id:doc.id
    }));
    console.log(dataArr);
    return dataArr;
}
export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}