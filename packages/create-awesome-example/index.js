#!/usr/bin/env node

import simpleGit from "simple-git";
import ora from "ora";
import { cp, rm } from "fs/promises";
import { join } from "path";
import prompts from "prompts";

const __dirname = process.cwd();
async function initNextJsProject(projectPath, framework) {
  await cp(
    join(
      __dirname,
      projectPath,
      framework === "nextjs"
        ? "nextjs-prisma-graphql-example"
        : "express-sequelize-example"
    ),
    join(__dirname, projectPath),
    { recursive: true }
  );
  await rm(join(__dirname, projectPath, "nextjs-prisma-graphql-example"), {
    recursive: true,
  });
  await rm(join(__dirname, projectPath, "express-sequelize-example"), {
    recursive: true,
  });
  await rm(join(__dirname, projectPath, "packages"), { recursive: true });
  await rm(join(__dirname, projectPath, "pnpm-lock.yaml"));
  await rm(join(__dirname, projectPath, ".git"), { recursive: true });
}
async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "path",
      message: "What is your project path?",
    },
    {
      type: "select",
      name: "framework",
      message: "What is your project framework?",
      choices: [
        { title: "Nextjs", value: "nextjs" },
        { title: "Express", value: "express" },
      ],
    },
  ]);
  const spinner = ora("Downloading template").start();
  // https://github.com/chenzn1/awesome-examples.git
  const r = await simpleGit().clone(
    "https://github.com/chenzn1/awesome-examples.git",
    response.path
  );

  spinner.stop();
  await initNextJsProject(response.path, response.framework);
  console.log(
    `Create successfully, please enter the ${response.path} and run 'pnpm install'`
  );
}
main();
