import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Card, CardBody, Heading, Spinner, Flex, Text, Tag, SimpleGrid } from '@chakra-ui/react'
import api from '../utils/api.js'

export default function Profile() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/users/${id}`)
        setData(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <Flex justify="center" py={10}><Spinner /></Flex>
  if (!data) return null

  const { user } = data

  return (
    <Box>
      <Heading size="lg" mb={2}>{user.name}</Heading>
      <Text color="gray.600" mb={6}>{user.role === 'chef' ? 'Chef' : 'Common User'}</Text>

      {user.role === 'user' ? (
        <Box>
          <Heading size="md" mb={3}>Recipes by {user.name}</Heading>
          {data.recipes?.length ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {data.recipes.map(r => (
                <Card key={r._id} as={Link} to={`/recipes/${r._id}`} _hover={{ boxShadow: 'lg' }}>
                  <CardBody>
                    <Heading size="sm" mb={1}>{r.title}</Heading>
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>{r.description}</Text>
                    <Tag mt={2} colorScheme="yellow">⭐ {r.averageRating || 0}</Tag>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          ) : <Text color="gray.500">No recipes yet.</Text>}
        </Box>
      ) : (
        <Box>
          <Heading size="md" mb={3}>Ratings by {user.name}</Heading>
          {data.ratings?.length ? (
            <Flex direction="column" gap={3}>
              {data.ratings.map((rt, i) => (
                <Card key={i} as={Link} to={`/recipes/${rt.recipeId}`} _hover={{ boxShadow: 'md' }}>
                  <CardBody>
                    <Text fontWeight="bold">{rt.recipeTitle}</Text>
                    <Text fontSize="sm" color="gray.600">for {rt.author}</Text>
                    <Tag mt={2} colorScheme="yellow">⭐ {rt.score}</Tag>
                    {rt.comment && <Text mt={2}>{rt.comment}</Text>}
                  </CardBody>
                </Card>
              ))}
            </Flex>
          ) : <Text color="gray.500">No ratings yet.</Text>}
        </Box>
      )}
    </Box>
  )
}
