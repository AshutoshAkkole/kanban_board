// global.d.ts (or css.d.ts)
declare module "*.css" {
    const classes: { [key: string]: string };
    export = classes;
  }

declare module "*.png"{
  const data : string;
  export default data;
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type Task = { task: string };
type Tasks = task[];