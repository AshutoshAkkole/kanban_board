// global.d.ts (or css.d.ts)
declare module "*.css" {
    const classes: { [key: string]: string };
    export = classes;
  }
  