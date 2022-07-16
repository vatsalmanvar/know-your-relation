import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Home from './components/Home';
import CreateTree from './components/CreateTree';
import Home from './components/Home';
import TestViewTree from './components/TestViewTree';
import ViewTree from './components/ViewTree';

function App() {
  return (
    <>
    <Routes>
    <Route exact path='/'element={<Home/>}/>
    <Route exact path='/TestViewTree' element={<TestViewTree/>}/>
    <Route exact path='/createFamilyTree' element={<CreateTree/>}/>
    <Route exact path='/viewFamilyTree' element={<ViewTree/>}/>
    </Routes>
    </>
  );
}

export default App;
