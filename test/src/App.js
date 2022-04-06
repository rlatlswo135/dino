import './App.css';
import {createGlobalStyle} from 'styled-components'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Start from './Pages/Start'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import Port from './Pages/Port'
import About from './Pages/About'
import ProjectDetail from './Components/ProjectDetail'
import {data} from './data'
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
  body{
    background-color:#180A0A;
    margin:0px;
    color:#F7F5F2;
    font-family: 'Source Sans Pro', sans-serif;
    transform: translate(0.02deg);
  }
  a{
    text-decoration: none;
    color:white;
  }
  div{
    margin: 0px;
    box-sizing: border-box;
  }
`
function App() {

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/port' element={<Port/>} />
          <Route path='/port/:project' element={<ProjectDetail />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
