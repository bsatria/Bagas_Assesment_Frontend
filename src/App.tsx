import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivateRoute } from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;