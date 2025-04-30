import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import SignUp from './pages/SignUp';
import Inventory from './pages/Inventory';
import Prices from './pages/Prices';
import Modify from './pages/Modify';
import Unregister from './pages/Unregister';
import LoadSale from './pages/LoadSale';
import HandleOrders from './pages/HandleOrders';


function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path='/' exact element= {<Home />}/>
          <Route path='/settings' element= {<Settings />}/>
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

export default App;
