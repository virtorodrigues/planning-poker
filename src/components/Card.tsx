import { Box, Button, Flex, Text } from "@chakra-ui/react"

type CardProps = {
  showed: boolean;
  score: number;
}

export function Card({ showed, score }: CardProps) {
  return (
    <Box py={5}>
      <Button
        justifyContent="center"
        alignItems="center"
        h={"6rem"}
        w={"3.8rem"}
        border={"2px"}
        borderColor="brand.700"
        borderRadius={10}
        bg="transparent"
      >
        <Text color="brand.800" fontWeight="semibold" fontSize={24}>{score}</Text>
      </Button >

    </Box>
  )
}