import { Routes, Route, Navigate } from 'react-router-dom'
import { Box, Container } from '@chakra-ui/react'
import { useAuth } from './state/AuthContext.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Recipes from './pages/Recipes.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import CreateRecipe from './pages/CreateRecipe.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ExploreChefs from './pages/ExploreChefs.jsx'
import Profile from './pages/Profile.jsx'
import Header from './components/Header.jsx'

// Global layout moved to `Header` and `Footer` components

function Protected({ children, role }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Box>
      <Header />
      <Container maxW="container.xl">
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Protected role="user"><CreateRecipe /></Protected>} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/chefs" element={<ExploreChefs />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </Box>
  )
}
