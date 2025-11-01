import { Box, Badge, Flex, Heading, Text } from '@chakra-ui/react'

export default function RecipeCard({ recipe }) {
  const rating = recipe.averageRating || 0
  const author = recipe.author?.name || 'Unknown'

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      _dark={{ bg: 'gray.800' }}
      transition="all 0.2s"
      _hover={{ boxShadow: 'xl', transform: 'translateY(-2px)' }}
    >
      <Box
        h="140px"
        bgGradient="linear(to-br, brand.500, accent.400)"
        position="relative"
      />
      <Box p={4}>
        <Flex align="center" justify="space-between" mb={1}>
          <Heading size="md" noOfLines={1}>{recipe.title}</Heading>
          <Badge colorScheme="yellow">⭐ {rating.toFixed(1)}</Badge>
        </Flex>
        <Text fontSize="sm" color="gray.600" noOfLines={2}>{recipe.description}</Text>
        <Text mt={2} fontSize="xs" color="gray.500">by {author}</Text>
      </Box>
    </Box>
  )
}
