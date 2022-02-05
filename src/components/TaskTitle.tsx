import { Heading } from "@chakra-ui/react";

type TaskTitle = {
  taskTitle: string;
}

export function TaskTitle({ taskTitle }: TaskTitle) {
  return (
    <Heading>
      {taskTitle}
    </Heading>
  )
}
