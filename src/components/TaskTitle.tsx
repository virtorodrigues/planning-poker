import { Button, Flex, Heading, HStack, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useTitleTaskContext } from "../core/hooks/useTitleTaskContext";

type TaskTitle = {
  taskTitle: string;
  admin: boolean;
  roomKey: string;
}

export function TaskTitle({ taskTitle, admin, roomKey }: TaskTitle) {
  const { isTitleEditing, handleToggleEditTitle, setIsTitleEditing, handleApplyTaskTitle } = useTitleTaskContext();

  const [taskTitleForm, setTaskTitleForm] = useState('' as string);

  return (
    <>
      <Flex align="center" px={10} flexDir={["column", "row"]}>
        <Heading>
          {taskTitle}
        </Heading>
        {!isTitleEditing && admin && (
          <Button size='xs' ml={6} p={3} onClick={handleToggleEditTitle} colorScheme="blue">Editar</Button>
        )}
      </Flex>

      {!taskTitle || isTitleEditing && (
        <Stack mt={25} maxWidth={300} spacing={5} justifyContent={"center"}>
          <Textarea
            onChange={(e) => setTaskTitleForm(e.target.value)}
            maxHeight={200}
            width="100%"
            minW={300}
            placeholder="Digite o título da tarefa...."
          />

          <HStack>
            <Button size='xs' onClick={(e) => handleApplyTaskTitle({ e, taskTitleForm, roomKey })} colorScheme="blue">Confirmar</Button>
            <Button size='xs' onClick={(e) => setIsTitleEditing(false)}>Cancelar</Button>
          </HStack>
        </Stack>
      )}
    </>
  )
}
