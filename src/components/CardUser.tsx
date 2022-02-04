import { Flex, Stack, Text } from "@chakra-ui/react"
import { CardUserProps } from "../core/types";

export function CardUser({ status = "initial", score }: CardUserProps) {
  const showScore = status === 'showed';
  const borderColor = status === 'initial' ? 'blue.100' : 'brand.700';
  let bgColor = 'blue.100';

  if (status === 'active') {
    bgColor = 'brand.700';
  } else if (status === 'showed') {
    bgColor = 'transparent';
  }

  return (
    <Stack>
      <Flex
        justifyContent="center"
        alignItems="center"
        h={"4rem"}
        w={"2.8rem"}
        border={"2px"}
        borderColor={borderColor}
        borderRadius={10}
        bg={bgColor}
        _hover={{
          cursor: "default"
        }}
      >
        <Text fontWeight="semibold" fontSize={18}>{showScore && score}</Text>
      </Flex>
      <Text fontWeight="bold">Vitor</Text>
    </Stack>
  )
}