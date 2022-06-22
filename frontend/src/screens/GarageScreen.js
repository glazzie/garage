import React, { useEffect } from 'react'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { detailsFloor } from '../actions/floorActions'
import { useParams } from 'react-router-dom'
import ParkingSpot from '../components/ParkingSpot'
import { listOrders } from '../actions/orderActions'

export default function GarageScreen(props) {


  const dispatch = useDispatch()

  const floorNr = parseInt(useParams().id);

  const floorDetails = useSelector(state => state.floorDetails)
  const { loading, error, floor } = floorDetails

  const orderList = useSelector((state) => state.orderList)
  const { loading: orderLoading, error: orderError } = orderList


  useEffect(() => {
    dispatch(detailsFloor(floorNr))
    dispatch(listOrders())
  }, [dispatch, floorNr])

  return (


    <div className='row h-100'>
      <div className='col-sm-12 my-auto'>
        {loading || orderLoading ?
          (<LoadingBox></LoadingBox>)
          :
          error || orderError ?
            (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (<>

              <div className='center'>
                <div className='d-flex flex-wrap'>
                  {floor[0].parking_spots.map((park, index) => (

                    index % 2 ? <div key={park.number} className='right'><ParkingSpot parkingSpot={park}></ParkingSpot></div> : <div key={park.number} className='left'><ParkingSpot parkingSpot={park}></ParkingSpot></div>

                  ))}
                </div>
              </div>


            </>
            )
        }
      </div>
    </div>
  )
}
