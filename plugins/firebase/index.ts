import { initializeApp, FirebaseOptions } from 'firebase/app'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
  where,
  query,
  limit,
  orderBy,
  FieldPath,
  WhereFilterOp,
} from 'firebase/firestore'

const app = initializeApp(process.env.firebaseConfig as FirebaseOptions)
const db = getFirestore(app)

export const getFirestoreFormat = (object: any) => {
  return normalizeObject(object)
}

const normalizeObject = (object: any) => {
  if (object === undefined) {
    return null
  } else if (typeof object === 'string' || object === null) {
    return object
  } else if (Array.isArray(object)) {
    return object.map((o): any => {
      return normalizeObject(o)
    })
  } else if (Object.keys(object).length) {
    const result: {
      [key: string]: any
    } = {}

    Object.keys(object).forEach((key): any => {
      result[key] = normalizeObject(object[key])
    })
    return result
  }

  return object
}

export class FirebaseHelper {
  static async fetchIndex(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName))
      return querySnapshot
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async fetchItem(collectionName: string, docId: string) {
    try {
      const docSnap = await getDoc(doc(db, collectionName, docId))
      if (!docSnap?.exists()) throw new Error('Document not found')
      return docSnap
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async search(
    collectionName: string,
    {
      wheres,
      l = 10,
      ob = 'createdAt',
    }: {
      wheres: {
        fieldPath: string | FieldPath
        optStr: WhereFilterOp
        value: unknown
      }[]
      l?: number
      ob?: string
    }
  ) {
    try {
      const collectionRef = collection(db, collectionName)
      const processedWheres = wheres.map((w) =>
        where(w.fieldPath, w.optStr, w.value)
      )

      const q = query(collectionRef, ...processedWheres, orderBy(ob), limit(l))
      const querySnapshot = await getDocs(q)
      return querySnapshot
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async create(collectionName: string, postData: object) {
    const data = getFirestoreFormat(postData)

    try {
      const docRef = await addDoc(collection(db, collectionName), data)
      return { id: docRef.id }
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async update(collectionName: string, docId: string, postData: object) {
    const data = getFirestoreFormat(postData)

    try {
      const docRef = doc(db, collectionName, docId)
      await updateDoc(docRef, data)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static getFirestoreFormat(object: any) {
    return normalizeObject(object)
  }
}
