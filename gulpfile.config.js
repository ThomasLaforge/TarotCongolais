'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './src/';
        this.sourceApp = './dist/';

        this.tsOutputPath = this.source + '/js';
        this.allJavaScript = [this.source + '/js/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts';
        this.allSass = this.source + '/sass/*.scss';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/main/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;