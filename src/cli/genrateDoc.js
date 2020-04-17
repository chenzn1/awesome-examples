const swaggerCombine = require('swagger-combine')
const _ = require('lodash')
const fs = require('fs')

async function handle(params) {
  await main({
    outputFile: params.outputFile,
    inputFile: params.inputFile,
    host: params.host,
  })
}

module.exports = {
  handle,
  description: 'create local swagger doc',
  signature: 'generateDoc',
  params: {
    host: {
      alias: 'H',
      default: '127.0.0.1',
      description: 'please input host!!! example:localhost or 127.0.0.1 e:etc',
    },
    inputFile: {
      alias: 'i',
      default: '.',
      description: 'please write file input path!!! example:./ or ./src',
    },
    outputFile: {
      alias: 'o',
      default: './doc',
      description: 'please write file output path!!! example:./ or ./doc',
    },
  },
}

async function main(argv) {
  const { host, inputFile, outputFile } = argv

  const swaggerJson = await swaggerCombine(inputFile)
  // transform swaggerJson
  swaggerJson.host = host
  // add schema prefix to the summary of each path
  Object.keys(swaggerJson.paths).forEach(path => {
    const routes = swaggerJson.paths[path]
    // get schema
    const schema = routes['x-auth-schema'].join(',')

    Object.keys(routes).forEach(method => {
      const route = routes[method]
      if (route.summary) {
        route.summary = `${schema} - ${route.summary}`
      }
    })
  })

  const transformedSwaggerDoc = JSON.stringify(swaggerJson, null, 2)
  if (transformedSwaggerDoc) {
    if (outputFile) {
      fs.writeFileSync(outputFile, transformedSwaggerDoc, { encoding: 'utf-8' })
      console.log(`Successfully write doc to file - ${outputFile}`)
    } else {
      console.log(transformedSwaggerDoc)
    }
  }
}

function parseArgs() {
  // parse arguments - simple version
  const args = process.argv
  // pop first 2 args
  args.shift()
  args.shift()

  const argMap = {}
  for (let i = 0; i < args.length; i += 2) {
    switch (args[i]) {
      case '--host':
      case '-h':
        argMap['host'] = args[i + 1]
        break
      case '--output':
      case '-o':
        argMap['outputFile'] = args[i + 1]
        break
      case '--input':
      case '-i':
        argMap['inputFile'] = args[i + 1]
        break
      default:
        break
    }
  }
  return argMap
}

if (!module.parent) {
  const args = parseArgs()
  handle(args)
}
