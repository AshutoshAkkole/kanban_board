import Board from "./board";
import * as ContainerCss from "../css/boardContainer.css";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import * as R from "ramda";

type board = { title: string };

interface Props {
  boards?: board[];
}

const boards_default: board[] = [
  { title: "not yet" },
  { title: "in progress" },
  { title: "completed" },
];

type tasks = { task: string }[];

const task_default: tasks = [
  { task: "do code" },
  { task: "do proper dev code" },
];

const addElement = (
  element: { task: string },
  index: number,
  tasks: tasks
): tasks => R.insert(index, element, tasks);

const removeElements = (index: number, tasks: tasks): tasks =>
  R.remove(index, 1, tasks);

type droppable = { tasks: tasks; index: number; id: string };

const dragDropUpdation = (
  destination: droppable,
  source: droppable,
  setMethod1: React.Dispatch<React.SetStateAction<tasks>>,
  setMethod2: React.Dispatch<React.SetStateAction<tasks>>
): void => {
  const { index: source_index, tasks: source_tasks, id:id1 } = source;
  const { index: destination_index, tasks: destination_tasks, id:id2 } = destination;

  const element = source_tasks[source_index];

  let updated_array;

  if(R.equals(id1,id2)){
    updated_array = removeElements(source_index, source_tasks);
    updated_array = addElement(element, destination_index, updated_array);
    setMethod1(updated_array);
    return;
  }

  updated_array = removeElements(source_index, source_tasks);
  setMethod2(updated_array);

  updated_array = addElement(element, destination_index, destination_tasks);
  setMethod1(updated_array);
};

const BoardContainer: React.FC<Props> = ({ boards = boards_default }) => {
  const [notYet, setNotYet] = useState(task_default);
  const [inProgress, setInprogress] = useState(task_default);
  const [completed, setCompleted] = useState(task_default);

  const tasks = [notYet, inProgress, completed];
  const setTasks = [setNotYet, setInprogress, setCompleted];

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    const destArray = tasks[Number(destination.droppableId) - 1];
    const srcArray = tasks[Number(source.droppableId) - 1];

    const destSetM = setTasks[Number(destination.droppableId) - 1];
    const srcSetM = setTasks[Number(source.droppableId) - 1];

    dragDropUpdation(
      {
        index: destination.index,
        tasks: destArray,
        id: destination.droppableId,
      },
      { index: source.index, tasks: srcArray, id: source.droppableId },
      destSetM,
      srcSetM
    );
  };

  const { container } = ContainerCss;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={container}>
        {boards.map((item, index) => (
          <Board header={item.title} tasks={tasks[index]} id={index}></Board>
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardContainer;
