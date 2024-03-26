import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import logo from '../assets/movematelogo2 2.svg';
import text_logo from '../assets/movemate_1.svg';
import { getAuth } from 'firebase/auth'; 
import '../Styles/splashPage.scss';

const SplashPage: React.FC = () => {
    const [showInput, setShowInput] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    
    const handleLogoClick = () => {
        setShowInput(true);
    };
    
    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const user = auth.currentUser; 
        
        if (user) {
            await setDoc(doc(db, 'users', user.uid), {
                username: name,
                currentAddress: address,
            });
            navigate('/main');
        } else {
            console.error('No user is signed in.');
        }
    };

    return (
        <div className="splashPage">
            
            <img className='main_logo' src={logo} alt="MoveMate Logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
            <img src={text_logo} alt="MoveMate Logo" />
            {!showInput && <p className='info'>Tryck på loggan för att gå vidare</p>}
            {showInput && (
                <div className='input_fields'>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Namn"
                    />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Adress"
                    />
                    <button className="submit_btn" onClick={handleSubmit}>Gå vidare till MoveMate</button>
                </div>
            )}
        </div>
    );
};

export default SplashPage;
