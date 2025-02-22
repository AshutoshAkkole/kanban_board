import { useCallback, useContext, useMemo, useState } from "react";
import addLogo from "../../assets/add.png";
import deleteLogo from "../../assets/delete.png";
import boardContext from "../hooks/boardContext";
import * as inputTaskCss from "../css/inputTask.css";

interface Props {
  index?: number
}

const InputTask: React.FC<Props> = ({index = 0}) => {
  const { addPng, inputContainer } = inputTaskCss;
  const [openInput, setOpenInput] = useState(false);
  const [value, setValue] = useState("");

  const { tasks:T, setTasks } = useContext(boardContext);

  const task = useMemo(()=>T[index],[index])
  
  const setTask = useCallback((val: Tasks)=>setTasks[index](val),[index]);

  return (
    <div>
      {!openInput && (
        <img
          src={addLogo}
          className={addPng}
          onClick={() => setOpenInput(true)}
        ></img>
      )}

      {openInput && (
        <>
        <div className={inputContainer}>
          <input onChange={(e) => setValue(e.target.value)} value={value} type="text"></input>
        </div>
          <img
            src={addLogo}
            className={addPng}
            onClick={() => {setTask([...task, {task: value}]);setOpenInput(false);setValue("")}}
          ></img>
          <img
            src={deleteLogo}
            className={addPng}
            onClick={() => {setOpenInput(false);setValue("")}}
          ></img>
        </>
      )}
    </div>
  );
};

export default InputTask;
