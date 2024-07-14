import React, { useState } from 'react';
import { editExpense } from '../servicos/expenseService';

const EditExpense = ({ id, currentDescription, currentAmount, onSave, onCancel }) => {
    const [description, setDescription] = useState(currentDescription);
    const [amount, setAmount] = useState(currentAmount);

    const handleSave = async () => {
        try {
            await editExpense(id, description, amount);
            onSave();
        } catch (error) {
            console.error('Erro ao salvar edição:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleSave}>Salvar</button>
            <button onClick={onCancel}>Cancelar</button>
        </div>
    );
};

export default EditExpense;
