// import React, { useState, useEffect } from 'react';
// import { doc, onSnapshot } from 'firebase/firestore';
// import { db } from '../firebase/firebase-config';

// interface MenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   userId: string;
// }

// const Menu: React.FC<MenuProps> = ({ isOpen, onClose, userId }) => {
//   const [currentAddress, setCurrentAddress] = useState('');

//   useEffect(() => {
//     if (userId) {
//       const addressesDocRef = doc(db, 'users', userId, 'addresses', 'default');

//       const unsubscribe = onSnapshot(addressesDocRef, (doc) => {
//         if (doc.exists()) {
//           const userData = doc.data();
//           setCurrentAddress(userData.addresses ? userData.addresses[0] : '');
//         }
//       });

//       return () => unsubscribe();
//     }
//   }, [userId]);

//   if (!isOpen) return null;

//   return (
//     <div className="menu-background">
//       <div className="menu">
//         <div className="menu_content">
//           <button className="close_btn" onClick={onClose}>X</button>
//           <p>User</p>
//           <label>Current address:</label>
//           <p>{currentAddress || 'No address set'}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;
