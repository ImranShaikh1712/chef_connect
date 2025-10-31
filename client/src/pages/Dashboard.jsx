import { useEffect, useState } from 'react'
import { Box, Card, CardBody, Heading, Stack, Text, Tag, SimpleGrid, Spinner, Flex, Link as CLink } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import api from '../utils/api.js'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/users/me/dashboard')
        setData(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <Flex justify="center" py={10}><Spinner /></Flex>
  if (!data) return null

  return (
    <Box>
      <Heading size="lg" mb={4}>Dashboard</Heading>
      <Card>
        <CardBody>
          <Text fontWeight="bold">Welcome, {data.user.name} ({data.user.role})</Text>
        </CardBody>
      </Card>

      {data.user.role === 'user' ? (
        <Box mt={6}>
          <Heading size="md" mb={3}>Your Recipes</Heading>
          {data.recipes?.length ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {data.recipes.map(r => (
                <Card as={Link} key={r._id} to={`/recipes/${r._id}`} _hover={{ boxShadow: 'lg' }}>
                  <CardBody>
                    <Heading size="sm" mb={1}>{r.title}</Heading>
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>{r.description}</Text>
                    <Tag mt={2} colorScheme="yellow">⭐ {r.averageRating || 0}</Tag>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          ) : <Text color="gray.500">No recipes yet. <CLink as={Link} to="/create" color="teal.500">Create one</CLink>.</Text>}
        </Box>
      ) : (
        <Box mt={6}>
          <Heading size="md" mb={3}>Your Ratings</Heading>
          {data.ratings?.length ? (
            <Stack>
              {data.ratings.map((rt, i) => (
                <Card key={i} as={Link} to={`/recipes/${rt.recipeId}`} _hover={{ boxShadow: 'md' }}>
                  <CardBody>
                    <Text fontWeight="bold">{rt.recipeTitle}</Text>
                    <Text fontSize="sm" color="gray.600">by {rt.author}</Text>
                    <Tag mt={2} colorScheme="yellow">⭐ {rt.score}</Tag>
                    {rt.comment && <Text mt={2}>{rt.comment}</Text>}
                  </CardBody>
                </Card>
              ))}
            </Stack>
          ) : <Text color="gray.500">You haven't rated any recipes yet.</Text>}
        </Box>
      )}
    </Box>
  )
}
