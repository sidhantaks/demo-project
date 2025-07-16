import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Router from './components/Router';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Router />  
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
