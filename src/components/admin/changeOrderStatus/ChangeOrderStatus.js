//// admin panelindeki order componentinin içindeki orderlardan herhangi birine tıklayınca çıkan order details komponentinin içindeki update status
import React, { useState } from 'react'
import styles from "./ChangeOrderStatus.module.scss"
import Loader from '../../loader/Loader'
import Card from '../../card/Card'
import { useNavigate } from 'react-router-dom'
import { Timestamp, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db } from '../../../firebase/config'

const ChangeOrderStatus = ({order,id}) => {

  const [status,setStatus] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate();

  const editOrder = (e,id) => {
    e.preventDefault();
    setIsLoading(true)
    const orderConfig = {
      orderStatus: status,
      editedAt: Timestamp.now().toDate()
    };
    try {
      updateDoc(doc(db,"orders",id),orderConfig);
      setIsLoading(false)
      toast.success("Order status changed successfully")
      navigate("/admin/orders")
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.status}>
      <Card cardClass={styles.card}>
        <h4>Update Status</h4>
        <form onSubmit={(e)=>editOrder(e,id)}>
          <span>
            <select value={status} onChange={(e)=> setStatus(e.target.value)}> 
              <option value="" disabled>
                -- Choose One --
              </option>
              <option value="Order Placed...">Order Placed...</option>
              <option value="Processing...">Processing...</option>
              <option value="Shipped...">Shipped...</option>
              <option value="Delivered">Delivered</option>
            </select>
          </span>
          <span>
            <button type="submit" className="--btn --btn-primary">Update Status</button>
          </span>
        </form>
      </Card>
    </div>
    </>
  )
}

export default ChangeOrderStatus