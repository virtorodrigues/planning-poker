import { Box } from '@chakra-ui/react'
import { useState } from 'react';
import { CardToChoose } from './CardToChoose'

export function ListOfCards() {
  const [cards, setCards] = useState([
    { active: false, score: 1 },
    { active: false, score: 2 },
    { active: false, score: 3 },
    { active: false, score: 4 },
    { active: false, score: 5 },
    { active: false, score: 6 },
    { active: false, score: 7 },
    { active: false, score: 8 },
    { active: false, score: 9 },
    { active: false, score: 10 },
    { active: false, score: 11 },
    { active: false, score: 12 },
    { active: false, score: 13 },
    { active: false, score: 14 },
  ]);

  const handleActiveCard = (score: number) => {
    const newCards = cards.map(card => card.score === score || card.active
      ? { ...card, active: !card.active }
      : card
    );

    setCards(newCards)
  }

  return (
    <Box position="fixed" bottom="0" left="0" right="0" bg="white">
      <Box
        as="ul"
        overflowY={"hidden"}
        overflowX={"auto"}
        paddingX={10}
        whiteSpace={'nowrap'}
        width={"100%"}
        listStyleType={"none"}
        textAlign="center"
      >
        {cards.map((card, index) => (
          <CardToChoose
            key={index}
            active={card.active}
            score={card.score}
            handleActiveCard={handleActiveCard}
          />
        ))}
      </Box >
    </Box>
  )
}