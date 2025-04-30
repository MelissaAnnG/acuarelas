import React from 'react'; //importa la biblioteca React, necesaria para definir componentes React
import { Link } from 'react-router-dom'; //importa el componente Link de react-router-dom para crear enlaces de navegación que no recargan la página
import Palette from '../assets/images/paint-palette-artist-svgrepo-com-800.png' //importa una imagen (Palette) desde el directorio assets/images para ser utilizada en el componente
import './HeroSection.css'; //importa los archivos de estilos HeroSection.css y App.css para aplicar estilos específicos al componente HeroSection y estilos generales de la aplicación, respectivamente
import '../App.css';

function HeroSection() {
    return ( //define el componente HeroSection como una función. Dentro del componente, se retorna el JSX que define la estructura visual:
        <div className='hero-container'> {/* un div con la clase hero-container que contiene el contenido principal */}
            <h1>ACUARELAS</h1>
            <p>Librería y Mercería</p>
            <div className='content-container'> {/* un div con la clase content-container que contiene dos elementos hijos: */}
                <div className='image-container'> {/* un div con la clase image-container que incluye una imagen (img) que utiliza la imagen importada Palette y un texto alternativo "Paint Palette" */}
                    <img src={Palette} alt="Paint Palette" />
                </div>
                <div className='enlaces'> {/* un div con la clase enlaces que contiene una lista ul de enlaces li */}
                    <ul>
                        <li className='inventory'> {/* cada li contiene un Link de react-router-dom que navega a diferentes rutas (/inventory, /prices, /load-sale, /handle-orders) y muestra un h1 con el texto correspondiente */}
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

export default HeroSection //exporta el componente HeroSection como el export por defecto del módulo, para que pueda ser importado y utilizado en otros archivos
