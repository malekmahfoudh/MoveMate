import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config'; // Adjust the import based on your file structure

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, userId }) => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [savedAddresses, setSavedAddresses] = useState<string[]>([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const addressesDocRef = doc(db, 'addresses', userId);
      const addressesDoc = await getDoc(addressesDocRef);

      if (addressesDoc.exists()) {
        const userData = addressesDoc.data();
        const userAddresses = userData ? userData.addresses : [];
        setSavedAddresses(userAddresses);
        setCurrentAddress(userAddresses[0] || '');
      }
    };

    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  const saveNewAddress = async () => {
    const addressesDocRef = doc(db, 'addresses', userId);
    const updatedAddresses = [...savedAddresses, newAddress];

    // Update the document or create it if it doesn't exist
    await setDoc(addressesDocRef, { addresses: updatedAddresses }, { merge: true });

    setCurrentAddress(newAddress);
    setSavedAddresses(updatedAddresses);
    setNewAddress('');
  };

  if (!isOpen) return null;

  return (
    <div className="menu-background">
      <div className="menu">
        <div className="menu_content">
          <button className="close_btn" onClick={onClose}>X</button>
          <p>User</p>
          <label>Current address</label>
          <select value={currentAddress} onChange={e => setCurrentAddress(e.target.value)}>
            {savedAddresses.map((address, index) => (
              <option key={index} value={address}>
                {address}
              </option>
            ))}
          </select>
          <label>New address</label>
          <input type="text" value={newAddress} onChange={e => setNewAddress(e.target.value)} />
          <button onClick={saveNewAddress}>Save New Address</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
