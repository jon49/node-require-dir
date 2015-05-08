# node-require-dir

[![Build Status](https://secure.travis-ci.org/jviotti/node-require-dir.png?branch=master)](http://travis-ci.org/jviotti/node-require-dir)


## Installation

Install with npm:

```
npm install --save node-require-dir
```

## Example

```
var requiredir = require('node-require-dir');

var path = require('path');

var directory = requiredir(path.join(__dirname, 'directory'), function(name, module) {
  // Ommit json files
  if(path.extname(name) === '.json') return false;

  // Remove extension and append Controller
  return path.basename(name, path.extname(name)) + 'Controller';

  // Recursive
}, true);

console.log(directory);
// { firstController: {...}, otherControllers: { secondController: {...} }}

```

## API

### requiredir()

```
var result = requiredir(directoryName, namePredicate, recursive);
```

- **directoryName**: A string containing the name of the directory you want to include.
- **namePredicate**: A function that ommits a module if it returs false. It also lets you modify the module name as presented in the example.
- **recursive**: Whether to recursively recurse the contents of the directory;

## Testing

From the repo root:

```
npm install
npm test
```
