import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
