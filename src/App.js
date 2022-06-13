import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import PreLogin from './PreLogin';
import Login from './Login';
import OpenAccountPage from './OpenAccountPage';
import Header from './Header';
import UserPage from './UserPage';
import UserAccount from './UserAccount';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import TransferAmount from './TransferAmount';
import Transactions from './Transactions';
import Maintenance from './Maintenance';
import ChangePassword from './ChangePassword';
import Admin from './Admin';
import AdminHeader from './AdminHeader';
import AdminPage from './AdminPage';
import AdminNewUser from './AdminNewUser';
import ViewTopCustomers from './ViewTopCustomers';
import ListUsers from './ListUsers';
import ForcePasswordChange from './ForcePasswordChange';
import TopCustomers from './TopCustomers';
import Example from './Example';
import Trans from './Trans';
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
        <Route path = '/maintenance' element = {<><Header/><Maintenance/></>} />
        <Route path = "/transaction" element = {<><Header /><Transactions/></>} />
        <Route path = "/transfere" element = {<><Header/><TransferAmount/></>} />
        <Route path = "/withdraw" element = {<><Header/><Withdraw/></>} />
        <Route path = "/deposit" element= {<><Header/><Deposit/></>} />
        <Route path = "/accountdetails" element = {<><Header/><UserAccount/></>} />
        <Route path = "/home" element = {<><Header/><UserPage/></>} />
        <Route path = "/open" element= {<OpenAccountPage />} />
        <Route path ="/loginn" element={<Login/>} />
        <Route path = "/" element ={<PreLogin/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
