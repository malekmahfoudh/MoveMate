import { useState, useEffect } from "react";
import { auth, db } from "./firebase/firebase-config";
import { signInAnonymously, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import TodoList from "./Components/todolist";
import Header from "./Components/header";
import "./Styles/MainPage.scss";

const MainPage = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);

  //ADDRESS FETCHING, USER HANDLER AND ADDRESS CHANGE FROM FIREBASE
  useEffect(() => {
    const fetchAddresses = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentAddress(userData.currentAddress || "");
        }
      }
    };

    fetchAddresses();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        signInAnonymously(auth).catch((error) => console.error(error));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddressChange = async () => {
    if (user && newAddress.trim() !== "") {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { currentAddress: newAddress });

      setCurrentAddress(newAddress);
      setNewAddress("");
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
            <h3>Nuvarande adress:</h3>
            <p>{currentAddress}</p>
            <label>Ny adress:</label>
            <input
              className="address_input"
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Ny adress"
            />
            <button className="address_btn" onClick={handleAddressChange}>
              Spara
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
