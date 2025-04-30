import React from 'react'; //Importa la biblioteca React, que es necesaria para definir y trabajar con componentes React.
import ReactDOM from 'react-dom/client'; //Importa el módulo ReactDOM desde el paquete react-dom/client. Este módulo se utiliza para interactuar con el DOM en las aplicaciones React.
import App from './App'; //Importa el componente principal de la aplicación, App, desde el archivo App.js.
import reportWebVitals from './reportWebVitals'; //Importa la función reportWebVitals desde el archivo reportWebVitals.js. Esta función se usa para medir y reportar métricas de rendimiento de la aplicación.


const root = ReactDOM.createRoot(document.getElementById('root')); //Crea una raíz de React en el DOM. Busca el elemento HTML con el id root y lo utiliza como contenedor principal para la aplicación React.
root.render( //Renderiza el componente App dentro del contenedor root. Esto monta el componente principal de la aplicación en el DOM.
    <App />  
);

reportWebVitals();
