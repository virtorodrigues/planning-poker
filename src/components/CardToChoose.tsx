import { Box, Button, Text } from "@chakra-ui/react"
import { CardToChooseProps } from "../core/types"

export function CardToChoose({ score, active, handleActiveCard }: CardToChooseProps) {
  return (
    <Button
      onClick={() => handleActiveCard(score)}
      h={"5rem"}
      w={"3.3rem"}
      border={"2px"}
      borderColor="brand.700"
      borderRadius={10}
      bg="transparent"
      marginX={2}
      color={active ? "white" : "brand.800"}
      transform={active ? 'translateY(-7px)' : ''}
      backgroundColor={active ? "brand.700" : ""}
      boxShadow="none !important"

      _hover={{
        transform: active ? 'translateY(-7px)' : 'translateY(-2px)',
        backgroundColor: active ? "brand.700" : "blue.50",
      }}
    >
      <Text fontWeight="semibold" fontSize={24}>{score}</Text>
    </Button >
  )
}