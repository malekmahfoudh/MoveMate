// firebaseService.ts
import { db } from './firebase-config'; // Fix import path

export const saveAddress = async (userId: string, addressData: object): Promise<void> => {
    await db.collection('addresses').doc(userId).set(addressData);
};

export const getAddress = async (userId: string): Promise<object | null> => {
    const addressDoc = await db.collection('addresses').doc(userId).get();
    return addressDoc.exists ? addressDoc.data() : null;
};

