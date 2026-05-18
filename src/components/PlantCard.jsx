import { useState } from 'react';
import './PlantCard.css';

function PlantCard({ plant, onToggleSoldOut }) {
  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
       <p>Price: {plant.price}</p>
      {plant.soldOut ? (
        <button className="sold-out" disabled>Sold Out</button>
      ) : (
        <button className="primary" onClick={() => onToggleSoldOut(plant.id, plant.soldOut)}>
          In Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;