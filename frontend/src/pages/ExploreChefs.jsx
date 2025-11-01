import { useEffect, useState } from 'react'
import { Box, Card, CardBody, Heading, SimpleGrid, Spinner, Text, Flex, Avatar, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import api from '../utils/api.js'

export default function ExploreChefs() {
  const [chefs, setChefs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/users/chefs')
        setChefs(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <Flex justify="center" py={10}><Spinner /></Flex>

  return (
    <Box>
      <Heading size="lg" mb={4}>Explore Chefs</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {chefs.map((c) => (
          <Card key={c._id}>
            <CardBody>
              <Flex align="center" gap={3}>
                <Avatar name={c.name} />
                <Box>
                  <Heading size="sm">{c.name}</Heading>
                  <Text fontSize="xs" color="gray.500">Chef</Text>
                </Box>
                <Flex ml="auto" gap={2}>
                  <Button as={Link} to={`/profile/${c._id}`} size="sm" colorScheme="teal">View Profile</Button>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )
}
