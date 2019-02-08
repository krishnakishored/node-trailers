dbq
===

To query a database

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dbq.svg)](https://npmjs.org/package/dbq)
[![CircleCI](https://circleci.com/gh/kishore-d/dbq/tree/master.svg?style=shield)](https://circleci.com/gh/kishore-d/dbq/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/dbq.svg)](https://npmjs.org/package/dbq)
[![License](https://img.shields.io/npm/l/dbq.svg)](https://github.com/kishore-d/dbq/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dbq
$ dbq COMMAND
running command...
$ dbq (-v|--version|version)
dbq/0.0.0 darwin-x64 node-v9.6.1
$ dbq --help [COMMAND]
USAGE
  $ dbq COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dbq hello [FILE]`](#dbq-hello-file)
* [`dbq help [COMMAND]`](#dbq-help-command)
* [`dbq sql3 [FILE]`](#dbq-sql-3-file)

## `dbq hello [FILE]`

describe the command here

```
USAGE
  $ dbq hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ dbq hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/kishore-d/dbq/blob/v0.0.0/src/commands/hello.ts)_

## `dbq help [COMMAND]`

display help for dbq

```
USAGE
  $ dbq help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `dbq sql3 [FILE]`

describe the command here

```
USAGE
  $ dbq sql3 [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/sql3.ts](https://github.com/kishore-d/dbq/blob/v0.0.0/src/commands/sql3.ts)_
<!-- commandsstop -->
