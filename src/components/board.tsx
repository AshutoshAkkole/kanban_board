import * as boardCss from "../css/board.css";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import InputTask from "./inputTask";

type Props = {
  tasks?: Tasks,
  header?: string,
  id: number,
};

const task_default: Tasks = [
  { task: "do code" },
  { task: "do proper dev code" },
];

const Board: React.FC<Props> = ({
  tasks = task_default,
  header = "unpicked",
  id,
}) => {
  const { boardPlate, title, draggable: draggableCss } = boardCss;

  return (
    <>
      <Droppable droppableId={id + 1 + ""}>
        {(provider) => (
          <div
            className={boardPlate}
            ref={provider.innerRef}
            {...provider.droppableProps}
          >
            <p className={title}>{header}</p>
            {tasks.map((val, index) => (
              <Draggable draggableId={id + "" + index} key={index} index={index}>
                {(provider) => (
                  <div
                    ref={provider.innerRef}
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                  >
                    <div className={draggableCss}>{val.task}</div>
                  </div>
                )}
              </Draggable>
            ))}
            <InputTask index={id} />
          </div>
        )}
      </Droppable>
    </>
  );
};

export default Board;
