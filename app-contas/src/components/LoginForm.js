import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';
import logo from '../assets/logo.png'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importe os ícones FontAwesome
// import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons'; // Exemplo de importação dos ícones específicos

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
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white custom-card">
              <div className="card-body p-5 text-center">
                <div className='mb-4'>
                  <img src={logo} alt="Logo" style={{ maxHeight: '60px' }} />
                </div>
                <form>
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Por favor entre com o seu login e senha!</p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <input type="email" id="email" className="form-control form-control-lg" placeholder='E-mail' value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label htmlFor="email" className="form-label"></label>
                    </div>
                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg" placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="password" className="form-label"></label>
                      <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                    </div>
                    <button type="submit" className="btn btn-outline-light btn-lg px-5" onClick={handleSubmit}>Login</button>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="/" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                      <a href="/" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                      <a href="/" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                    </div>
                    <div>
                      <p className="mb-0">Não tem uma conta? <a href="#!" className="text-white-50 fw-bold">Cadastre-se</a></p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >

  );
}

export default LoginForm;

