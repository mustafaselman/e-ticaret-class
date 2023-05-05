//// home kısmında ürün filtreleme yapılan sol yer
import React, { useEffect, useState } from 'react'
import styles from "./ProductFilter.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../redux/slice/productSlice'
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../../redux/slice/filterSlice'

const ProductFilter = () => {

  const [category,setCategory] = useState("All")
  const [brand,setBrand] = useState("All")
  const [price,setPrice] = useState(0)
  
  const products = useSelector(selectProducts)
  const minPrice = useSelector(selectMinPrice)
  const maxPrice = useSelector(selectMaxPrice)
  
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ]
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand))
  ]
  useEffect(()=>{
    setPrice(maxPrice)
  },[maxPrice])
  useEffect(()=>{
    dispatch(FILTER_BY_BRAND({products,brand}))
  },[dispatch,products,brand])

  useEffect(()=>{
    dispatch(FILTER_BY_PRICE({products,price}))
  },[dispatch,products,price])

  const filterProducts = (cat) => {
    setCategory(cat)
    dispatch(FILTER_BY_CATEGORY({products, category: cat}))
  }

  const clearFilters = () => {
    setCategory("All")
    setBrand("All")
    setPrice(maxPrice)
    dispatch(FILTER_BY_CATEGORY({products, category: "All"}))
  }
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat,index) => {
          return (
            <button key={index} type="button" className={`${category}` === cat ? `${styles.active}` : null} onClick={()=>filterProducts(cat)}>&#8250; {cat}</button>
          )
        })
        }
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e)=> setBrand(e.target.value)} name="brand">
          {allBrands.map((brand,index)=> {
            return (
              <option key={index} value={brand}>{brand}</option>
            )
          })}
        </select>
        <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div className={styles.price}>
          <input type="range" value={price} onChange={(e)=>setPrice(e.target.value)} name="price" min={minPrice} max={maxPrice} />
        </div>
        <br/>
        <button className="--btn --btn-danger" onClick={clearFilters}>Clear Filter</button>
      </div>
    </div>
  )
}

export default ProductFilter