import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';





export default function ParkingSpot(props) {

  const { parkingSpot } = props

  const orderList = useSelector((state) => state.orderList)
  const { loading: orderLoading, error: orderError, orders } = orderList


  // Jag kopierade Json filen till databasen, hade jag gjort den själv så hade jag istället gjort varje parking_spot till ett object så man lättare kan ändra is_available med ".put" 
  function isAvailable() {
    if (!orderLoading && !orderError) {

      for (let i = 0; i < orders.length; i++) {
        let goal = new Date(orders[i].endTime)

        if (orders[i].parking_spot === parkingSpot.number && goal > Date.now()) {
          return false
        }
        else if (!parkingSpot.is_available)
          return false
      }
      return true

    }

  }


  return (

    <Link to={"" + parkingSpot.number} className="cardspot">
      {isAvailable() ? (
        <>
          {!parkingSpot.is_disabled_parking && parkingSpot.type === "car" ? <i className="fa-solid fa-square-parking mb-2"></i> : parkingSpot.is_disabled_parking ? <i className="fa-solid fa-wheelchair"></i> : <p>{parkingSpot.type}</p>}
          {parkingSpot.is_charging_station && isAvailable() ? <i className="fa-solid fa-bolt-lightning text-warning"></i> : null}
        </>
      )
        : <i className="fa-solid fa-ban mb-2 text-danger disabled"></i>}

    </Link>


  );
}