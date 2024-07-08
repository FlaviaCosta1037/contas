import { firestore } from '../components/LoginForm';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

// Função para obter todas as despesas
export const getAllExpenses = async () => {
  try {
    const expensesCollection = await getDocs(collection(firestore, 'expenses'));
    return expensesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Erro ao obter despesas:', error);
    throw error;
  }
};

// Função para adicionar uma nova despesa
export const addExpense = async (description, amount) => {
  try {
    const newExpenseRef = await addDoc(collection(firestore, 'expenses'), {
      description,
      amount: parseFloat(amount),
    });
    const newExpenseSnapshot = await getDoc(newExpenseRef);
    return { id: newExpenseSnapshot.id, ...newExpenseSnapshot.data() };
  } catch (error) {
    console.error('Erro ao adicionar despesa:', error);
    throw error;
  }
};

// Função para editar uma despesa existente
export const editExpense = async (id, description, amount) => {
  try {
    const expenseRef = doc(firestore, 'expenses', id);
    await updateDoc(expenseRef, {
      description,
      amount: parseFloat(amount),
    });
    const updatedExpenseSnapshot = await getDoc(expenseRef);
    return { id: updatedExpenseSnapshot.id, ...updatedExpenseSnapshot.data() };
  } catch (error) {
    console.error('Erro ao editar despesa:', error);
    throw error;
  }
};

// Função para deletar uma despesa
export const deleteExpense = async (id) => {
  try {
    const expenseRef = doc(firestore, 'expenses', id);
    await deleteDoc(expenseRef);
  } catch (error) {
    console.error('Erro ao deletar despesa:', error);
    throw error;
  }
};

// Função para obter o total das despesas
export const getTotalExpenses = async () => {
  try {
    const expensesCollection = await getDocs(collection(firestore, 'expenses'));
    const total = expensesCollection.docs.reduce((acc, doc) => acc + parseFloat(doc.data().amount), 0);
    return total.toFixed(2);
  } catch (error) {
    console.error('Erro ao calcular total de despesas:', error);
    throw error;
  }
};
