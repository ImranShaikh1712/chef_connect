import { useEffect, useState } from 'react'
import { Box, Card, CardBody, Flex, Heading, SimpleGrid, Spinner, Tag, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import api from '../utils/api.js'

export default function Recipes({ authorId }) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const q = new URLSearchParams(location.search).get('q') || ''

  useEffect(() => {
    const load = async () => {
      try {
        const params = new URLSearchParams()
        if (q) params.set('q', q)
        if (authorId) params.set('authorId', authorId)
        const { data } = await api.get(`/recipes${params.toString() ? `?${params}` : ''}`)
        setRecipes(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [q, authorId])

  if (loading) return <Flex justify="center" py={10}><Spinner /></Flex>

  return (
    <Box>
      <Heading size="lg" mb={4}>Recipes {q ? `– results for "${q}"` : ''}</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {recipes.map(r => (
          <Card as={Link} key={r._id} to={`/recipes/${r._id}`} _hover={{ boxShadow: 'lg' }}>
            <CardBody>
              <Heading size="md" mb={1}>{r.title}</Heading>
              <Text fontSize="sm" color="gray.600" noOfLines={2}>{r.description}</Text>
              <Flex mt={3} align="center" gap={2}>
                <Tag colorScheme="yellow">⭐ {r.averageRating || 0}</Tag>
                <Text fontSize="xs" color="gray.500">by {r.author?.name}</Text>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )
}
