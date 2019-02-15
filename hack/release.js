if (process.versions.node.startsWith('6')) {
  console.info(`semantic-release is not supported in node ${process.version}`)
  process.exit(0)
}

require('semantic-release')()
