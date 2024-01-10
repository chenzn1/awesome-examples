const path = require('path')
 
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative('examples/nextjs-prisma-graphql-example', f))
    .join(' --file ')}`
 
module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}