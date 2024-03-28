import { db } from "./firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const saveAddress = async (
  userId: string,
  addressData: object
): Promise<void> => {
  await setDoc(doc(db, "addresses", userId), addressData);
};

export const getAddress = async (userId: string): Promise<object | null> => {
  const addressDocRef = doc(db, "addresses", userId);
  const addressDoc = await getDoc(addressDocRef);
  return addressDoc.exists() ? addressDoc.data() : null;
};
