import { Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { CardUser } from '../components/CardUser';
import { ListOfCards } from '../components/ListOfCards';

const Landing: NextPage = () => {

  return (
    <Flex h="100vh" direction="column" >

      <CardUser score={54} />

      <ListOfCards />
    </Flex>
  )
}

export default Landing
