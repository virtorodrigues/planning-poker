import { Box, Button, Flex, Grid, HStack, Input, Stack, Text, Textarea } from '@chakra-ui/react';
import { child, get, off, onValue, push, ref, remove, set, update } from "firebase/database";
import type { GetServerSideProps } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import { CardUser } from '../../components/CardUser';
import { ListOfCards } from '../../components/ListOfCards';
import { TaskTitle } from '../../components/TaskTitle';
import { database } from '../../services/firebase';
import { useCookies } from "react-cookie"
import { useUserContext } from '../../core/hooks/useUserContext';
import { DataRoomProps, RoomKeyProp, UserProps } from '../../core/types';
import { useTitleTaskContext } from '../../core/hooks/useTitleTaskContext';

const configCookie = {
  path: "/",
  maxAge: 3600, // Expires after 1hr
  sameSite: true,
};

const Game = ({ roomKey, isFirstAccessParam }: RoomKeyProp) => {
  const [, setCookie] = useCookies(['planning-poker-user-name']);

  const { setUser, user, createUser } = useUserContext();

  const [dataRoom, setDataRoom] = useState({} as DataRoomProps);

  const [isAbleToEditUserName, setIsAbleToEditUserName] = useState(isFirstAccessParam as boolean);
  const [userName, setUserName] = useState('' as string);
  const [isReestartScore, setIsReestartScore] = useState(false as boolean);
  const [ableToShowScore, setAbleToShowScore] = useState(false as boolean);

  useEffect(() => {
    const userListRef = ref(database, `/rooms/${roomKey}/users`);
    const userRef = push(userListRef);

    createUser({ roomKey, userRef });

    // exit to application
    if (typeof window != "undefined") { // needed if SSR
      //if (window) {
      window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "\o/";

        remove(ref(database, `rooms/${roomKey}/users/${userRef.key}`));

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage;                            //Webkit, Safari, Chrome
      });
    }
  }, []);

  useEffect(() => {
    const firebaseRef = ref(database, `rooms/${roomKey}`);
    onValue(firebaseRef, (snapshot) => {
      const data = snapshot.val();

      const dataFormatted = {
        ...data,
      };

      if (data.users) {
        const users = Object.entries(data.users).map((data) => ({
          ...data[1] as UserProps,
          key: data[0],
        }))

        dataFormatted.users = users

        const newAbleToShowScore = users.every((user: UserProps) => user.status === 'active') && dataFormatted.status === 'hidden';

        setAbleToShowScore(newAbleToShowScore);
      }

      if (dataFormatted.status === 'showed') {
        setAbleToShowScore(false);
      }

      setDataRoom(dataFormatted);
    });

  }, []);

  useEffect(() => {
    if (dataRoom.status === 'hidden') {
      get(child(ref(database), `rooms/${roomKey}/users/${user.key}`)).then((snapshot) => {
        if (snapshot.val()?.score === 0) {
          setIsReestartScore(true);
        }
      });
    }
  }, [dataRoom.users]);

  const handleCreateNameToUser = (e: FormEvent) => {
    e.preventDefault();

    if (isAbleToEditUserName) {
      update(ref(database, `/rooms/${roomKey}/users/${user.key}`), { name: userName })
      setCookie("planning-poker-user-name", userName, configCookie);

      setIsAbleToEditUserName(false);
      setUserName('');
      setUser({ ...user, name: userName });
    }
  }

  const handleShowScore = (e: FormEvent) => {
    e.preventDefault();

    if (ableToShowScore) {
      update(ref(database, `/rooms/${roomKey}`), { status: 'showed' });
      setAbleToShowScore(false);
    }
  }

  const handleRestart = (e: FormEvent) => {
    e.preventDefault();

    if (dataRoom.status === "showed") {
      update(ref(database, `/rooms/${roomKey}`), { status: 'hidden' });

      dataRoom.users.map(user => {
        update(ref(database, `/rooms/${roomKey}/users/${user.key}`), {
          score: 0,
          status: 'initial',
        });
      })
      setAbleToShowScore(false);
    }
  }

  const handleChooseScore = (score: number) => {
    if (dataRoom.status === 'hidden') {
      let userScore = score;
      let userStatus = 'active';

      if (isReestartScore) {
        setIsReestartScore(false);
      }

      get(child(ref(database), `rooms/${roomKey}/users/${user.key}`)).then((snapshot) => {
        if (snapshot.val().score === score) {
          userScore = 0;
          userStatus = 'initial';
        }

        update(ref(database, `/rooms/${roomKey}/users/${user.key}`),
          { score: userScore, status: userStatus });

      }).catch((error) => {

        console.error(error);
      });
    }
  }

  const handleAbleToEditUserName = (e: FormEvent) => {
    e.preventDefault();
    setIsAbleToEditUserName(true);
  }

  return (
    <>
      <Flex m={5} justifyContent="flex-end">
        <Text>Olá {user.name}</Text>
        <Button type="submit" size='xs' ml={3} onClick={(e) => handleAbleToEditUserName(e)} colorScheme="blue">Editar</Button>
      </Flex>
      <Flex direction="column" justify="center" align="center" mb="120px" mt="50px">
        <Flex justify="center" align="center" direction="column" flex={1}>

          {isAbleToEditUserName && (
            <Flex mb={10} align="center">
              <Input onChange={(e) => setUserName(e.target.value)} value={userName} placeholder='Como quer ser chamado?' />
              <Button type="submit" size='xs' ml={6} p={4} onClick={(e) => handleCreateNameToUser(e)} colorScheme="blue">Confirmar</Button>
            </Flex>
          )}

          <TaskTitle taskTitle={dataRoom.title} admin={user.admin} roomKey={roomKey} />

          {user.admin && (
            <Button
              onClick={(e) => handleShowScore(e)}
              mt={10}
              disabled={!ableToShowScore}
              colorScheme="blue"
            >
              Mostrar resultado
            </Button>
          )}

          {dataRoom.status === "showed" && user.admin && (
            <Button
              onClick={(e) => handleRestart(e)}
              mt={10}
              colorScheme="blue"
            >
              Reiniciar
            </Button>
          )}

          <Flex mt={35} >
            {dataRoom?.users && (
              <Grid
                ml={5}
                mr={5}
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(4, 1fr)'
                gap={4}
              >
                {dataRoom?.users?.map((user: UserProps) => (
                  <Box key={user.key} py={5} as="li" display="inline-block">
                    <CardUser
                      status={user.status}
                      name={user.name}
                      admin={user.admin}
                      score={user.score}
                      roomStatus={dataRoom.status}
                    />
                  </Box>
                ))}
              </Grid>
            )}

          </Flex>
        </Flex>
      </Flex>

      <ListOfCards isReestartScore={isReestartScore} handleChooseScore={handleChooseScore} />
    </>
  )
}

export default Game;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { roomKey } = context.params as RoomKeyProp;
  let isFirstAccessParam = true;

  if (context.req.cookies['planning-poker-user-name']) {
    isFirstAccessParam = false;
  }

  return {
    props: {
      roomKey,
      isFirstAccessParam,
    }
  }
}