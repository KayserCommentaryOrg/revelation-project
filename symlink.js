#!/usr/bin/env node

const { symlinkSync } = require('fs')

symlinkSync(process.argv[2], process.argv[3], 'dir')

console.log('Symlinked', process.argv[2], 'to', process.argv[3])
