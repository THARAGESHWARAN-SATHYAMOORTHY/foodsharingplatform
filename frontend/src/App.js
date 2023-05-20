import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch('/api/users/')
      .then((response) => response.json())
      .then((data) => setUsers(data));

    fetch('/api/fooditems/')
      .then((response) => response.json())
      .then((data) => setFoodItems(data));

    fetch('/api/donations/')
      .then((response) => response.json())
      .then((data) => setDonations(data));
  }, []);

  const createUser = () => {
    // Implement logic to create a user
  };

  const createFoodItem = () => {
    // Implement logic to create a food item
  };

  const createDonation = () => {
    // Implement logic to create a donation
  };

  const completeDonation = (donationId) => {
    // Implement logic to mark a donation as completed
  };

  const deleteDonation = (donationId) => {
    // Implement logic to delete a donation
  };

  return (
    <div>
      <h1 className="header">Food Sharing Platform</h1>
      <div className="section">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
        <button onClick={createUser}>Create User</button>
      </div>
      <div className="section">
        <h2>Food Items</h2>
        <ul>
          {foodItems.map((foodItem) => (
            <li key={foodItem.id}>
              {foodItem.name} - {foodItem.description}
            </li>
          ))}
        </ul>
        <button onClick={createFoodItem}>Create Food Item</button>
      </div>
      <div className="section">
        <h2>Donations</h2>
        <ul>
          {donations.map((donation) => (
            <li key={donation.id}>
              {donation.donor.name} donated {donation.quantity} {donation.food_item.name}
              {!donation.is_completed && (
                <button onClick={() => completeDonation(donation.id)}>Complete</button>
              )}
              <button onClick={() => deleteDonation(donation.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <button onClick={createDonation}>Create Donation</button>
      </div>
    </div>
  );
}

export default App;
