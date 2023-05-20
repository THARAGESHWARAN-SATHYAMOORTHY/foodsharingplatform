import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the Food Sharing Platform!</p>
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users/')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <Link to="/users/create">Create User</Link>
    </div>
  );
}

function CreateUser() {
  // Implement logic to create a user
  return (
    <div>
      <h2>Create User</h2>
      <p>Form to create a new user goes here</p>
    </div>
  );
}

function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetch('/api/fooditems/')
      .then((response) => response.json())
      .then((data) => setFoodItems(data));
  }, []);

  return (
    <div>
      <h2>Food Items</h2>
      <ul>
        {foodItems.map((foodItem) => (
          <li key={foodItem.id}>
            {foodItem.name} - {foodItem.description}
          </li>
        ))}
      </ul>
      <Link to="/fooditems/create">Create Food Item</Link>
    </div>
  );
}

function CreateFoodItem() {
  // Implement logic to create a food item
  return (
    <div>
      <h2>Create Food Item</h2>
      <p>Form to create a new food item goes here</p>
    </div>
  );
}

function Donations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch('/api/donations/')
      .then((response) => response.json())
      .then((data) => setDonations(data));
  }, []);

  const completeDonation = (donationId) => {
    // Implement logic to mark a donation as completed
  };

  const deleteDonation = (donationId) => {
    // Implement logic to delete a donation
  };

  return (
    <div>
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
      <Link to="/donations/create">Create Donation</Link>
    </div>
  );
}

function CreateDonation() {
  // Implement logic to create a donation
  return (
    <div>
      <h2>Create Donation</h2>
      <p>Form to create a new donation goes here</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <h1 className="header">Food Sharing Platform</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/fooditems">Food Items</Link>
            </li>
            <li>
              <Link to="/donations">Donations</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/users" exact component={Users} />
        <Route path="/users/create" component={CreateUser} />
        <Route path="/fooditems" exact component={FoodItems} />
        <Route path="/fooditems/create" component={CreateFoodItem} />
        <Route path="/donations" exact component={Donations} />
        <Route path="/donations/create" component={CreateDonation} />
      </div>
    </Router>
  );
}

export default App;
