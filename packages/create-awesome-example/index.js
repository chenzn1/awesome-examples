const simpleGit = require('simple-git');
const {cp, rm} = require('fs/promises');
const { join } = require('path');
const prompts = require('prompts');

async function initNextJsProject(projectPath, framework) {
  await cp(join(__dirname, projectPath, framework === 'nextjs'? 'nextjs-prisma-graphql-example': 'express-sequelize-example'), join(__dirname, projectPath), {recursive: true})
  await rm(join(__dirname, projectPath, 'nextjs-prisma-graphql-example'), {recursive: true})
  await rm(join(__dirname, projectPath, 'express-sequelize-example'), {recursive: true})
  await rm(join(__dirname, projectPath, 'packages'), {recursive: true})
  await rm(join(__dirname, projectPath, 'pnpm-lock.yaml'))
}
async function main() {
  const response = await prompts([{
    type: 'text',
    name: 'path',
    message: 'What is your project path?',
  },{
    type: 'multiselect',
    name: 'framework',
    message: 'What is your project framework?',
    choices: [
      { title: 'Nextjs', value: 'nextjs' },
      { title: 'Express', value: 'express' }
    ],
  }]);
  // https://github.com/chenzn1/awesome-examples.git
  await simpleGit().clone('https://github.com/chenzn1/awesome-examples.git', response.path)
  await initNextJsProject(response.path, response.framework)
}
main()