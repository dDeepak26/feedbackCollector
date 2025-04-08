import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const fetchFeedbacks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'feedbacks'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="space-y-4">
      {feedbacks.map(feedback => (
        <div
          key={feedback.id}
          className="p-4 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <p className="font-bold">Name: {feedback.fullName}</p>
          <p>Email: {feedback.email}</p>
          <p className="text-wrap">Message: {feedback.message}</p>
          <p className="text-xs text-gray-500">Submitted: {new Date(feedback.createdOn).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
