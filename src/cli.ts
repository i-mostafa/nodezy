import inquirer from "inquirer";
import path from "path";
import { mkdirSync, existsSync } from "fs";
import { solveFile } from "./Templar";
import shell from "shelljs";
import {
  MainFiles,
  ProjectSubDirs,
  Question,
  QuestionTypes,
} from "./utils/helpers";

const consoleDir = process.cwd();

const questions: Question[] = [
  {
    type: QuestionTypes.input,
    message: "Please enter the project name\n",
    name: "projectName",
    validate: (input: string) => {
      // check if there is a dir with the projectName
      const projectDir = path.join(consoleDir, input);

      if (existsSync(projectDir)) {
        return "Error this dir i already exists";
      }
      return true;
    },
  },
  {
    type: QuestionTypes.list,
    message: "Please choose db from the list\n* current mongodb only\n",
    name: "db",
    choices: ["mongodb"],
  },
];

(async () => {
  // const result = await inquirer.prompt(questions);
  const projectDir = path.join(consoleDir, "islam");

  // create project dirs
  if (!existsSync(projectDir)) mkdirSync(projectDir);
  Object.keys(ProjectSubDirs).forEach((dir) => {
    if (!existsSync(path.join(projectDir, dir)))
      mkdirSync(path.join(projectDir, dir));
  });

  // solve main files and copy it to the project dir

  await Promise.all(
    Object.values(MainFiles).map(
      async (fileName: string) =>
        await solveFile({
          filePath: path.join(__dirname, "templates", fileName),
          outPath: path.join(projectDir, fileName),
          options: {},
        })
    )
  );

  // install node dependencies
  shell.cd(projectDir);
  shell.exec("npm i");
})();
