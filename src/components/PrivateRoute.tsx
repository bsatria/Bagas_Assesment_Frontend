import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};