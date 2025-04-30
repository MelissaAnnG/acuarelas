import React from 'react';
import { Link } from 'react-router-dom'; 
import Palette from '../assets/images/paint-palette-artist-svgrepo-com-800.png' 
import './HeroSection.css'; 
import '../App.css';

function HeroSection() {
    return ( 
        <div className='hero-container'> 
            <h1>ACUARELAS</h1>
            <p>Librería y Mercería</p>
            <div className='content-container'> 
                <div className='image-container'> 
                    <img src={Palette} alt="Paint Palette" />
                </div>
                <div className='enlaces'> 
                    <ul>
                        <li className='inventory'> 
                            <Link to='/inventory'>
                                <h1>Inventario</h1>
                            </Link>
                        </li>
                        <li className='prices'>
                            <Link to='/prices'>
                                <h1>Precios</h1>
                            </Link>
                        </li>
                        <li className='load-sale'>
                            <Link to='/load-sale'>
                                <h1>Cargar Venta</h1>
                            </Link>
                        </li>
                        <li className='handle-orders'>
                            <Link to='/handle-orders'>
                                <h1>Generar Pedido</h1>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HeroSection 
