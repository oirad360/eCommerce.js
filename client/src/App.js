import './styles/App.css';
import Auth from './pages/Auth'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Page from './components/Page'
import Seller from './pages/Seller'
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/use-auth'
function App() {
  const auth = useAuth()
  const location = useLocation()

  React.useEffect(() => {
    auth.getSession()
  }, [location.pathname])
  return (
    <Routes>
      <Route path="/" element={<Page user={auth.user} />}>
        <Route path="home" element={<Home user={auth.user} getSession={auth.getSession} />} />
        <Route path="cart" element={<Cart user={auth.user} getSession={auth.getSession} />} />
        <Route path="seller/:username" element={<Seller user={auth.user} getSession={auth.getSession} />} />
      </Route>
      <Route path="/signup" element={<Auth isLogin={false} />} />
      <Route path="/login" element={<Auth isLogin={true} />} />
    </Routes>
  );
}

export default App;
