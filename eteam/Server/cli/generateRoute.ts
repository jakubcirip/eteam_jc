import * as path from 'path';
import * as fs from 'fs-extra';
import * as prettier from 'prettier';
import { LogManager } from '../src/api/managers/LogManager';

const swaggerFolder = path.join(__dirname, '../swagger');

const modelCodeToObject = (str: string) => {
  let modelObj = null;

  try {
    modelObj = eval(`${str} model;`);
  } catch (err) {
    try {
      modelObj = eval(`${str}; model;`);
    } catch (err2) {
      return modelObj;
    }
  }

  return modelObj;
};

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const generateSwaggerObject = (obj: any) => {
  let type: string = typeof obj;

  if (type === 'object') {
    if (obj.constructor === Object) {
      try {
        if (Object(obj) === obj) {
          type = 'object';
        }
      } catch (err) {
        type = 'array';
      }
    } else {
      type = 'array';
    }
  }

  if (type === 'object') {
    const keys = Object.keys(obj);
    const prop = {};
    keys.forEach((k) => {
      prop[k] = generateSwaggerObject(obj[k]);
    });

    return {
      type: 'object',
      required: keys,
      properties: prop,
    };
  } else if (type === 'string') {
    return {
      type: 'string',
    };
  } else if (type === 'number') {
    return {
      type: 'number',
    };
  } else if (type === 'boolean') {
    return {
      type: 'boolean',
    };
  } else if (type === 'array') {
    const itemDef = obj[0];
    return {
      type: 'array',
      items: generateSwaggerObject(itemDef),
    };
  }

  return null;
};

const addGuard = async (data) => {
  const defaultsAuthObj = JSON.parse(
    (
      await fs.readFile(path.join(swaggerFolder, 'defaults', 'auth.json'))
    ).toString()
  );

  if (!defaultsAuthObj[data.guard]) {
    LogManager.info('[A] Adding Auth Guard ..');

    defaultsAuthObj[`${capitalize(data.guard)}Guard`] = {
      type: 'basic',
    };

    await fs.writeFile(
      path.join(swaggerFolder, 'defaults', 'auth.json'),
      JSON.stringify(defaultsAuthObj, null, 2)
    );
    LogManager.success('[A] Auth Guard Added');
  } else {
    LogManager.log('[A] Auth Guard Already Exists');
  }
};

const addPath = async (data) => {
  const filePath = path.join(swaggerFolder, 'defaults', 'paths.json');
  const obj = JSON.parse((await fs.readFile(filePath)).toString());

  LogManager.info('[P] Adding Path ..');

  if (!obj[data.path]) {
    obj[data.path] = {};
  }

  if (obj[data.path][data.type]) {
    LogManager.error('[P] Path Already Exists');
    return;
  }

  obj[data.path][data.type] = {
    $ref: `~/routes/${data.folder}/${data.file}.json`,
  };

  await fs.writeFile(filePath, JSON.stringify(obj, null, 2));
  LogManager.success('[P] Path Added');
};

const addTag = async (data) => {
  const filePath = path.join(swaggerFolder, 'defaults', 'tags.json');
  const obj = JSON.parse((await fs.readFile(filePath)).toString());

  const alreadyExists = obj.tags.find((t) => t.name === data.tag);

  if (!alreadyExists) {
    LogManager.info('[T] Adding Tag ..');

    obj.tags.push({
      name: data.tag,
      description: `${data.tag} Actions`,
    });
    await fs.writeFile(filePath, JSON.stringify(obj, null, 2));

    LogManager.success('[T] Tag Added');
  } else {
    LogManager.log('[T] Tag Already Exists');
  }
};

const addRoute = async (data) => {
  const filePath = path.join(
    swaggerFolder,
    'routes',
    data.folder,
    `${data.file}.json`
  );

  LogManager.info('[R] Adding Route ..');

  await fs.ensureDir(path.join(filePath, '..'));

  const alreadyExists = await fs.pathExists(filePath);

  if (alreadyExists) {
    LogManager.error('[R] Route Already Exists');
    return;
  }

  const obj: any = {
    tags: [data.tag],
    summary: data.desc,
    operationId: data.func,
    'x-swagger-router-controller': data.ctrl,
    security: [{}],
  };

  if (data.guard !== 'None') {
    obj.security[0][`${capitalize(data.guard)}Guard`] = [];
  }

  if (data.params.length > 0) {
    obj.parameters = data.params.map((p) => {
      const name = p.in === 'body' ? 'body' : p.data.name;

      if (p.type === 'object') {
        return {
          in: p.in,
          name,
          required: p.req,
          schema: {
            $ref: `~/models/${data.folder}.json#/${capitalize(
              data.func
            )}Param${capitalize(name)}`,
          },
        };
      } else if (p.type === 'string') {
        const len = p.data.strLen.split('-');
        return {
          in: p.in,
          name,
          required: p.req,
          type: p.type,
          minLength: +len[0],
          maxLength: +len[1],
        };
      } else if (p.type === 'number') {
        const len = p.data.numLen.split('-');
        return {
          in: p.in,
          name,
          required: p.req,
          type: p.type,
          minimum: +len[0],
          maximum: +len[1],
        };
      } else if (p.type === 'boolean') {
        return {
          in: p.in,
          name,
          required: p.req,
          type: p.type,
        };
      }
    });
  }

  obj.responses = {
    '200': {
      description: 'Success',
    },
    '400': {
      $ref: '~/defaults/errors.json#/400',
    },
    '500': {
      $ref: '~/defaults/errors.json#/500',
    },
    default: {
      $ref: '~/defaults/errors.json#/default',
    },
  };

  if (data.res.isBasic) {
    obj.responses['200'].schema = {
      $ref: '~/models/responses.json#/BasicResponse',
    };
  } else {
    obj.responses['200'].schema = {
      $ref: `~/models/${data.folder}.json#/${capitalize(data.func)}Response`,
    };
  }

  await fs.writeFile(filePath, JSON.stringify(obj, null, 2));
  LogManager.success('[P] Path Added');
};

const addModels = async (data) => {
  const filePath = path.join(swaggerFolder, 'models', `${data.folder}.json`);
  let obj = {};

  const fileExists = await fs.pathExists(filePath);
  if (fileExists) {
    obj = JSON.parse((await fs.readFile(filePath)).toString());
  }

  const promises = data.params.map(async (p, index) => {
    await addParameterModel(data, p, obj, index);
  });

  await Promise.all([addResponseModel(data, obj), ...promises]);

  await fs.writeFile(filePath, JSON.stringify(obj, null, 2));
};

const addParameterModel = async (data, p, obj, i) => {
  const name = p.in === 'body' ? 'body' : p.data.name;

  if (obj[`${capitalize(data.func)}Param${capitalize(name)}`]) {
    LogManager.error('[PM' + i + '] Parameter Model Already Exists');
    return;
  }

  LogManager.info('[PM' + i + '] Adding Parameter Model ..');

  if (p.type === 'number') {
    const [min, max] = p.data.numLen.split('-');
    obj[`${capitalize(data.func)}Param${capitalize(name)}`] = {
      type: 'number',
      minimum: +min,
      maximum: +max,
    };
  } else if (p.type === 'string') {
    const [min, max] = p.data.strLen.split('-');
    obj[`${capitalize(data.func)}Param${capitalize(name)}`] = {
      type: 'string',
      minLength: +min,
      maxLength: +max,
    };
  } else if (p.type === 'object') {
    const modelObj = modelCodeToObject(p.data.model);
    if (!modelObj) {
      LogManager.error('[PM' + i + '] Model Is Not Valid');
      return;
    }

    obj[
      `${capitalize(data.func)}Param${capitalize(name)}`
    ] = generateSwaggerObject(modelObj);
  } else {
    LogManager.error('[PM' + i + '] Wrong Parameter Type ' + p.type);
  }
  LogManager.success('[PM' + i + '] Parameter Model Added');
};

const addResponseModel = async (data, obj) => {
  if (data.res.isBasic) {
    LogManager.log('[RM] Response Model Is Basic');
    return;
  }

  if (obj[`${capitalize(data.func)}Response`]) {
    LogManager.error('[RM] Response Model Already Exists');
    return;
  }

  LogManager.info('[RM] Adding Response Model ..');

  if (data.res.data.type !== 'object') {
    obj[`${capitalize(data.func)}Response`] = {
      type: data.res.data.type,
    };
  } else {
    const modelObj = modelCodeToObject(data.res.data.model);
    if (!modelObj) {
      LogManager.error('[RM] Model Is Not Valid');
      return;
    }

    obj[`${capitalize(data.func)}Response`] = generateSwaggerObject(modelObj);
  }

  LogManager.success('[RM] Response Model Added');
};

const addGuardCode = async (data) => {
  const obj = JSON.parse(
    (
      await fs.readFile(path.join(swaggerFolder, 'defaults', 'auth.json'))
    ).toString()
  );

  LogManager.info('[TS_G] Adding Auth Guard ..');

  const ApiFilePath = path.join(swaggerFolder, '../src/api/api.ts');

  const ApiFile = (await fs.readFileSync(ApiFilePath)).toString();

  const re = /app\.use\(\s*middleware.swaggerSecurity\(({[\s\S]*})\)\s*\);/g;
  const regRes = re.exec(ApiFile);
  const foundRegex = regRes[1];
  let apiObj = regRes[1];

  if (apiObj.includes(`${capitalize(data.guard)}Guard`)) {
    LogManager.log('[TS_G] Auth Guard Already Exists (TS)');
    return;
  }

  if (apiObj === '{}') {
    apiObj = `{ ${capitalize(data.guard)}Guard }`;
  } else {
    const apiObjArr = apiObj.split('}');
    if (
      apiObjArr[0]
        .split(' ')
        .join('')
        .split('\n')
        .join('')
        .split('\r')
        .join('')
        .endsWith(',')
    ) {
      apiObjArr.push(`${capitalize(data.guard)}Guard`);
    } else {
      apiObjArr.push(`, ${capitalize(data.guard)}Guard`);
    }

    apiObj = apiObjArr.join('') + '}';
  }

  const ApiFileRes = `
    import { ${capitalize(
      data.guard
    )}Guard } from './helpers/auth'; \n${ApiFile.split(foundRegex).join(
    `${apiObj}`
  )}`;

  await fs.writeFile(
    ApiFilePath,
    prettier.format(ApiFileRes, {
      parser: 'babel-ts',
      tabWidth: 2,
      trailingComma: 'es5',
      semi: true,
      singleQuote: true,
    })
  );

  const GuardFilePath = path.join(swaggerFolder, '../src/api/helpers/auth.ts');

  const GuardFile = (await fs.readFileSync(GuardFilePath)).toString();
  const GuardFileRes = `${GuardFile}\n
export const ${capitalize(
    data.guard
  )}Guard = async (req, def, scopes, callback) => {
  if (!req.session['${capitalize(data.guard)}Guard']) {
    callback(Error401(req));
    return;
  }

  return callback();
};`;
  await fs.writeFile(
    GuardFilePath,
    prettier.format(GuardFileRes, {
      parser: 'babel-ts',
      tabWidth: 2,
      trailingComma: 'es5',
      semi: true,
      singleQuote: true,
    })
  );

  LogManager.success('[TS_G] Auth Guard Added');
};

const addCtrlCode = async (data) => {
  const apiPath = path.join(swaggerFolder, '../src/api');
  await fs.ensureDir(path.join(apiPath, 'controllers'));

  const ctrlFile = path.join(apiPath, 'controllers', `${data.ctrl}.ts`);

  let ctrlTxt;

  if (await fs.pathExists(ctrlFile)) {
    ctrlTxt = (await fs.readFile(ctrlFile)).toString();
  } else {
    ctrlTxt = `import { handleRequest, fromSwagger } from '../helpers/utils';
import { ${data.tag}Service } from '../services/${data.tag}Service';
`;
  }

  if (ctrlTxt.includes(`export const ${data.func}`)) {
    LogManager.error('[TS_CTRL] Controller Function Already Exists');
    return;
  }
  LogManager.log('[TS_CTRL] Generating Controller Function ..');

  const paramNames = data.params.map((p) => {
    return p.in === 'body' ? 'body' : p.data.name;
  });

  const paramArr = data.params.map((p) => {
    const name = p.in === 'body' ? 'body' : p.data.name;
    return `  const ${name}: ${capitalize(data.func)}Param${capitalize(
      name
    )} = fromSwagger(httpData, '${name}');`;
  });

  data.params.forEach((p) => {
    const name = p.in === 'body' ? 'body' : p.data.name;
    ctrlTxt = `import { ${capitalize(data.func)}Param${capitalize(
      name
    )} } from '../models/swaggerTypes';
${ctrlTxt};`;
  });

  ctrlTxt = `${ctrlTxt}\n\n

export const ${data.func} = async (...httpData) => {
${paramArr.join('\n')}
  await handleRequest(httpData, ${data.tag}Service.${data.func}${
    paramNames.length > 0 ? ', ' : ''
  } ${paramNames.join(', ')});
};\n
`;

  await fs.writeFile(
    ctrlFile,
    prettier.format(ctrlTxt, {
      parser: 'babel-ts',
      tabWidth: 2,
      trailingComma: 'es5',
      semi: true,
      singleQuote: true,
    })
  );

  LogManager.success('[TS_CTRL] Controller Function Generated');
};

const addServiceCode = async (data) => {
  const apiPath = path.join(swaggerFolder, '../src/api');
  await fs.ensureDir(path.join(apiPath, 'services'));

  const serviceFile = path.join(apiPath, 'services', `${data.tag}Service.ts`);

  let serviceText;

  if (await fs.pathExists(serviceFile)) {
    serviceText = (await fs.readFile(serviceFile)).toString();
  } else {
    serviceText = `import { BasicResponse } from '../models/swaggerTypes';
export class ${data.tag}Service {

}`;
  }

  if (serviceText.includes(`static async ${data.func}`)) {
    LogManager.error('[TS_SRVC] Service Already Exists');
    return;
  }
  LogManager.log('[TS_SRVC] Generating Service ..');

  const re = /(export class .+ {)/g;
  const regRes = re.exec(serviceText);
  const classDefLine = regRes[1];

  const serviceArr = serviceText.split(classDefLine);

  const importArr = [];

  const parArr = data.params.map((p) => {
    const name = p.in === 'body' ? 'body' : p.data.name;
    const type = `${capitalize(data.func)}Param${capitalize(name)}`;

    importArr.push(type);

    return `${name}: ${type}`;
  });

  const importLines = importArr
    .filter((i) => {
      const importRe = new RegExp(
        `import {\s*${i}\s*} from '..\/models\/swaggerTypes';`
      );
      const isThere = importRe.exec(serviceText);
      if (isThere) {
        return false;
      }

      return true;
    })
    .map((i) => {
      return `import { ${i} } from '../models/swaggerTypes';`;
    });

  if (importLines.length > 0) {
    serviceArr[0] = `${importLines.join('\n')}
${serviceArr[0]}`;
  }

  if (!data.res.isBasic) {
    serviceArr[0] = `import { ${capitalize(
      data.func
    )}Response } from '../models/swaggerTypes';

${serviceArr[0]}`;
  }

  serviceArr[0] = `${serviceArr[0]}${classDefLine}
  static async ${data.func}(req: any${
    parArr.length > 0 ? ',' : ''
  } ${parArr.join(', ')}): Promise<${
    data.res.isBasic ? 'BasicResponse' : `${capitalize(data.func)}Response`
  }> {
    // TODO: Implenent ${data.func} function
  }\n
`;

  const serviceRes = serviceArr.join('');

  await fs.writeFile(
    serviceFile,
    prettier.format(serviceRes, {
      parser: 'babel-ts',
      tabWidth: 2,
      trailingComma: 'es5',
      semi: true,
      singleQuote: true,
    })
  );

  LogManager.success('[TS_SRVC] Service Generated');
};

(async () => {
  const data = JSON.parse(process.argv[2]);
  LogManager.log('------- SWAGGER -------');

  if (data.guard !== 'None') {
    await addGuard(data);
  }
  await addPath(data);
  await addTag(data);
  await addRoute(data);
  await addModels(data);

  LogManager.log('------- TYPESCRIPT -------');
  if (data.guard !== 'None') {
    await addGuardCode(data);
  }
  await addCtrlCode(data);
  await addServiceCode(data);
})();
