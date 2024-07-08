import React, { useEffect, useState } from 'react';
import EditExpense from './editExpense';
import DeleteExpense from './deleteExpense';
import { getAllExpenses, getTotalExpenses, editExpense, deleteExpense } from '../servicos/expenseService';

const ExpenseList = ({ updateFlag }) => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        const fetchExpenses = async () => {
            const fetchedExpenses = await getAllExpenses();
            setExpenses(fetchedExpenses);
            updateTotalExpenses();
        };

        fetchExpenses();
    }, [updateFlag]);

    const updateTotalExpenses = async () => {
        const total = await getTotalExpenses();
        setTotalExpenses(total);
    };

    const handleSaveEdit = async () => {
        await editExpense(editingExpense.id, editingExpense.description, editingExpense.amount);
        setEditingExpense(null);
        updateExpenses();
    };

    const handleCancelEdit = () => {
        setEditingExpense(null);
    };

    const handleEdit = (id) => {
        const expenseToEdit = expenses.find((expense) => expense.id === id);
        setEditingExpense(expenseToEdit);
    };

    const handleDelete = async (id) => {
        await deleteExpense(id);
        updateExpenses();
    };

    const updateExpenses = async () => {
        const updatedExpenses = await getAllExpenses();
        setExpenses(updatedExpenses);
        updateTotalExpenses();
    };

    return (
        <div className="container mt-4">
            <h2>Lista de Despesas</h2>
            <p>Total: R$ {totalExpenses}</p>
            <ul className="list-group">
                {expenses.map((expense) => (
                    <li key={expense.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editingExpense && editingExpense.id === expense.id ? (
                            <EditExpense
                                id={expense.id}
                                currentDescription={expense.description}
                                currentAmount={expense.amount}
                                onSave={handleSaveEdit}
                                onCancel={handleCancelEdit}
                            />
                        ) : (
                            <>
                                <div>
                                    <strong>{expense.description}</strong> - R$ {expense.amount}
                                </div>
                                <div>
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(expense.id)}>Editar</button>
                                    <DeleteExpense id={expense.id} onDelete={() => handleDelete(expense.id)} />
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;