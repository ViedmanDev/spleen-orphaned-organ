import { Link } from 'react-router-dom';

const Header = () => (
  <header style={{ padding: '1rem', backgroundColor: '#222', color: '#fff' }}>
    <nav style={{ display: 'flex', gap: '1rem' }}>
      <Link to="/" style={{ color: '#61dafb' }}>Inicio</Link>
      <Link to="/trombosis" style={{ color: '#61dafb' }}>Trombosis Esplénica</Link>
    </nav>
  </header>
);

export default Header;