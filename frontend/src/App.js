import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Home from './components/Home';
import CreateTree from './components/CreateTree';
import Home from './components/Home';
import TestViewTree from './components/TestViewTree';
import ViewTree from './components/ViewTree';
import TestCreateTree from './components/TestCreateTree';
import treeContext from './context/treeContext';
import TreeState from './context/TreeState';


function App() {
  return (
    <>
    <TreeState>
    <Routes>
      <Route exact path='/'element={<Home/>}/>
      <Route exact path='/TestViewTree' element={<TestViewTree/>}/>
      <Route exact path='/createFamilyTree' element={<CreateTree/>}/>
      <Route exact path='/viewFamilyTree' element={<ViewTree/>}/>
      <Route exact path='/testCreateTree' element={<TestCreateTree/>}/>
    </Routes>
    </TreeState>
    
    
    
      
    </>
  );
}

export default App;
