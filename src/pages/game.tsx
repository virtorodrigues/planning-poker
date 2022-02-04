import { Button, Flex, Stack, Textarea } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { CardUser } from '../components/CardUser';
import { ListOfCards } from '../components/ListOfCards';
import { TaskTitle } from '../components/TaskTitle';
import { database } from '../services/firebase';
import { getDatabase, ref, set } from "firebase/database";

const Game: NextPage = () => {


  function writeUserData() {
    const db = database;
    set(ref(db, 'room/' + 23221), {
      username: 'nome'
    });
  }

  return (
    <>
      <Flex direction="column" justify="center" align="center" my="120px">
        <Flex justify="center" align="center" direction="column" flex={1}>

          <Flex mb={100}>
            <TaskTitle />
          </Flex>

          <Stack maxWidth={780} w={780} spacing={5} align="end">
            <Textarea maxHeight={200} maxWidth={780} placeholder="Digite o título da tarefa...." />
            <Button onClick={writeUserData} width={100} colorScheme="blue">Confirmar</Button>
          </Stack>

          <CardUser score={54} />
        </Flex>

      </Flex>

      <ListOfCards />
    </>
  )
}

export default Game
