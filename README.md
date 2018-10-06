# repl

**Node.js based RNode REPL interface.**

This package enabled applications to use the interal gRPC interface of the
[RChain](http://rchain.coop/) RNode server to execute Eval and Run commands.


## Library usage

Install using NPM:

```shell
npm i @rchain-community/repl
```

Usage:

```js
const REPL = require('@rchain-community/repl')

const repl = new REPL(host, port)
repl.eval(myRholangCode)
  .then(output => {
    console.log(output)
  })
  .catch(err => {
    console.log(err)
  })
```

## CLI usage

You can also use this package as a CLI script to execute Rholang programs.

In order to do so, first install it globally:

```shell
npm i -g @rchain-community/repl
```

Usage:

```shell
rnode-repl <program.rho> [host] [port]
```
