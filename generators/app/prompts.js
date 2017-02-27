'use strict'

const path = require('path')
const util = require('./util')

module.exports = function (self){
  return [
    {
      type: 'input',
      name: 'name',
      message: 'Please choose your application name',
      default: path.basename(process.cwd())
    },
    {
      name: 'version',
      default: '0.1.0',
      message: 'version'
    },
    {
      name: 'description',
      default: 'vue 2.~ project',
      message: 'description'
    },
    {
      name: 'repo',
      default: util.getGitOrigin(),
      message: 'git repository'
    },
    {
      name: 'keywords',
      default: 'vue 2.~ project',
      message: 'keywords',
      filter: function (words) {
        return words.split(/\s*,\s*/g);
      }
    },
    {
      name: 'author',
      default: self.user.git.name(),
      message: 'author'
    },
    {
      name: 'email',
      default: self.user.git.email(),
      message: 'E-Mail'
    }
  ]
}
