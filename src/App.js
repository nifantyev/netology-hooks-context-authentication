import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuthProvider from './contexts/AuthProvider';
import Toolbar from './components/Toolbar';
import News from './components/News';

function App() {
  return (
    <AuthProvider>
      <Toolbar />
      <News />
    </AuthProvider>
  );
}

export default App;
