import React, { useEffect, useState } from 'react'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { detailsFloor } from '../actions/floorActions'
import { useNavigate, useParams } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'

export default function Parkinfo(props) {


  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  const floorNr = parseInt(useParams().id);
  const parkNr = parseInt(useParams().number);

  const floorDetails = useSelector(state => state.floorDetails)
  const { loading, error, floor } = floorDetails

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const placeOrderHandler = () => {
    const startDate = new Date()
    const endDate = new Date(date + " " + time)
    const hours = Math.abs(endDate - startDate) / 36e5;
    const pricePreview = (Math.ceil(hours) * 12)
    if (startDate <= endDate) {
      if (window.confirm('from now til ' + time + " " + date + " Price: " + pricePreview)) {
        dispatch(createOrder({ parking_spot: parkNr, startTime: startDate, endTime: endDate, totalPrice: pricePreview }))
        alert("Well played u parked your car")
        navigate("/")
      }
    } else {
      alert("the planned parking time has already passed")
    }



  }



  useEffect(() => {
    dispatch(detailsFloor(floorNr))
  }, [dispatch, floorNr])

  return (


    <div className='row h-100'>
      <div className='col-sm-12 my-auto'>
        {loading ?
          (<LoadingBox></LoadingBox>)
          :
          error ?
            (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (

              <div className='form bg-white d-flex flex-column text-center justify-content-center align-items-center'>
                {floor[0].parking_spots.map((park) => (
                  park.number === parkNr ?
                    <div key={park.number}>
                      <h1>parking spot: {park.number}</h1>
                      <p>Disabled parking: {park.is_disabled_parking ? <span>Yes</span> : <span>no</span>}</p>
                      <p>Charging station: {park.is_charging_station ? <span>Yes</span> : <span>no</span>}</p>
                      <p>Type: {park.type}</p>
                      {park.is_available && userInfo ?
                        // Den här blir inte occupied även fast det är en pågående order på den platsen (kunde löst det på samma sett som under GarageScreen) men som sagt så hade jag gjort det annourlunda om jag gjorde databasen från scratch
                        <div>
                          <p className='text-success'>Available</p>
                          <button className='btn btn-primary dropdown-toggle' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Park here</button>
                          <div className="dropdown-menu px-3" aria-labelledby="dropdownMenuButton1">
                            <p className="mb-0">Time:</p>
                            <input type="time" name="hour" min="0" max="23" required onChange={(e) => setTime(e.target.value)} />
                            <p className="mb-0">Date:</p>
                            <input type="date" name="min" min="0" max="59" required onChange={(e) => setDate(e.target.value)} />
                            <button className='mx-2 btn btn-primary' onClick={placeOrderHandler}>Submit</button>
                          </div>
                        </div>
                        : park.is_available ? <div><p className='text-success'>Available</p><button className='btn btn-primary' onClick={() => navigate("/login")}>Log in</button> </div> : <div> <p className='text-danger'>Occupied</p> <button className='btn btn-danger disabled'>Park here</button> </div>}
                    </div> : null
                ))}
              </div>



            )
        }
      </div>
    </div>
  )
}
