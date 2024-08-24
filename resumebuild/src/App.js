import { BrowserRouter,Route,Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import DashBoard from './components/DashBoard';
import FirstTemplateForm from './components/FirstTemplateForm';
import Resume from './components/Resume';
import Resume2 from './components/Resume2';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/dash' element={<DashBoard/>}/>
      <Route path='firstform' element={<FirstTemplateForm/>}/>
      <Route path='/resume' element={<Resume/>} />
      <Route path='/resume2' element={<Resume2/>}/>
      </Routes>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
