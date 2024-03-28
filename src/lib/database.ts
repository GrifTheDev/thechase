import { doc, getDoc, updateDoc } from "@firebase/firestore"
import { getDB } from "./firebase"

const { db } = getDB()

async function readDocData(collection: string, docID: string) {

    if (collection == "") collection = "null"
    if (docID == "") docID = "null"

    const docRef = doc(db, collection, docID)
    const docData = (await getDoc(docRef)).data()
    return docData
}

async function updateDocData(collection: string, docID: string, toWrite: any) {
    if (collection == "") collection = "null"
    if (docID == "") docID = "null"


    const docRef = doc(db, collection, docID)
    const docData = await updateDoc(docRef, toWrite) 
    return docData
}

export {readDocData, updateDocData}