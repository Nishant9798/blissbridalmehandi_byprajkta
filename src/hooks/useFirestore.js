import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { db, firebaseConfigured } from '../config/firebase';

export function useFirestoreCollection(collectionName, options = {}) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!firebaseConfigured || !db) {
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    let constraints = [];

    if (options.whereField && options.whereValue) {
      constraints.push(where(options.whereField, '==', options.whereValue));
    }

    if (options.orderByField) {
      constraints.push(orderBy(options.orderByField, options.orderDirection || 'desc'));
    }

    const q = query(collection(db, collectionName), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(docs);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`Firestore error (${collectionName}):`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, options.whereField, options.whereValue, options.orderByField, options.orderDirection]);

  return { documents, loading, error };
}
