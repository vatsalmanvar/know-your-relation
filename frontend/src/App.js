import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Home from './components/Home';
import Demo from './components/Demo';
import Home from './components/Home';

function App() {
  return (
    <>
    <Routes>
    <Route exact path='/'element={<Home/>}>
    </Route>
    <Route exact path='/viewFamilyTree' element={<Demo/>}/>
    </Routes>
    </>
  );
}

export default App;
