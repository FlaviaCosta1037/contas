import React, { useEffect, useState } from 'react';
import { getAllExpenses, getTotalExpenses, deleteExpense, addExpense, editExpense } from '../servicos/expenseService';
import Footer from './Footer';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../ExpenseList.css';

const ExpenseList = ({ updateFlag }) => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [newDescription, setNewDescription] = useState('');
    const [newAmount, setNewAmount] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const fetchedExpenses = await getAllExpenses();
                setExpenses(fetchedExpenses);
                updateTotalExpenses();
            } catch (error) {
                console.error('Erro ao buscar despesas:', error);
            }
        };

        fetchExpenses();
    }, [updateFlag]);

    const updateTotalExpenses = async () => {
        try {
            const total = await getTotalExpenses();
            setTotalExpenses(total);
        } catch (error) {
            console.error('Erro ao calcular total de despesas:', error);
        }
    };

    const handleEdit = (id) => {
        const expenseToEdit = expenses.find((expense) => expense.id === id);
        setEditingExpense(expenseToEdit);
        setNewDescription(expenseToEdit.description);
        setNewAmount(expenseToEdit.amount.toString());
    };

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            updateExpenses();
        } catch (error) {
            console.error('Erro ao deletar despesa:', error);
        }
    };

    const updateExpenses = async () => {
        try {
            const updatedExpenses = await getAllExpenses();
            setExpenses(updatedExpenses);
            updateTotalExpenses();
        } catch (error) {
            console.error('Erro ao atualizar despesas:', error);
        }
    };

    const handleSubmitNewExpense = async (e) => {
        e.preventDefault();

        try {
            await addExpense(newDescription, newAmount);
            setNewDescription('');
            setNewAmount('');
            updateExpenses();
        } catch (error) {
            console.error('Erro ao adicionar despesa:', error);
        }
    };

    const handleNewDescriptionChange = (e) => {
        setNewDescription(e.target.value);
    };

    const handleNewAmountChange = (e) => {
        setNewAmount(e.target.value);
    };

    const handleSaveEdit = async () => {
        if (!editingExpense) return;

        try {
            await editExpense(editingExpense.id, newDescription, newAmount);
            updateExpenses();
            setEditingExpense(null);
            setNewDescription('');
            setNewAmount('');
        } catch (error) {
            console.error('Erro ao editar despesa:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingExpense(null);
        setNewDescription('');
        setNewAmount('');
    };

    return (
        <div className="d-flex flex-column min-vh-100">

            <div className="container mt-4 expense-list flex-grow-1">
                <div className="total-expenses bg-primary text-white p-3 rounded mb-4">
                    <h2 className="total-title">Total de Despesas</h2>
                    <p className="total-amount">R$ {totalExpenses}</p>
                </div>
                <form onSubmit={handleSubmitNewExpense} className="mb-4">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Descrição"
                            value={newDescription}
                            onChange={handleNewDescriptionChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Valor"
                            value={newAmount}
                            onChange={handleNewAmountChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Adicionar Despesa</button>
                </form>
                <ul className="list-group">
                    {expenses.map((expense) => (
                        <li key={expense.id} className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            {editingExpense && editingExpense.id === expense.id ? (
                                <div className="w-100 d-flex flex-wrap align-items-center">
                                    <input
                                        type="text"
                                        className="form-control mb-2 me-2 flex-grow-1"
                                        placeholder="Descrição"
                                        value={newDescription}
                                        onChange={handleNewDescriptionChange}
                                    />
                                    <input
                                        type="number"
                                        className="form-control mb-2 me-2 flex-grow-1"
                                        placeholder="Valor"
                                        value={newAmount}
                                        onChange={handleNewAmountChange}
                                    />
                                    <button className="btn btn-success mb-2 me-2" onClick={handleSaveEdit}>Salvar</button>
                                    <button className="btn btn-danger mb-2" onClick={handleCancelEdit}>Cancelar</button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex-grow-1 expense-details">
                                        <strong className="expense-description">{expense.description}</strong> - <span className="expense-amount">R$ {expense.amount}</span>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(expense.id)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(expense.id)}>Excluir</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <Footer /> {/* Inclui o componente Footer ao final da lista de despesas */}
        </div>
    );
};

export default ExpenseList;
