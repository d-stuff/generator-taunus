'use strict';

var fs = require('fs');
var inflections = require('underscore.inflections');
var yeoman = require('yeoman-generator');

var TaunusGenerator = yeoman.generators.NamedBase.extend({
    init: function () {

        this.slugifiedName = this._.slugify(this.name);

        this.slugifiedPluralName = inflections.pluralize(this.slugifiedName);
        this.slugifiedSingularName = inflections.singularize(this.slugifiedName);

        this.camelizedPluralName = this._.camelize(this.slugifiedPluralName);
        this.camelizedSingularName = this._.camelize(this.slugifiedSingularName);

        this.classifiedPluralName = this._.classify(this.slugifiedPluralName);
        this.classifiedSingularName = this._.classify(this.slugifiedSingularName);

        this.humanizedPluralName = this._.humanize(this.slugifiedPluralName);
        this.humanizedSingularName = this._.humanize(this.slugifiedSingularName);
    },
    renderModule: function () {

        // Create module folders
        this.mkdir('views/' + this.slugifiedPluralName);
        this.mkdir('controllers/' + this.slugifiedPluralName);
        this.mkdir('client/js/controllers/' + this.slugifiedPluralName);

        // Render module files
        this.template('views/moduleName/index.jade', 'views/' + this.slugifiedPluralName + '/index.jade');
        this.template('controllers/moduleName/index.js', 'controllers/' + this.slugifiedPluralName + '/index.js');
        this.template('client/js/controllers/moduleName/index.jade', 'client/js/controllers/' + this.slugifiedPluralName + '/index.js');
    },
    renderRoute: function() {
        var routesFilePath = process.cwd() + '/controllers/routes.js';

        // If routes file exists we add a new state otherwise we render a new one
        if (fs.existsSync(routesFilePath)) {
            // Read the source routes file content
            var routesFileContent = this.readFileAsString(routesFilePath);

            // Append the new state
            routesFileContent = routesFileContent.replace('module.exports = [', this.engine(this.read('controllers/route.js'), this));

            // Save route file
            this.writeFileFromString(routesFileContent, routesFilePath);
        } else {
            this.template('controllers/routes.js', 'controllers/routes.js');
        }
    }
});

module.exports = TaunusGenerator;
