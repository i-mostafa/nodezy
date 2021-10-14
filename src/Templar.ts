import ejs from "ejs";

import { readFileSync, writeFileSync } from "fs";

interface IOptions {
  [key: string]: string | number | boolean;
}
const Templar = class {
  result: string = "";
  constructor(public filePath: string) {}

  async solve(options: IOptions) {
    this.result = await ejs.renderFile(this.filePath, options, {
      async: false,
    });
    return this;
  }
  save(outPath: string) {
    writeFileSync(outPath, this.result);
  }
};

export const solveFile = async ({
  filePath,
  options,
  outPath,
}: {
  filePath: string;
  outPath: string;
  options: IOptions;
}) => {
  const templar = await new Templar(filePath).solve(options);

  templar.save(outPath);
};

export default Templar;
