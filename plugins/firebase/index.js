import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  getFirestore,
  startAfter,
  updateDoc,
  where,
  query,
  limit,
  orderBy,
} from 'firebase/firestore'

const app = initializeApp(process.env.firebaseConfig)
export const db = getFirestore(app)

export const getFirestoreFormat = (object) => {
  return normalizeObject(object)
}

const normalizeObject = (object) => {
  if (object === undefined) {
    return null
  } else if (typeof object === 'string' || object === null) {
    return object
  } else if (Array.isArray(object)) {
    return object.map((o) => {
      return normalizeObject(o)
    })
  } else if (Object.keys(object).length) {
    const result = {}

    Object.keys(object).forEach((key) => {
      result[key] = normalizeObject(object[key])
    })
    return result
  }

  return object
}

const addFieldsForAlgolia = (object) => {
  return {
    ...object,
    _tags: [...object.tags, ...object.keywords],
  }
}
export class FirebaseHelper {
  static async fetchIndex(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName))
      return querySnapshot
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async fetchItem(collectionName, docId) {
    try {
      const docSnap = await getDoc(doc(db, collectionName, docId))
      if (!docSnap.exists()) throw new Error('Document not found')
      return docSnap
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async search(
    collectionName,
    { wheres, l = 10, ob = 'createdAt', sa = null, ea = null }
  ) {
    try {
      const collectionRef = collection(db, collectionName)
      const queries = (wheres || []).map((w) =>
        where(w.fieldPath, w.optStr, w.value)
      )
      if (sa !== null) {
        queries.push(startAfter(sa))
      }
      if (ea !== null) {
        queries.push(endAt(ea))
      }

      const q = query(collectionRef, orderBy(ob), ...queries, limit(l))
      const querySnapshot = await getDocs(q)
      return querySnapshot
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async create(collectionName, postData) {
    const data = addFieldsForAlgolia(getFirestoreFormat(postData))

    try {
      const docRef = await addDoc(collection(db, collectionName), data)
      return { id: docRef.id }
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async update(collectionName, docId, postData) {
    const data = addFieldsForAlgolia(getFirestoreFormat(postData))

    try {
      const docRef = doc(db, collectionName, docId)
      await updateDoc(docRef, data)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static getFirestoreFormat(object) {
    return normalizeObject(object)
  }
}
