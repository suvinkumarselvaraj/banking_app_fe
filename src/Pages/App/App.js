import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import PreLogin from '../PreLogin/PreLogin';
import Login from '../Login/Login';
import OpenAccountPage from '../OpenAccount/OpenAccountPage';
import Header from '../Headers/Header';
import UserPage from '../UserPage/UserPage';
import UserAccount from '../UserAccount/UserAccount';
import Deposit from '../Deposit/Deposit';
import Withdraw from '../Withdraw/Withdraw';
import TransferAmount from '../TransferAmount/TransferAmount';
import Transactions from '../Transactions/Transactions';
import Maintenance from '../../Maintenance';
import ChangePassword from '../ChangePassword/ChangePassword';
import Admin from '../Admin/Admin';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminPage from '../AdminPage/AdminPage';
import AdminNewUser from '../AdminNewUser/AdminNewUser';
import ViewTopCustomers from '../AdminPage/AdminPage';
import ListUsers from '../ListUsers/ListUsers';
import ForcePasswordChange from '../ForcePasswordChange/ForcePasswordChange';
import TopCustomers from '../TopCustomers/TopCustomers';
import ErrorPage from '../../ErrorPage';
  
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path = '/topcustomers' element = {<><AdminHeader /><TopCustomers/></>} /> 
        <Route path = '/forcePasswordChange' element = {<><Header /><ForcePasswordChange/></>} />  
        <Route path = '/users' element = {<><AdminHeader /><ListUsers/></>} />  
        <Route path = '/viewTopCustomers' element = {<><AdminHeader /><ViewTopCustomers/></>} />
        <Route path = '/adminAddNewCx' element = {<><AdminHeader /><AdminNewUser/></>} />
        <Route path = '/admin/home' element = {<><AdminHeader /><AdminPage/></>} />
        <Route path = '/admin' element = {<Admin />} />
        <Route path = '/changepass' element = {<><Header/><ChangePassword /></>} />  
        <Route path = '/maintenance' element = {<><Header /><Maintenance/></>} />
        <Route path = "/transaction" element = {<><Header /><Transactions/></>} />
        <Route path = "/transferamount" element = {<><Header/><TransferAmount/></>} />
        <Route path = "/withdraw" element = {<><Header/><Withdraw/></>} />
        <Route path = "/deposit" element= {<><Header/><Deposit/></>} />
        <Route path = "/accountdetails" element = {<><Header/><UserAccount/></>} />
        <Route path = "/home" element = {<><Header/><UserPage/></>} />
        <Route path = "/openaccount" element= {<OpenAccountPage />} />
        <Route path ="/login" element={<Login/>} />
        <Route path = "/" element ={<PreLogin/>} />
        <Route path = "*" element = {<ErrorPage/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
