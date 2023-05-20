
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

  return (
    <div>
      <h1 className="header">Food Sharing Platform</h1>
      <div className="section">
        <h2>Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={user.id}>
              {index + 1}. {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Food Items</h2>
        <ul>
          {foodItems.map((foodItem, index) => (
            <li key={foodItem.id}>
              {index + 1}. {foodItem.name} - {foodItem.description}
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Donations</h2>
        <ul>
          {donations.map((donation, index) => (
            <li key={donation.id}>
              {index + 1}. {donation.donor.name} donated {donation.quantity} {donation.food_item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
