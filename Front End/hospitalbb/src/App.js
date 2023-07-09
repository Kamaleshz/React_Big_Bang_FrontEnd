import './App.css';
import { BrowserRouter,Routes,Route,NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './Login';
import {Doctor} from './Doctor';
import { Patient } from './Patient';
import Admin from './Admin';
import AdminPage from './AdminPage';
import Homepg from './Homepg';
import { Registerdoc } from './Registerdoc';
import { Registerpat } from './Registerpat';
import Doctorid, { GetByIdDoc } from './GetByIdDoc';
import PatientById, { GetByIdPat } from './GetByIdPat';
import Doctors from './Doctors';

function App() {
  return (
<div>
<ToastContainer theme='colored'></ToastContainer>
<BrowserRouter>
 <Routes>
  <Route path='/doctor' Component={Doctor}/>
  <Route path='/patient' Component={Patient}/>
  <Route path='/Login' Component={Login}/>
  <Route path='/Admin' Component={Admin}/>
  <Route path='/AdminPage' Component={AdminPage}/>
  <Route path='/Homepg' Component={Homepg}/>
  <Route path='/' Component={Homepg}/>
  <Route path='/Registerdoc' Component={Registerdoc}/>
  <Route path='/Registerpat' Component={Registerpat}/>
  <Route path='/GetByIdDoc' Component={Doctorid}/>
  <Route path='/GetByIdPat' Component={PatientById}/>
  <Route path='/doctors' Component={Doctors}/>

 </Routes>
</BrowserRouter>
     </div>
  );
}

export default App;
