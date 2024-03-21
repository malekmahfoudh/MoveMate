import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase/firebase-config';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, query, getDocs, doc, updateDoc } from 'firebase/firestore';

import TodoList from './Components/todolist';
import Header from './Components/header';
import './Styles/MainPage.scss';

const MainPage = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [addresses, setAddresses] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (user) {
        const addressesRef = collection(db, 'users', user.uid, 'addresses');
        const addressDocs = await getDocs(addressesRef);
        const userAddresses = addressDocs.docs.map(doc => doc.data().address);
        setAddresses(userAddresses);
        if (userAddresses.length > 0) {
          setCurrentAddress(userAddresses[0]);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchAddresses();
      } else {
        signInAnonymously(auth).catch(error => console.error(error));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddressChange = async () => {
    if (user && newAddress.trim() !== '') {
      const addressesRef = collection(db, 'users', user.uid, 'addresses');
      await addDoc(addressesRef, { address: newAddress });

      setAddresses([...addresses, newAddress]);
      setCurrentAddress(newAddress);
      setNewAddress('');
      closeOverlay();
    }
  };

  return (
    <>
      <Header />
      <TodoList user={user} />
      <div className="service" onClick={openOverlay}></div>
      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="close-btn" onClick={closeOverlay}></button>
            <label>Current Address:</label>
            <select value={currentAddress} onChange={e => setCurrentAddress(e.target.value)}>
              {addresses.map((address, index) => (
                <option key={index} value={address}>{address}</option>
              ))}
            </select>
            <label>New Address:</label>
            <input
              type="text"
              value={newAddress}
              onChange={e => setNewAddress(e.target.value)}
              placeholder="New Address"
            />
            <button className='adress_btn' onClick={handleAddressChange}>Save New Address</button>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
