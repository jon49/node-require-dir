# node-require-dir

[![Build Status](https://secure.travis-ci.org/jviotti/node-require-dir.png?branch=master)](http://travis-ci.org/jviotti/node-require-dir)

## Alternatives

After taking over this project I discovered
[`require-glob`](https://www.npmjs.com/package/require-glob).

It is recommended to use the above project. If you find any similar projects
let me know and I'll add them.

## Installation

Install with npm:

```
npm install --save node-require-dir
```

## Example

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

- **directoryName**: A string containing the name of the directory you want to
    include.
- **namePredicate**: (optional: identity) A function that ommits a module if it
    returns false. It also lets you modify the module name as presented in the example.
- **recursive**: (optional: false) Whether to recursively recurse the contents
    of the directory;

note that this function is not polymorphic, if you don't want to use a `predicate` but want to use
`recursive` you must pass an argument, like `null` or `_.identity`.

## Testing

From the repo root:

```
npm install
npm test
```

## Credits

This module was originally created and maintained by [Juan Cruz Viotti](https://www.npmjs.com/~jviotti).
