import { useState } from 'react'
import { Box, Button, Card, CardBody, FormControl, FormLabel, Heading, Input, Select, Stack, useToast } from '@chakra-ui/react'
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
      toast({ title: 'Registration failed', description: e?.response?.data?.error || 'Try again', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxW="md" mx="auto">
      <Card>
        <CardBody>
          <Heading size="md" mb={4}>Register</Heading>
          <form onSubmit={onSubmit}>
            <Stack spacing={3}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="user">Common User</option>
                  <option value="chef">Chef</option>
                </Select>
              </FormControl>
              <Button colorScheme="teal" type="submit" isLoading={loading}>Register</Button>
              <Box fontSize="sm">Have an account? <Link to="/login">Login</Link></Box>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  )
}
