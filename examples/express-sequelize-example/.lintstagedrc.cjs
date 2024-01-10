const path = require('path')
 
const buildEslintCommand = (filenames) => 
  `eslint --fix ${filenames
    .map((f) => path.relative('examples/express-sequelize-example', f))
    .join(' ')}`
module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}