import React, { useState } from 'react';
import NavBar from './NavBar';
import ExpenseList from './expenseList';

const Home = () => {
  const [updateFlag, setUpdateFlag] = useState(false);

  const handleAddExpense = () => {
      setUpdateFlag(!updateFlag);  // Toggle the flag to trigger the useEffect in ExpenseList
  };

  return (
      <div>
          <NavBar />
          <ExpenseList updateFlag={updateFlag} />
      </div>
  );
};

export default Home;
