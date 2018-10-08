const path = require('path')
const grpc = require('grpc')
const loader = require('@grpc/proto-loader')

const definitionPath = path.join(__dirname, 'proto', 'repl.proto')
const definition = loader.loadSync(definitionPath)
const proto = grpc.loadPackageDefinition(definition)

class REPL {
  constructor (host, port) {
    this.host = host || 'localhost'
    this.port = port || 40404

    const address = `${this.host}:${this.port}`
    const creds = grpc.credentials.createInsecure()
    this.client = new proto.coop.rchain.node.model.Repl(address, creds)
  }

  execute (command, args) {
    return new Promise((resolve, reject) => {
      this.client[command](args, (err, res) => {
        if (err) {
          if (typeof err === 'object' && 'code' in err && err.code === 12) {
            reject(new Error(
              'trying to run a REPL command on an grpcExternal port. ' +
              'REPL commands should be run on a grpcInternal port ' +
              '(default: 40404).'
            ))
          }
          reject(err)
          return
        }

        if (typeof res !== 'object' || !('output' in res) || !res.output) {
          res = typeof res === 'string' ? res : JSON.stringify(res)
          reject(res)
          return
        }

        resolve(res.output)
      })
    })
  }

  eval (program) {
    return this.execute('Eval', {program})
  }

  run (line) {
    return this.execute('Run', {line})
  }
}

module.exports = REPL
