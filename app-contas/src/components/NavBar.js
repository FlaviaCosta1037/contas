import React, { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa todos os plugins do Bootstrap
import logo from '../assets/logo.png'

const NavBar = () => {
  useEffect(() => {
    // Ativar o menu hamburguer (navbar toggler) se necessário
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" >
        <img src={logo} alt="Logo" style={{ maxHeight: '50px' }} /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sobre">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contato">Pricing</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
