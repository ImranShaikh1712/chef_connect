import { useState } from 'react'
import { Box, Button, Card, CardBody, FormControl, FormLabel, Heading, Input, Select, Stack, useToast, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register({ name, email, password, role })
      toast({ title: 'Registered', status: 'success', duration: 1500 })
      navigate('/')
    } catch (e) {
      toast({ title: 'Registration failed', description: e?.response?.data?.error || e?.message || 'Try again', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box minH="100vh" bgGradient="linear(to-br, brand.500, accent.400)" py={10} px={4} display="flex" alignItems="center" justifyContent="center">
      <Box maxW="md" w="full">
        <Heading textAlign="center" size="lg" mb={6} bgGradient="linear(to-r, white, whiteAlpha.800)" bgClip="text">
          Create your Chef Connect account
        </Heading>
        <Card bg="white" _dark={{ bg: 'gray.800' }}>
          <CardBody>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input size="md" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" size="md" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type="password" size="md" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
                    <InputRightElement>
                      <Text fontSize="xs" color="gray.400">•••</Text>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Select size="md" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">Common User</option>
                    <option value="chef">Chef</option>
                  </Select>
                </FormControl>
                <Button type="submit" isLoading={loading} colorScheme="brand" size="md">Register</Button>
                <Box fontSize="sm" color="gray.600">
                  Have an account? <Box as={Link} to="/login" color="brand.600">Login</Box>
                </Box>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </Box>
    </Box>
  )
}
