import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import { Button } from './Button'; 
import { ReactComponent as Logo } from '../assets/svg/paint-palette-artist-svgrepo-com.svg' 
import './Navbar.css'; 

function Navbar() { 
    const [click, setClick] = useState(false); 
    const [button, setButton] = useState(true); 
    const [dropdown, setDropdown] = useState(false); 
    const [dropdownHover, setDropdownHover] = useState(false); 

    const handleClick = () => setClick(!click); 
    const closeMobileMenu = () => setClick(false); 

    const showButton = () => { 
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => { 
        showButton();
        window.addEventListener('resize', showButton);

        return () => {
            window.removeEventListener('resize', showButton);
        };
    }, []);

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

    return ( 
    <div>
        <nav className='navbar'>
            <div className='navbar-container'>
                    <Link to="/" className='navbar-logo' onClick={closeMobileMenu}> 
                    <Logo className='navbar-logo-img' /> Acuarelas
                </Link>
                <div className='menu-icon' onClick={handleClick}> 
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}> 
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Inicio
                        </Link>
                    </li>
                    <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}> 
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
                    {button && <Button buttonStyle='btn--outline'>REGISTRARSE </Button>} 
            </div>
        </nav>
    </div>
    )
}

export default Navbar 
