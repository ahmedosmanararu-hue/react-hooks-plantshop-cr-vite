import { useState, useEffect } from 'react';
import PlantCard from './components/PlantCard';
import PlantForm from './components/PlantForm';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all plants on page load
  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(response => response.json())
      .then(data => setPlants(data))
      .catch(error => console.error('Error fetching plants:', error));
  }, []);

  // Add a new plant - POST request with soldOut field
  const handleAddPlant = (newPlant) => {
    // Ensure soldOut is included in the request body
    const plantToSend = {
      ...newPlant,
      soldOut: newPlant.soldOut !== undefined ? newPlant.soldOut : false
    };
    
    fetch('http://localhost:6001/plants', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plantToSend),
    })
      .then(response => response.json())
      .then(savedPlant => {
        setPlants([...plants, savedPlant]);
      })
      .catch(error => console.error('Error adding plant:', error));
  };

  // Toggle sold out status - PATCH request
  const handleToggleSoldOut = (id, currentStatus) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ soldOut: !currentStatus }),
    })
      .then(response => response.json())
      .then(updatedPlant => {
        setPlants(plants.map(plant => 
          plant.id === id ? updatedPlant : plant
        ));
      })
      .catch(error => console.error('Error updating plant:', error));
  };

  // Filter plants by search term using includes() method
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Plantsy</h1>
      
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      
      <PlantForm onAddPlant={handleAddPlant} />
      
      <ul className="cards">
        {filteredPlants.map(plant => (
          <PlantCard 
            key={plant.id}
            plant={plant}
            onToggleSoldOut={handleToggleSoldOut}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;