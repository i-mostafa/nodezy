export enum MainFiles {
  app = "app.js",
  server = "server.js",
  package = "package.json",
  apiRouter = "api.router.js",
  env = ".env",
}
export enum QuestionTypes {
  input = "input",
  number = "number",
  confirm = "confirm",
  list = "list",
  rawlist = "rawlist",
  expand = "expand",
  checkbox = "checkbox",
  password = "password",
  editor = "editor",
}

export enum ProjectSubDirs {
  routers = "routers",
  controllers = "controllers",
  models = "models",
  validations = "validations",
  services = "services",
  public = "public",
  uploads = "uploads",
  guards = "guards",
  utils = "utils",
}
export interface Question {
  type: QuestionTypes;
  message: string | Function;
  name: string;
  choices?: string[] | Function;
  filter?: Function;
  validate?: Function;
}
