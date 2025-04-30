import React, { useState, useEffect } from 'react'; //importa la biblioteca React, junto con los hooks useState y useEffect que se utilizan para manejar el estado y los efectos secundarios en componentes funcionales.
import { Link } from 'react-router-dom'; //importa el componente Link de react-router-dom para crear enlaces de navegación que no recargan la página
import { Button } from './Button'; //importa el componente Button desde el archivo Button.js del directorio actual
import { ReactComponent as Logo } from '../assets/svg/paint-palette-artist-svgrepo-com.svg' //importa un archivo SVG como un componente de React llamado Logo. El archivo SVG se encuentra en el directorio assets/svg.
import './Navbar.css'; //importa el archivo de estilos Navbar.css para aplicar estilos específicos al componente Navbar

function Navbar() { //define el componente Navbar como una función. Dentro del componente, se utilizan cuatro estados:
    const [click, setClick] = useState(false); //click para manejar el estado del menú (abierto o cerrado)
    const [button, setButton] = useState(true); //button para controlar la visibilidad del botón "Registrarse"
    const [dropdown, setDropdown] = useState(false); //dropdown para manejar el estado del menú desplegable (abierto o cerrado)
    const [dropdownHover, setDropdownHover] = useState(false); //dropdownHover (otro) para manejar el estado del menú desplegable (abierto o cerrado) MODO PRUEBA

    const handleClick = () => setClick(!click); //define la función handleClick que alterna el estado de click entre verdadero y falso, permitiendo abrir y cerrar el menú
    const closeMobileMenu = () => setClick(false); //define la función closeMobileMenu que cierra el menú estableciendo click en false

    const showButton = () => { //define la función showButton que muestra u oculta el botón "Registrarse" en función del ancho de la ventana. Si la ventana tiene un ancho menor o igual a 960 píxeles, el botón se oculta
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    //esto ayuda a que no aparezca cuando no quiero el boton de Registrarse
    useEffect(() => { //utiliza el hook useEffect para ejecutar showButton cuando el componente se monta y agregar un listener para el evento de resize de la ventana. Al desmontar el componente, se elimina el listener
        showButton();
        window.addEventListener('resize', showButton);

        return () => {
            window.removeEventListener('resize', showButton);
        };
    }, []);

    //define las funciones onMouseEnter y onMouseLeave que manejan el estado del menú desplegable.
    //si el ancho de la ventana es menor a 960 píxeles, el menú desplegable se oculta al pasar el ratón por encima; de lo contrario, se muestra
    const onMouseEnter = () => {
        if (window.innerWidth >= 960) {
            setDropdown(true);
        } 
    };

    const onMouseLeave = () => {
        if (window.innerWidth >= 960) {
            setDropdown(false);
        } 
    };

    const handleDropdownHoverEnter = () => {
        if (window.innerWidth < 960) {
            setDropdownHover(true);
        }
    };

    const handleDropdownHoverLeave = () => {
        if (window.innerWidth < 960) {
            setDropdownHover(false);
        }
    };


    return ( //devuelve el JSX que define la estructura del componente Navbar. Dentro del nav con la clase navbar:
    <div>
        <nav className='navbar'>
            <div className='navbar-container'>
                    <Link to="/" className='navbar-logo' onClick={closeMobileMenu}> {/* link con la clase navbar-logo y el componente Logo para navegar a la página principal (/) y cerrar el menú móvil */}
                    <Logo className='navbar-logo-img' /> Acuarelas
                </Link>
                <div className='menu-icon' onClick={handleClick}> {/* un div con la clase menu-icon que alterna el estado del menú al hacer clic */}
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}> {/* una lista ul con la clase nav-menu que contiene varios li con enlaces de navegación */}
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Inicio
                        </Link>
                    </li>
                    <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}> {/* un li que contiene enlaces desplegables para diferentes productos, mostrando u ocultando el menú desplegable basado en el estado dropdown */}
                            Productos <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown && (
                                <ul className={`dropdown-menu ${dropdownHover ? 'active' : ''}`} onMouseEnter={handleDropdownHoverEnter} onMouseLeave={handleDropdownHoverLeave} onClick={() => setDropdown(!dropdown)}>
                                <li>
                                    <Link to='/inventory' className='dropdown-link' onClick={closeMobileMenu}>
                                        Inventario
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/prices' className='dropdown-link' onClick={closeMobileMenu}>
                                        Precios
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/modify' className='dropdown-link' onClick={closeMobileMenu}>
                                        Modificar
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/unregister' className='dropdown-link' onClick={closeMobileMenu}>
                                        Dar de Baja
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className='nav-item'>
                        <Link to='/settings' className='nav-links' onClick={closeMobileMenu}>
                            Configuración
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                            Registrar Usuario
                        </Link>
                    </li>
                </ul>
                    {button && <Button buttonStyle='btn--outline'>REGISTRARSE </Button>} {/* un botón de registro (Button) que se muestra u oculta basado en el estado button */}
            </div>
        </nav>
    </div>
    )
}

export default Navbar //exporta el componente Navbar como el export por defecto del módulo, para que pueda ser importado y utilizado en otros archivos
