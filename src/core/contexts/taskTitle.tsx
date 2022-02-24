import { ref, update } from "firebase/database";
import { createContext, FormEvent, ReactNode, useMemo, useState } from "react";
import { database } from "../../services/firebase";

type TaskTitleProviderProps = {
  children: ReactNode;
}

type handleApplyTaskTitleProps = {
  e: FormEvent;
  taskTitleForm: string;
  roomKey: string;
}

type TaskTitleContextProps = {
  handleToggleEditTitle: () => void;
  handleApplyTaskTitle: ({ e, taskTitleForm, roomKey }: handleApplyTaskTitleProps) => void;
  title: string;
  isTitleEditing: boolean;
  setIsTitleEditing: (isTitleEditing: boolean) => void;
}

const TaskTitleContext = createContext({} as TaskTitleContextProps);

const TaskTitleProvider = ({ children }: TaskTitleProviderProps) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false as boolean);
  const [title, setTitle] = useState('' as string);

  const handleToggleEditTitle = () => {
    setIsTitleEditing(!isTitleEditing);
  }

  const handleApplyTaskTitle = ({ e, taskTitleForm, roomKey }: handleApplyTaskTitleProps) => {
    e.preventDefault();

    if (!taskTitleForm) {
      return;
    }

    update(ref(database, `/rooms/${roomKey}`), { title: taskTitleForm })
      .then(() => setIsTitleEditing(false));
  }

  const value = useMemo(() => ({
    title, handleToggleEditTitle, handleApplyTaskTitle, isTitleEditing, setIsTitleEditing
  }), [title, isTitleEditing]);


  return (
    <TaskTitleContext.Provider value={value}>
      {children}
    </TaskTitleContext.Provider>
  )
}

export { TaskTitleProvider, TaskTitleContext };