import React, { useState } from 'react';
import NavBar from './NavBar';
import AddExpense from './addExpense';
import ExpenseList from './expenseList';

const Home = () => {
    const [updateFlag, setUpdateFlag] = useState(false);
  
    const handleAddExpense = () => {
      setUpdateFlag(!updateFlag);  // Toggle the flag to trigger the useEffect in ExpenseList
    };
  
    return (
      <div>
        <NavBar />
        <AddExpense onAddExpense={handleAddExpense} />  
        <ExpenseList updateFlag={updateFlag} /> 
      </div>
    );
  };
  
  export default Home;
