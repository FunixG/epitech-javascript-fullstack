import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  localStorage.removeItem('auth-js-epitech-token');
  navigate('/');
  return null;
}

export default Logout;
