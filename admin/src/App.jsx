import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
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
