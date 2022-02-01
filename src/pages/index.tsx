import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'

const Landing: NextPage = () => {
  return (
    <Flex align="center" justify="center" h={"100vh"}>
      <Stack spacing={50}>
        <Stack spacing={2}>
          <Heading color={"brand.700"}>Bem vindo ao</Heading>
          <Heading color={"brand.900"}>Planning Poker!</Heading>
        </Stack>

        <Button mt={5} colorScheme={"blue"}>
          Criar nova sala
        </Button>
      </Stack>
    </Flex>
  )
}

export default Landing
