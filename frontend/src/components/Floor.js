import React from 'react';
import { Link } from 'react-router-dom'


export default function Floor(props) {
  const { floor } = props
  return (
    <div key={floor._id} className="card1 floor">
      <Link to={`/floor/${floor._id}`}>
        <img className="medium" src={floor.image} alt={floor.name} />
      </Link>
      <div className="card-body1">
        <Link className='text-decoration-none text-color-secondary' to={`/floor/${floor._id}`}>
          <h2 className="card-title1">{floor.name}</h2>
        </Link>
        <div className="price1">{floor.price} kr</div>
      </div>
    </div>
  );
}