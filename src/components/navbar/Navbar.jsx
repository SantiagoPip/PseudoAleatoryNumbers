import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom';
export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link"  to="/cuadradosMedios">
            Cuadrados Medios
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to="/congruenciaLineal">
            Congruencia lineal
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to="/congruenciaMultiplicativa">
            Congruencia Multiplicativa
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to="/distribucionUniforme">
          Distribución uniforme
          </NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link"  to="/distribucionNormal">
           Distribución normal
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to="/pruebas">
          Pruebas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
