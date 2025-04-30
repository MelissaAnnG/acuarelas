import React from 'react'; //importa la biblioteca React, necesaria para definir componentes en React
import './App.css'; //importa el archivo de estilos App.css para aplicar estilos CSS a los componentes definidos en este archivo
import Navbar from './components/Navbar'; //importa el componente Navbar desde el archivo Navbar.js ubicado en el directorio components
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //importa componentes del módulo react-router-dom para manejar la navegación en la aplicación
//router es el componente de enrutador principal, Route define las rutas individuales, y Routes es un contenedor para las rutas
import Home from './pages/Home'; //importa los componentes correspondientes a las diferentes páginas de la aplicación desde el directorio pages
import Settings from './pages/Settings';
import SignUp from './pages/SignUp';
import Inventory from './pages/Inventory';
import Prices from './pages/Prices';
import Modify from './pages/Modify';
import Unregister from './pages/Unregister';
import LoadSale from './pages/LoadSale';
import HandleOrders from './pages/HandleOrders';


function App() { //define el componente App como una función. Este es el componente principal de la aplicación
  return ( //devuelve el JSX que define la estructura del componente App. Dentro del div con la clase App:
    <div className="App">
      <Router> {/* envuelve todo el contenido en un Router para manejar la navegación */}
        <header> {/* incluye el componente Navbar dentro de un header */}
          <Navbar />
        </header>
        <Routes> {/* define las rutas utilizando Routes y Route. Cada Route mapea una URL específica (path) a un componente (element). Las rutas disponibles son: */}
          <Route path='/' exact element={<Home />} /> {/* /: Muestra el componente Home */}
          <Route path='/settings' element={<Settings />} /> {/* /settings: Muestra el componente Settings */}
          <Route path='/sign-up' element= {<SignUp />}/>
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/prices' element={<Prices />} />
          <Route path='/modify' element={<Modify />} />
          <Route path='/unregister' element={<Unregister />} />
          <Route path='/load-sale' element={<LoadSale />} />
          <Route path='/handle-orders' element={<HandleOrders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; //exporta el componente App como el export por defecto del módulo, para que pueda ser importado y utilizado en otros archivos
