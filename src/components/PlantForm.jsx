import { useState } from 'react';

function PlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: formData.price,
      soldOut: false  // Make sure soldOut is included
    };
    
    onAddPlant(newPlant);
    
    // Reset form
    setFormData({ name: '', image: '', price: '' });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="new-plant-form">
      <input
        type="text"
        name="name"
        placeholder="Plant name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        step="0.01"
        required
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default PlantForm;