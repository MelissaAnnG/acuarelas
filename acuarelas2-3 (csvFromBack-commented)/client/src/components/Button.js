import React from "react"; //importa la biblioteca React, necesaria para definir componentes React
import './Button.css'; //importa el archivo de estilos Button.css para aplicar estilos específicos al componente Button
import { Link } from 'react-router-dom'; //importa el componente Link de react-router-dom para crear enlaces de navegación que no recargan la página

const STYLES = ['btn--primary', 'btn--outline']; //define dos constantes STYLES y SIZES que contienen las clases de estilo y tamaño posibles para el botón
const SIZES = ['btn--medium', 'btn--large']; //estas se usarán para validar las props recibidas y asegurar que se aplican estilos y tamaños válidos

export const Button = ({ //define y exporta el componente Button como una función. Este componente acepta varias props:
    children, //children: el contenido del botón
    type, //type: el tipo de botón (por ejemplo, submit, button)
    onClick, //onClick: la función que se ejecutará cuando se haga clic en el botón
    buttonStyle, //buttonStyle: la clase de estilo del botón
    buttonSize //buttonSize: la clase de tamaño del botón
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) //verifica si buttonStyle es una clase válida (incluida en STYLES). Si es válida, usa buttonStyle; de lo contrario, usa la primera clase en STYLES (btn--primary)
    ? buttonStyle 
    : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) //verifica si buttonSize es una clase válida (incluida en SIZES). Si es válida, usa buttonSize; de lo contrario, usa la primera clase en SIZES (btn--medium)
    ? buttonSize 
    : SIZES[0];

    return ( //retorna el JSX que define la estructura del componente Button:
        <Link to='/sign-up' className='btn-mobile'> {/* usa un Link para navegar a la ruta /sign-up cuando se hace clic en el botón. El enlace tiene una clase btn-mobile. Dentro del Link, se encuentra un botón (button) que:*/ }
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}> {/* tiene las clases btn, checkButtonStyle, y checkButtonSize. Ejecuta onClick cuando se hace clic en el botón. Usa type como el tipo de botón */}
                {children} 
            </button>
        </Link>
    );
};