//// oluşturulan tüm cardlar için kullanılan en dış div ve className belirleme olayını tekrarlamamak adına yazılan bir component
import React from 'react'
import styles from "./Card.module.scss"

const Card = ({children, cardClass}) => {
  return (
    <div className={`${styles.card} ${cardClass}`}>{children}</div>
  )
}

export default Card