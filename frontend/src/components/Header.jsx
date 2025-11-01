import { Box, Container, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Button, Spacer, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchIcon } from '@chakra-ui/icons'
import { useAuth } from '../state/AuthContext.jsx'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onSearch = (e) => {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q')
    navigate(q ? `/?q=${encodeURIComponent(q)}` : '/')
  }

  return (
    <Box bgGradient="linear(to-r, brand.600, brand.500)" color="white" py={3} mb={6} position="sticky" top={0} zIndex={10}>
      <Container maxW="container.xl">
        <Flex align="center" gap={4} wrap="wrap">
          <Heading size="md"><Link to="/">Chef Connect</Link></Heading>
          <form onSubmit={onSearch} style={{ display: 'flex', gap: 8, alignItems: 'center', flex: 1 }}>
            <InputGroup maxW={{ base: '240px', md: '480px' }}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="whiteAlpha.800" />
              </InputLeftElement>
              <Input name="q" placeholder="Search restaurants or dishes..." bg="white" color="black" size="sm" borderRadius="md" />
            </InputGroup>
            <IconButton aria-label="search" type="submit" size="sm" icon={<SearchIcon />} colorScheme="whiteAlpha" variant="outline" />
          </form>
          <Spacer />
          {user ? (
            <Flex align="center" gap={3}>
              <Text fontSize="sm" noOfLines={1}>Hi, {user.name}</Text>
              <Button size="sm" variant="outline" onClick={() => navigate('/dashboard')}>Dashboard</Button>
              {user.role === 'user' && (
                <Button size="sm" colorScheme="whiteAlpha" variant="outline" onClick={() => navigate('/create')}>New Recipe</Button>
              )}
              <Button size="sm" colorScheme="red" onClick={logout}>Logout</Button>
            </Flex>
          ) : (
            <Flex gap={2}>
              <Button size="sm" as={Link} to="/login" colorScheme="whiteAlpha" variant="outline">Login</Button>
              <Button size="sm" as={Link} to="/register" bg="white" color="brand.600">Register</Button>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  )
}
