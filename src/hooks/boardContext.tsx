import { createContext } from "react";

interface boardContextShap {
    task: Tasks[],
    setTasks: SetState<Tasks>[]
}

const boardContext = createContext<boardContextShap | any>({});

export default boardContext;