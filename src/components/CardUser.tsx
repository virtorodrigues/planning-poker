import { Flex, Stack, Text } from "@chakra-ui/react"
import { CardUserProps } from "../core/types";

type UserProps = {
  name: string;
  admin: boolean;
  score: number;
  status: string;
  roomStatus: string;
}

export function CardUser({ status = "initial", score, name, admin, roomStatus }: UserProps) {
  const showScore = roomStatus === 'showed';
  const borderColor = status === 'initial' ? 'blue.100' : 'brand.700';
  let bgColor = 'blue.100';

  if (status === 'active' && !showScore) {
    bgColor = 'brand.700';
  } else if (showScore) {
    bgColor = 'transparent';
  }

  return (
    <Stack marginX={2} alignItems="center">
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
      <Text fontWeight="bold">{name}</Text>
    </Stack>
  )
}