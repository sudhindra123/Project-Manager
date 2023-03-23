import './App.css'
import { BrowserRouter,Switch, Route,Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';


import Create from './pages/create/create';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login';
import Project from './pages/project/project';
import Signup from './pages/signup/signup';

import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import User from './components/user';

function App() {

const{user,authIsReady} = useAuthContext()


  return (
<div className="App">
{authIsReady && (
<BrowserRouter>
{user && <Sidebar />}
 <div className='container'>
 <Navbar />
  <Switch>

    <Route exact path='/'>
{!user && <Redirect to='/login'/>}
{user && <Dashboard/>}
    </Route>

    <Route path='/login'>
    {user && <Redirect to='/'/>}
      {!user && <Login />}
    </Route>

    <Route path='/projects/:id'>
    {!user && <Redirect to='/login'/>}
     {user && <Project />}
    </Route>

    <Route path='/signup'>
{user && <Redirect to='/' />}
      {!user &&<Signup />}
    </Route>

<Route path='/create'>
{!user && <Redirect to='/' />}
{user  &&  <Create />}
</Route>

  </Switch>
 </div>
 {user && <User />}
</BrowserRouter>
)}

    </div>
  );
}

export default App


// for router install the router package
//npm  install react-router-dom@5.1 
// and after that import the routers