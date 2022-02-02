import { Button, Flex, Box, GridItem, Heading, SimpleGrid, Stack, HStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Card } from '../components/Card'

const cards = [
  { showed: false, score: 0 },
  { showed: false, score: 0 },
  { showed: false, score: 0 },
  { showed: false, score: 0 },
  { showed: false, score: 0 },
  { showed: false, score: 0 },
  { showed: false, score: 0 },
  { showed: false, score: 0 },

];

type CardProps = {
  showed: boolean;
  score: number;
};

const justifyContentType = cards.length > 8 ? "flex-start" : "center";

const Landing: NextPage = () => {
  return (
    <Flex bg="whitesmoke" h="100vh" direction="column" >
      <Flex >
        asdasdasd
      </Flex>
      <Box bg="white" bottom={"0"} overflow={"auto"} position={"fixed"} >
        <HStack
          spacing={5}
          width={"100vw"}
          d="flex"
          paddingX={10}
          isInline
          wrap={'nowrap'}
          justifyContent={["flex-start", "flex-start", justifyContentType]}
        >
          {cards.map((card: CardProps, index) => (
            <Card key={index} showed={card.showed} score={index} />
          ))}
        </HStack >
      </Box>
    </Flex>
  )
}

export default Landing
