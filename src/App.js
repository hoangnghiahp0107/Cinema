import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './modules/Home/Home';


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          {/* <Route path="movie/:movieID" element={<MovieDetails/>}/> */}
        </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;