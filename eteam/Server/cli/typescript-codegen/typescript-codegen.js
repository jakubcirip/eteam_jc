var fs = require('fs');
var CodeGen = require('swagger-typescript-codegen').CodeGen;

var file = 'public/swagger.json';
var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
var tsSourceCode = CodeGen.getTypescriptCode({
  className: 'a',
  swagger: swagger,
  imports: ['../../typings/tsd.d.ts'],
  template: {
    class: fs.readFileSync('cli/typescript-codegen/class.mustache', 'utf-8'),
    method: fs.readFileSync('cli/typescript-codegen/method.mustache', 'utf-8'),
    type: fs.readFileSync('cli/typescript-codegen/type.mustache', 'utf-8'),
  },
});
console.log(tsSourceCode);
