//// admin panelindeki allproducts componenti
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db, storage } from '../../../firebase/config'
import Loader from '../../loader/Loader'
import styles from "./ViewProducts.module.scss"
import { Link } from 'react-router-dom'
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'

const ViewProducts = () => {

  const [products, setProducts] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    getProducts();
  },[])

  const getProducts = () => {
    setIsLoading(true)
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt","desc"))
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot)
        // console.log(snapshot.docs[0].data())
        const allProducts = snapshot.docs.map((doc)=>({
          id: doc.id,
          ...doc.data()
        }))
        // console.log(allProducts)
        setProducts(allProducts)
        setIsLoading(false)
      })
    }
    catch(error){
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product!!!',
      'You are about to delete this product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id,imageURL)
      },
      function cancelCb(){

      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: 'orangered',
        okButtonBackground: 'orangered',
        cssAnimationStyle: 'zoom'
      }
    )
  }
  const deleteProduct = async(id, imageURL) => {
    try {
      await deleteDoc(doc(db,"products",id))
      const storageRef = ref(storage, imageURL)
      await deleteObject(storageRef)
      toast.success("Product deleted successfully")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.table}>
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No product found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const { id, name, price, imageURL, category} = product
              return(
                <tr key={id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <img src={imageURL} alt={name} style={{ width: "100px"}}></img>
                  </td>
                  <td>
                    {name}
                  </td>
                  <td>
                    {category}
                  </td>
                  <td>
                    {`$${price}`}
                  </td>
                  <td className={styles.icons}>
                    <Link to="/admin/add-product/">
                      <FaEdit size={20} color="green"/>
                    </Link>
                    &nbsp;
                    <FaTrashAlt size={18} color="red" onClick={()=> confirmDelete(id,imageURL)}/>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )

      }
    </div>
    </>
  )
}

export default ViewProducts