import './App.css';
import {
 BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is amazing React course" />
          <div className="container">
            <Routes>
              <Route exact path="/" element=<Home/>>
                {/* <Home /> */}
              </Route>
              <Route exact path="/about" element=<About/> >
                {/* <About /> */}
              </Route>
              <Route exact path="/login" element=<Login/>>
                {/* <Login /> */}
              </Route>
              <Route exact path="/signup" element=<Signup/>>
                {/* <Signup /> */}
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;