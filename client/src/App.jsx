import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { Box, Container, Flex, Heading, Button, Spacer, Text, Input } from '@chakra-ui/react'
import { useAuth } from './state/AuthContext.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Recipes from './pages/Recipes.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import CreateRecipe from './pages/CreateRecipe.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ExploreChefs from './pages/ExploreChefs.jsx'
import Profile from './pages/Profile.jsx'

function NavBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const onSearch = (e) => {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q')
    navigate(q ? `/?q=${encodeURIComponent(q)}` : '/')
  }
  return (
    <Box bg="gray.800" color="white" py={3} mb={6}>
      <Container maxW="container.lg">
        <Flex align="center" gap={4} wrap="wrap">
          <Heading size="md"><Link to="/">Chef Connect</Link></Heading>
          <form onSubmit={onSearch} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Input name="q" placeholder="Search recipes..." bg="white" color="black" size="sm" width={{ base: '200px', md: '300px' }} />
            <Button size="sm" type="submit" colorScheme="teal">Search</Button>
          </form>
          <Button size="sm" as={Link} to="/chefs" variant="ghost" color="white">Explore Chefs</Button>
          <Spacer />
          {user ? (
            <Flex align="center" gap={3}>
              <Text fontSize="sm">{user.name} ({user.role})</Text>
              <Button size="sm" as={Link} to="/dashboard" variant="outline">Dashboard</Button>
              {user.role === 'user' && (
                <Button size="sm" colorScheme="teal" variant="outline" onClick={() => navigate('/create')}>New Recipe</Button>
              )}
              <Button size="sm" colorScheme="red" onClick={logout}>Logout</Button>
            </Flex>
          ) : (
            <Flex gap={2}>
              <Button size="sm" as={Link} to="/login">Login</Button>
              <Button size="sm" as={Link} to="/register" variant="outline">Register</Button>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  )
}

function Protected({ children, role }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Box>
      <NavBar />
      <Container maxW="container.lg">
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
