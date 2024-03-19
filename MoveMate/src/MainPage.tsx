import React, { useState, useEffect, useId } from 'react';
import { auth } from './firebase/firebase-config';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';

import TodoList from './Components/todolist';
import Header from './Components/header';
import './Styles/MainPage.scss';

const MainPage = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [user, setUser] = useState<User | null>(null);  // Ensure the user state is typed as User | null.

  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);
  const handleAddressChange = () => {
    console.log('Save the new address here:', newAddress);
    // Here you would typically save the address to the database.
    closeOverlay();
};

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            console.log(currentUser.uid)
            setUser(currentUser);  // Set the authenticated user to state.
        } else {
            // If no user is signed in, sign in anonymously.
            signInAnonymously(auth).catch((error) => {
                console.error(error);
            });
        }
    });
    
    return () => unsubscribe();  // Clean up the subscription on unmount.
}, []);


return (
    <>
      <Header />
      <TodoList user={user} />  {/* Pass the user object to TodoList. */}
      <div className="service" onClick={openOverlay}>Change Address</div>
      {isOverlayOpen && (
          <div className="overlay">
          <div className="overlay-content">
            <button className="close-btn" onClick={closeOverlay}>X</button>
            <label>Current Address:</label>
            <input
              type="text"
              value={currentAddress}
              onChange={(e) => setCurrentAddress(e.target.value)}
              placeholder="Current Address"
              />
            <label>New Address:</label>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="New Address"
              />
            <button onClick={handleAddressChange}>Change Address</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MainPage;
