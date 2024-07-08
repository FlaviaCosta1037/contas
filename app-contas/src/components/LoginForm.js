import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxV1oc5AFttTcvlQzHuACVzqx0qdeXiVM",
  authDomain: "projeto-contas-717f9.firebaseapp.com",
  projectId: "projeto-contas-717f9",
  storageBucket: "projeto-contas-717f9.appspot.com",
  messagingSenderId: "555422144216",
  appId: "1:555422144216:web:7089474157c700d56269ad",
  measurementId: "G-LM7X885ZC5"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); // Obtenha o Firestore a partir do app inicializado
export { auth, firestore }; 

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuário logado:', user);
      setError('');
      
      navigate('/home');
      
    } catch (error) {
      // Tratamento de erros de autenticação
      if (error.code === 'auth/user-not-found') {
        setError('Usuário não encontrado. Verifique o e-mail digitado.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Senha incorreta. Verifique a senha digitada.');
      } else {
        setError('Erro ao fazer login. Por favor, tente novamente mais tarde.');
      }
      console.error('Erro ao fazer login:', error);
    }
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <form className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

