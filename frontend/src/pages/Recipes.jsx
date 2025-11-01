import { useEffect, useState } from 'react'
import { Box, Heading, SimpleGrid, Spinner, Flex } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import api from '../utils/api.js'
import RecipeCard from '../components/RecipeCard.jsx'

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
      <Heading size="lg" mb={4}>Discover tasty recipes {q ? `– results for "${q}"` : ''}</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
        {recipes.map(r => (
          <Box as={Link} key={r._id} to={`/recipes/${r._id}`} _hover={{ textDecoration: 'none' }}>
            <RecipeCard recipe={r} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
