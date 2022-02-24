import { useContext } from "react"
import { TaskTitleContext } from "../contexts/taskTitle"

export const useTitleTaskContext = () => {

  const value = useContext(TaskTitleContext);

  if (!value) {
    throw new Error('useTitleTaskContext does not exists useTitleTaskProvider');
  }

  return value;
}