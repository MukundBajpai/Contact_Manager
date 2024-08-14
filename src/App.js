import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Layout/Navbar';
import Contactlist from './Pages/Contactlist';
import Addcontact from './Pages/Addcontact';
import Editcontact from './Pages/Editcontact';
import Viewcontact from './Pages/Viewcontact';



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Contactlist/>} />
          <Route exact path="/addcontact" element={<Addcontact/>} />
          <Route exact path="/editcontact/:contactId" element={<Editcontact/>} />
          <Route exact path="/viewcontact/:contactId" element={<Viewcontact/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
