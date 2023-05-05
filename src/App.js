import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './modules/Home/Home';
import MovieDetails from './modules/MovieDetail/MovieDetail.jsx';

import SignUp from './modules/Authentication/signup/SignUp';

import BookingTicket from './modules/BookingTicket/BookingTicket'

import TestComponent from './test/TestComponent';



function App() {
  return (
    // thực hiện router như trên
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Home/>}/>

          <Route path="movie/:movieID" element={<MovieDetails/>}/>

          <Route path='/booking/:bookingID' element={<BookingTicket/>}/>
          
          <Route path='test' element={<TestComponent/>}/>
        </Route>

        <Route path='/'>
          <Route path='/signup' element={<SignUp/>} />
        </Route>

    </Routes>
  </BrowserRouter>
  );
}

export default App;