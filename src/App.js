import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './modules/Home/Home';
import TestComponent from './test/TestComponent';


function App() {
  return (
    // thực hiện router như trên
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          {/* <Route path="movie/:movieID" element={<MovieDetails/>}/> */}
          <Route path='test' element={<TestComponent/>}/>
        </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;