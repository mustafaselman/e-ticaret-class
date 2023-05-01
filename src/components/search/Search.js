//// home sayfasındaki productlist de ve admin panelindeki allproduct componentinde kullanılan arama komponenti
import React from 'react'
import styles from "./Search.module.scss"
import {BiSearch} from "react-icons/bi"

const Search = ({value,onChange}) => {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon}/>
      <input type="text" placeholder="Search by Name" value={value} onChange={onChange}/>
    </div>
  )
}

export default Search