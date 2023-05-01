//// google firebase içerisinde 3 koleksiyon tutulacak: products, orders, reviews. Bu koleksiyonlara ait dökümanların bireysel bilgilerine ihtiyaç duyulduğunda bu hook kullanılacak.
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { toast } from 'react-toastify'

const useFetchDocument = (collectionName, documentID) => { 
  const [document,setDocument] = useState(null)

  useEffect(()=> {
    try {
      const getDocument = async () => {
        const docRef = doc(db, collectionName, documentID)

        onSnapshot(docRef, (doc) => {
          // console.log("Document data:", doc.data());
          const obj = {
            id: documentID,
            ...doc.data(),
          }
          setDocument(obj)
        })
      }
      getDocument();
    } catch(error) {
      toast.error(error)
    }
  }, [collectionName,documentID])
  return document;
}

export default useFetchDocument