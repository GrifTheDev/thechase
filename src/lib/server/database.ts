import { doc, getDoc } from "@firebase/firestore"
import { getDB } from "./firebase"

const { db } = getDB()

async function readDocData(collection: string, docID: string) {

    if (collection == "") collection = "null"
    if (docID == "") docID = "null"

    const docRef = doc(db, collection, docID)
    const docData = (await getDoc(docRef)).data()
    return docData
}

export {readDocData}