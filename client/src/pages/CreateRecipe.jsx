import { useState } from 'react'
import { Box, Button, Card, CardBody, FormControl, FormLabel, Heading, Input, Stack, Textarea, useToast, IconButton } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import api from '../utils/api.js'
import { useNavigate } from 'react-router-dom'

export default function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [steps, setSteps] = useState([''])
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const setItem = (list, setter, i, val) => {
    const next = [...list]
    next[i] = val
    setter(next)
  }

  const addItem = (list, setter) => setter([...list, ''])
  const removeItem = (list, setter, i) => setter(list.filter((_, idx) => idx !== i))

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        title,
        description,
        ingredients: ingredients.filter(Boolean),
        steps: steps.filter(Boolean)
      }
      const { data } = await api.post('/recipes', payload)
      toast({ title: 'Recipe created', status: 'success' })
      navigate(`/recipes/${data._id}`)
    } catch (e) {
      toast({ title: 'Failed to create', description: e?.response?.data?.error || 'Try again', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxW="2xl" mx="auto">
      <Card>
        <CardBody>
          <Heading size="md" mb={4}>Create Recipe</Heading>
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Ingredients</FormLabel>
                <Stack>
                  {ingredients.map((ing, i) => (
                    <Stack key={i} direction="row">
                      <Input placeholder={`Ingredient ${i+1}`} value={ing} onChange={(e) => setItem(ingredients, setIngredients, i, e.target.value)} />
                      <IconButton aria-label="Remove" icon={<DeleteIcon />} onClick={() => removeItem(ingredients, setIngredients, i)} />
                    </Stack>
                  ))}
                  <Button leftIcon={<AddIcon />} onClick={() => addItem(ingredients, setIngredients)} variant="outline" size="sm">Add ingredient</Button>
                </Stack>
              </FormControl>
              <FormControl>
                <FormLabel>Steps</FormLabel>
                <Stack>
                  {steps.map((s, i) => (
                    <Stack key={i} direction="row">
                      <Input placeholder={`Step ${i+1}`} value={s} onChange={(e) => setItem(steps, setSteps, i, e.target.value)} />
                      <IconButton aria-label="Remove" icon={<DeleteIcon />} onClick={() => removeItem(steps, setSteps, i)} />
                    </Stack>
                  ))}
                  <Button leftIcon={<AddIcon />} onClick={() => addItem(steps, setSteps)} variant="outline" size="sm">Add step</Button>
                </Stack>
              </FormControl>
              <Button colorScheme="teal" type="submit" isLoading={loading}>Create</Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  )
}
