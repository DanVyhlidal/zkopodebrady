import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Aktuality from './pages/Aktuality';
import Vycvik from './pages/Vycvik';
import ProvozniRad from './pages/ProvozniRad';
import Clenove from './pages/Clenove';
import Galerie from './pages/Galerie';
import Uzitecne from './pages/Uzitecne';
import Kontakt from './pages/Kontakt';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/aktuality" replace />} />
        <Route path="aktuality" element={<Aktuality />} />
        <Route path="vycvik" element={<Vycvik />} />
        <Route path="provozni-rad" element={<ProvozniRad />} />
        <Route path="clenove" element={<Clenove />} />
        <Route path="galerie" element={<Galerie />} />
        <Route path="uzitecne" element={<Uzitecne />} />
        <Route path="kontakt" element={<Kontakt />} />
      </Route>
    </Routes>
  );
}

export default App;
