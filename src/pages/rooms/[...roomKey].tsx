import { Button, Flex, HStack, Stack, Textarea } from '@chakra-ui/react';
import { onValue, ref, update } from "firebase/database";
import type { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { FormEvent, useEffect, useState } from 'react';
import { CardUser } from '../../components/CardUser';
import { ListOfCards } from '../../components/ListOfCards';
import { TaskTitle } from '../../components/TaskTitle';
import { database } from '../../services/firebase';

type RoomKeyProp = ParsedUrlQuery & {
  roomKey: string;
}

type DataRoomProps = {
  title: string;
  users: string;
  active: boolean;
}

const Game = ({ roomKey }: RoomKeyProp) => {
  const [dataRoom, setDataRoom] = useState({} as DataRoomProps);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [taskTitleForm, setTaskTitleForm] = useState('' as string);

  useEffect(() => {
    const starCountRef = ref(database, `room/${roomKey}`);

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      setDataRoom(data);
    });
  }, []);

  const handleApplyTaskTitle = (e: FormEvent) => {
    e.preventDefault();

    if (!taskTitleForm) {
      return;
    }

    update(ref(database, `/room/${roomKey}`), { title: taskTitleForm })
      .then(() => setIsEditingTitle(false));
  }

  const handleToggleEditTitle = () => {
    setIsEditingTitle(!isEditingTitle);
  }

  return (
    <>
      <Flex direction="column" justify="center" align="center" my="120px">
        <Flex justify="center" align="center" direction="column" flex={1}>

          <Flex align="center">
            <TaskTitle taskTitle={dataRoom.title} />
            {!isEditingTitle && (
              <Button ml={6} onClick={handleToggleEditTitle} colorScheme="blue">Editar</Button>
            )}
          </Flex>

          {!dataRoom.title || isEditingTitle && (
            <Stack mt={100} maxWidth={780} w={780} spacing={5} align="end">
              <Textarea onChange={(e) => setTaskTitleForm(e.target.value)} maxHeight={200} maxWidth={780} placeholder="Digite o título da tarefa...." />

              <HStack>
                <Button onClick={(e) => handleApplyTaskTitle(e)} width={100} colorScheme="blue">Confirmar</Button>
                <Button onClick={(e) => setIsEditingTitle(false)} width={100}>Cancelar</Button>
              </HStack>
            </Stack>
          )}

          <Flex mt={200}>
            <CardUser score={54} />
          </Flex>
        </Flex>

      </Flex>

      <ListOfCards />
    </>
  )
}

export default Game;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { roomKey } = context.params as RoomKeyProp;

  return {
    props: {
      roomKey: roomKey,
    }
  }
}