import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [donations, setDonations] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newFoodItemName, setNewFoodItemName] = useState('');
  const [newFoodItemDescription, setNewFoodItemDescription] = useState('');

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
    fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newUserName,
        email: newUserEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, data]);
        setNewUserName('');
        setNewUserEmail('');
      });
  };

  const createFoodItem = () => {
    fetch('/api/fooditems/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newFoodItemName,
        description: newFoodItemDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFoodItems([...foodItems, data]);
        setNewFoodItemName('');
        setNewFoodItemDescription('');
      });
  };

  const createDonation = (userId, foodItemId, quantity, pickupAddress, deliveryAddress) => {
    fetch('/api/donations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        donor: userId,
        food_item: foodItemId,
        quantity: quantity,
        pickup_address: pickupAddress,
        delivery_address: deliveryAddress,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDonations([...donations, data]);
      });
  };

  const completeDonation = (donationId) => {
    fetch(`/api/donations/${donationId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        is_completed: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedDonations = donations.map((donation) =>
          donation.id === data.id ? data : donation
        );
        setDonations(updatedDonations);
      });
  };

  const deleteDonation = (donationId) => {
    fetch(`/api/donations/${donationId}/`, {
      method: 'DELETE',
    }).then(() => {
      const updatedDonations = donations.filter((donation) => donation.id !== donationId);
      setDonations(updatedDonations);
    });
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
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
          <button onClick={createUser}>Create User</button>
        </div>
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
        <div>
          <input
            type="text"
            placeholder="Name"
            value={newFoodItemName}
            onChange={(e) => setNewFoodItemName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={newFoodItemDescription}
            onChange={(e) => setNewFoodItemDescription(e.target.value)}
          />
          <button onClick={createFoodItem}>Create Food Item</button>
        </div>
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
        <div>
          <h3>Create Donation</h3>
          <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <select
            value={selectedFoodItemId}
            onChange={(e) => setSelectedFoodItemId(e.target.value)}
          >
            <option value="">Select Food Item</option>
            {foodItems.map((foodItem) => (
              <option key={foodItem.id} value={foodItem.id}>
                {foodItem.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={newDonationQuantity}
            onChange={(e) => setNewDonationQuantity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Pickup Address"
            value={newDonationPickupAddress}
            onChange={(e) => setNewDonationPickupAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Delivery Address"
            value={newDonationDeliveryAddress}
            onChange={(e) => setNewDonationDeliveryAddress(e.target.value)}
          />
          <button
            onClick={() =>
              createDonation(
                selectedUserId,
                selectedFoodItemId,
                newDonationQuantity,
                newDonationPickupAddress,
                newDonationDeliveryAddress
              )
            }
          >
            Create Donation
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
