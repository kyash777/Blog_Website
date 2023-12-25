import { useState } from 'react';

//components
import Login from './components/account/login';
import Home from './components/home/home';
import {BrowserRouter,Routes,Route, Navigate,Outlet} from "react-router-dom"
import Header from './components/header/header';
import Dataprovider from './contextAPI/dataprovider';
import CreatePost from './components/create/createpost';
import DetailView from './components/details/detailView';
import UpdatePost from './components/create/update';


const PrivateRoute=({isAuthenticated,...props})=>{
  return isAuthenticated ?
  <>
    <Outlet/>
    <Header/>
  </>
  : <Navigate replace to='/login/'/>
}




function App() {
  const [isAuthenticated,setAuthenticated]=useState(false);
  return (
    <div>
      <Dataprovider>
        <BrowserRouter>
          <div style={{marginTop:64}}>
            <Routes>
              <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>}/>
              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path="/" element={<Home/>}/>
              </Route>
              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path="/create" element={<CreatePost/>}/>
              </Route>
              <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path="/details/:id" element={<DetailView/>}/>
              </Route>
              <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                <Route path="/update/:id" element={<UpdatePost/>}/>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Dataprovider>
    </div>
  );
}

export default App;
