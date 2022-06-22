import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, listOrders } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_DELETE_RESET } from '../constants/orderConstants'

export default function OrderListScreen() {

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const orderDelete = useSelector((state) => state.orderDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET })
    dispatch(listOrders())
  }, [dispatch, successDelete])

  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id))
    }
  }
  return (
    <>
      <div className='container'>
        <h1 className='text-light'>Orders</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr className='text-light'>
                <th>ID</th>
                <th>REGNR</th>
                <th>Start date/UTC</th>
                <th>End date/UTC</th>
                <th>sek/h</th>
                <th>TOTAL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className="bg-white py-2 font-smol" key={order._id}>
                  <td className='idw'>{order._id}</td>
                  <td>{order.user.regnr}</td>
                  <td>{order.startTime.substring(0, 10) + " " + order.startTime.substring(11, 16)}</td>
                  <td>{order.endTime.substring(0, 10) + " " + order.endTime.substring(11, 16)}</td>
                  <td>{order.price} sek</td>
                  <td>{order.totalPrice} sek</td>
                  <td>
                    <button type="button" className="btn btn-danger" onClick={() => deleteHandler(order)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}