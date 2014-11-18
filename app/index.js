'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var glob = require('glob');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var TaunusGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    this.log(yosay('That is the fanciest Taunus generator!'));
  },

  writing: {
    app: function () {
      var root = __dirname + '/templates';

      glob.sync(root + '/**/{,.}*').forEach(cp.bind(this));

      function cp (file) {
        if (fs.statSync(file).isDirectory()) {
          return;
        }
        var relative = path.relative(root, file);
        this.src.copy(relative, relative);
      }
    }
  },

  installDependencies: function () {
    this.npmInstall();
  },

  almostComplete: function () {
    this.log(yosay('Start the application using `npm start`!'));
  }
});

module.exports = TaunusGenerator;
