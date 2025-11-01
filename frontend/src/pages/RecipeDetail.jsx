import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Card, CardBody, Divider, Flex, FormControl, FormLabel, Heading, Input, Stack, Textarea, Text, Tag, useToast } from '@chakra-ui/react'
import api from '../utils/api.js'
import { useAuth } from '../state/AuthContext.jsx'

export default function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const { user } = useAuth()

  const alreadyRated = useMemo(() => {
    if (!user || !recipe?.ratings) return false
    return recipe.ratings.some(r => r.chef?._id === user.id || r.chef === user.id)
  }, [user, recipe])

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/recipes/${id}`)
      setRecipe(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Box>
      {loading && <Text>Loading...</Text>}
      {!loading && recipe && (
        <Stack spacing={4}>
          <Heading>{recipe.title}</Heading>
          <Text color="gray.700">{recipe.description}</Text>
          <Flex align="center" gap={2}>
            <Tag colorScheme="yellow">⭐ {recipe.averageRating || 0}</Tag>
            <Text fontSize="sm" color="gray.500">by {recipe.author?.name}</Text>
          </Flex>

          {recipe.ingredients?.length > 0 && (
            <Box>
              <Heading size="sm" mb={2}>Ingredients</Heading>
              <Stack spacing={1}>
                {recipe.ingredients.map((ing, i) => <Text key={i}>• {ing}</Text>)}
              </Stack>
            </Box>
          )}

          {recipe.steps?.length > 0 && (
            <Box>
              <Heading size="sm" mb={2}>Steps</Heading>
              <Stack spacing={1}>
                {recipe.steps.map((s, i) => <Text key={i}>{i + 1}. {s}</Text>)}
              </Stack>
            </Box>
          )}

          <Box>
            <Heading size="sm" mb={2}>Ratings</Heading>
            <Stack>
              {recipe.ratings?.length ? recipe.ratings.map((r, i) => (
                <Card key={i}><CardBody>
                  <Flex align="center" gap={2}>
                    <Tag colorScheme="yellow">⭐ {r.score}</Tag>
                    <Text fontSize="sm" color="gray.600">by {r.chef?.name || 'Chef'}</Text>
                  </Flex>
                  {r.comment && <Text mt={2}>{r.comment}</Text>}
                </CardBody></Card>
              )) : <Text color="gray.500">No ratings yet</Text>}
            </Stack>
          </Box>

          {user && user.role === 'chef' && !alreadyRated && (
            <>
              <Divider />
              <RateForm recipeId={id} onDone={load} />
            </>
          )}
        </Stack>
      )}
    </Box>
  )
}

function RateForm({ recipeId, onDone }) {
  const { user } = useAuth()
  const [score, setScore] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post(`/recipes/${recipeId}/rate`, { score: Number(score), comment })
      toast({ title: 'Rating submitted', status: 'success' })
      onDone?.()
    } catch (e) {
      toast({ title: 'Failed to rate', description: e?.response?.data?.error || 'Try again', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <Card>
      <CardBody>
        <Heading size="sm" mb={3}>Leave a rating</Heading>
        <form onSubmit={submit}>
          <Stack spacing={3}>
            <FormControl isRequired>
              <FormLabel>Score (1-5)</FormLabel>
              <Input type="number" min={1} max={5} value={score} onChange={(e) => setScore(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Comment</FormLabel>
              <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="teal" isLoading={loading}>Submit</Button>
          </Stack>
        </form>
      </CardBody>
    </Card>
  )
}
