import { Button, Flex, HStack, Input, Stack, Textarea } from '@chakra-ui/react';
import { child, get, off, onValue, push, ref, remove, set, update } from "firebase/database";
import type { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { FormEvent, useEffect, useState } from 'react';
import { CardUser } from '../../components/CardUser';
import { ListOfCards } from '../../components/ListOfCards';
import { TaskTitle } from '../../components/TaskTitle';
import { database } from '../../services/firebase';
import { useCookies } from "react-cookie"

type RoomKeyProp = ParsedUrlQuery & {
  roomKey: string;
  isFirstAccessParam: boolean;
};

type DataRoomProps = {
  title: string;
  users: string;
  active: boolean;
};

const configCookie = {
  path: "/",
  maxAge: 3600, // Expires after 1hr
  sameSite: true,
};

const Game = ({ roomKey, isFirstAccessParam }: RoomKeyProp) => {

  const [cookie, setCookie] = useCookies();
  const [userKeyCookie, setUserKeyCookie] = useCookies(["planning-poker-user-key"]);

  const [dataRoom, setDataRoom] = useState({} as DataRoomProps);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [taskTitleForm, setTaskTitleForm] = useState('' as string);

  const [isFirstAccess, setIsFirstAccess] = useState(isFirstAccessParam);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    console.log(userKeyCookie['planning-poker-user-key']);


    if (userKeyCookie) {

    }


    if (typeof window != "undefined") { // needed if SSR
      //if (window) {
      window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "\o/";
        remove(ref(database, `rooms/${roomKey}/users/${userKeyCookie['planning-poker-user-key']}`));

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage;                            //Webkit, Safari, Chrome
      });
      //}

    }

  }, []);


  useEffect(() => {

    const dbRef = ref(database);
    get(child(dbRef, `rooms/${roomKey}/users`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());


      } else {

        //  setCookie("planning-poker-user-name", 'vitor', configCookie);
        //   setCookie("planning-poker-admin", true, configCookie);
        //   console.log("No data available");


      }
    }).catch((error) => {
      console.error(error);
    });

    if (userKeyCookie) {

    }

    //verificar usuario
    const configCookie = {
      path: "/",
      maxAge: 3600, // Expires after 1hr
      sameSite: true,
    };

    //  setCookie("planning-poker-user-name", 'vitor', configCookie);
    //   setCookie("planning-poker-admin", true, configCookie);


    const starCountRef = ref(database, `rooms/${roomKey}`);

    const fireEvent = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      setDataRoom(data);
    });

    return () => {
      remove(ref(database, `rooms/${roomKey}/users/${userKeyCookie['planning-poker-user-key']}`));



      //remove user from firebase
      //remove user from cookies
      //remove listnner
    }

  }, []);

  const handleApplyTaskTitle = (e: FormEvent) => {
    e.preventDefault();

    if (!taskTitleForm) {
      return;
    }

    update(ref(database, `/rooms/${roomKey}`), { title: taskTitleForm })
      .then(() => setIsEditingTitle(false));
  }

  const handleToggleEditTitle = () => {
    remove(ref(database, `rooms/${roomKey}/users/${userKeyCookie['planning-poker-user-key']}`));
  }

  const handleCreateNameToUser = (e: FormEvent) => {
    e.preventDefault();
    console.log(`/rooms/${roomKey}/users/${userKeyCookie['planning-poker-user-key']}`);

    update(ref(database, `/rooms/${roomKey}/users/${userKeyCookie['planning-poker-user-key']}`), { name: userName })
    setCookie("planning-poker-user-name", 'vitor', configCookie);
    setCookie("planning-poker-admin", true, configCookie);
  }

  return (
    <>
      <Flex direction="column" justify="center" align="center" my="120px">
        <Flex justify="center" align="center" direction="column" flex={1}>

          {isFirstAccess && (
            <Flex mb={10}>
              <Input onChange={(e) => setUserName(e.target.value)} value={userName} placeholder='Como quer ser chamado?' />
              <Button ml={6} onClick={(e) => handleCreateNameToUser(e)} colorScheme="blue">Confirmar</Button>
            </Flex>
          )}

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
  let isFirstAccessParam = true;

  if (context.req.cookies['planning-poker-user-name']
    && context.req.cookies['planning-poker-admin']) {

    const newUser = {
      name: context.req.cookies['planning-poker-user-name'],
      admin: context.req.cookies['planning-poker-admin'],
    };

    // const adminListRef = ref(database, `/rooms/${roomKey}/users`);
    // const adminRef = push(adminListRef);

    //  set(adminRef, newUser);

    //  context.res.setHeader('set-cookie', `planning-poker-user-key=${adminRef.key}` || '');

    isFirstAccessParam = false;
  } else {
    const newUser = {
      name: '',
      admin: false,
    };

    const userListRef = ref(database, `/rooms/${roomKey}/users`);
    const userRef = push(userListRef);

    set(userRef, newUser);

    // context.res.setHeader('set-cookie', `planning-poker-user-name=${newUser.name}` || '');
    //  context.res.setHeader('set-cookie', `planning-poker-admin=${newUser.admin}` || '');
    context.res.setHeader('set-cookie', `planning-poker-user-key=${userRef.key}` || '');

  }

  return {
    props: {
      roomKey,
      isFirstAccessParam
    }
  }
}