import { Box, Container, Flex, Link as CLink, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box mt={10} borderTopWidth="1px" borderColor="blackAlpha.200" bg="white">
      <Container maxW="container.xl" py={6}>
        <Flex direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'center' }} gap={3} justify="space-between">
          <Text color="gray.600">© {new Date().getFullYear()} Chef Connect</Text>
          <Flex gap={4} color="gray.600">
            <CLink href="#">About</CLink>
            <CLink href="#">Contact</CLink>
            <CLink href="#">Privacy</CLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
