import { useState } from 'react'
import { Box, Button, Card, CardBody, FormControl, FormLabel, Heading, Input, Stack, useToast } from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      toast({ title: 'Logged in', status: 'success', duration: 1500 })
      navigate('/')
    } catch (e) {
      toast({ title: 'Login failed', description: e?.response?.data?.error || 'Try again', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxW="md" mx="auto">
      <Card>
        <CardBody>
          <Heading size="md" mb={4}>Login</Heading>
          <form onSubmit={onSubmit}>
            <Stack spacing={3}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button colorScheme="teal" type="submit" isLoading={loading}>Login</Button>
              <Box fontSize="sm">No account? <Link to="/register">Register</Link></Box>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  )
}
