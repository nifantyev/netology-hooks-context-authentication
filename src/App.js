import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './contexts/AuthProvider';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <AuthProvider>
      <Toolbar />
    </AuthProvider>
  );
}

export default App;
