import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { push, ref, set } from 'firebase/database';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { database } from '../services/firebase';

const Landing: NextPage = () => {
  const history = useRouter();

  async function handleNewRoom(event: FormEvent) {
    event.preventDefault();

    const roomListRef = ref(database, 'rooms')
    const roomRef = push(roomListRef);

    set(roomRef, {
      title: 'Título da task....',
      active: true,
      status: 'hidden',
      users: null,
    });

    history.push(`/rooms/${roomRef.key}`);
  }

  return (
    <Flex align="center" justify="center" h={"100vh"}>
      <Stack spacing={50}>
        <Stack spacing={2}>
          <Heading color={"brand.700"}>Bem vindo ao</Heading>
          <Heading color={"brand.900"}>Planning Poker!</Heading>
        </Stack>

        <Button onClick={handleNewRoom} mt={5} colorScheme={"blue"}>
          Criar nova sala
        </Button>
      </Stack>
    </Flex>
  )
}

export default Landing
