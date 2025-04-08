import { addDoc, collection } from 'firebase/firestore';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { db } from '../firebase/firebase';

const FeedbackForm = () => {
  const feedbackSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required'),
    createdOn: Yup.date().default(() => new Date()),
  });

  function handleSubmit(data) {
    try {
      const feedbackRef = collection(db, "feedbacks");
      addDoc(feedbackRef, data);
    } catch (error) {
      console.log(error, "Error in adding document");
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          message: '',
        }}
        validationSchema={feedbackSchema}
        onSubmit={async (values, actions) => {
          const feedbackWithTimestamp = {
            ...values,
            createdOn: new Date().toISOString(),
          };
          console.log(feedbackWithTimestamp);
          await handleSubmit(feedbackWithTimestamp);
          actions.resetForm();
        }}
      >
          <Form className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <Field
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@gmail.com"
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <Field
                id="message"
                name="message"
                as="textarea"
                placeholder="Your feedback..."
                className="mt-1 block w-full p-2 border rounded-md shadow-sm h-32 resize-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Submit Feedback
              </button>
            </div>
          </Form>
      </Formik>
    </div>
  );
};

export default FeedbackForm;
