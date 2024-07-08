import React from 'react';
import { deleteExpense } from '../servicos/expenseService';

const DeleteExpense = ({ id, onDelete }) => {
  const handleDelete = () => {
    deleteExpense(id);
    onDelete();
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Excluir
    </button>
  );
};

export default DeleteExpense;
