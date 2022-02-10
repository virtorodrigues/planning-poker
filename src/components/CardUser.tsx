import { Flex, Stack, Text } from "@chakra-ui/react"
import { CardUserProps } from "../core/types";

type UserProps = {
  key: string;
  name: string;
  admin: boolean;
  score: number;
  status: string;
  roomStatus: string;
}

export function CardUser({ status = "initial", score, name, key, admin, roomStatus }: UserProps) {
  console.log(name);
  const showScore = roomStatus === 'showed';
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
      <Text fontWeight="bold">{name}</Text>
    </Stack>
  )
}