// addExpense.js
import React, { useState } from 'react';
import { addExpense } from '../servicos/expenseService';

const AddExpense = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
          await addExpense(description, amount);
          // Após adicionar a despesa, chama a função passada via prop onAddExpense
          onAddExpense();
          console.log('Despesa adicionada com sucesso!');
          // Lógica para lidar com o sucesso ao adicionar a despesa
      } catch (error) {
          console.error('Erro ao adicionar despesa:', error);
          // Lógica para lidar com o erro ao adicionar a despesa
      }
  };

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Valor" />
              <button type="submit">Adicionar Despesa</button>
          </form>
      </div>
  );
};

export default AddExpense;
