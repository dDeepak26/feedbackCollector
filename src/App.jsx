import React, { useState } from 'react'
import Footer from './components/Footer'
import FeedbackForm from './components/FeedbackForm'
import AdminToggle from './components/AdminToggle';
import FeedbackList from './components/FeedbackList';

function App() {
  const [isAdminView, setIsAdminView] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="max-w-2xl mx-auto w-full p-4 flex-grow">
      <AdminToggle isAdminView={isAdminView} toggle={() => setIsAdminView(!isAdminView)} />
      {isAdminView ? <FeedbackForm /> : <FeedbackList />}
    </div>
    <Footer />
  </div>  
  )
}

export default App