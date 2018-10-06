const fs = require('fs')
const path = require('path')
const REPL = require('./lib/REPL')

// Library mode:
if (require.main !== module) {
  return REPL
}

const help = () => {
  console.error('Usage: rnode-repl <program.rho> [host] [port]')
  process.exit(1)
}

// CLI mode:
// Parse command-line arguments
if (process.argv.length < 2) {
  help()
}
if (process.argv[0].indexOf('rnode-repl') < 0) {
  process.argv.shift()
}
const file = process.argv[1] || help()
const host = process.argv[2] || 'localhost'
const port = process.argv[3] && parseInt(process.argv[3]) || 40404

// Get file contents
const program = fs.readFileSync(file, 'utf8')
if (!program.length) {
  console.error('File is empty or unreadable')
  return
}

// Run the program
const repl = new REPL(host, port)
repl.eval(program)
  .then(output => {
    console.log(output)
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
