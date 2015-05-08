/// <reference path="./typings/typings.d.ts" />
/*! node-require-dir v0.0.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */

import path = require('path')
import _ = require('lodash')

var fs = require('fs-plus')

/**
 * Abstract failures
 *
 * @param {String} reason
 * @api private
 */
var fail = function(reason) {
  throw new Error(reason)
}

/**
 * Require a directory
 *
 * @param {String} dir
 * @param {Function} predicate
 * @param {Boolean} recursive
 * @api public
 */
var requiredir = (dir: string, predicate: (fileName: string) => string = _.identity, recursive = false): any => {

    if(!fs.existsSync(dir))
        fail(dir + ' doesn\'t exists')

    if(!fs.isDirectorySync(dir))
        fail(dir + ' is not a directory')

    var predicate_ = _.isFunction(predicate)? predicate: _.identity
    var directoryList = fs.readdirSync(dir)

    return _.reduce(directoryList, function(modules, file: string) {
        file = path.join(dir, file)

        if(fs.isDirectorySync(file) && recursive) {

            // Recursive call
            var directoryBasename = path.basename(file)
            modules[directoryBasename] = requiredir(file, predicate_, recursive)

        } else {

            var fileBasename = predicate_(path.basename(file))

            // If predicate returns false, file is ommited
            if(!fileBasename) return modules

            var module = require(path.relative(__dirname, file))
            modules[fileBasename] = module

        }

        return modules
    }, {})
}

export = requiredir