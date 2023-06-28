import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as prettier from 'prettier';

dotenv.config();

import { SQLManager } from '../src/api/managers/SQLManager';
import { LogManager } from '../src/api/managers/LogManager';

const hbar = Handlebars.compile(`
import { Column, Table } from "@wwwouter/typed-knex";

{{#each tables}}
@Table("{{ this.tableName }}")
export class {{ this.className }} {
    {{#each this.cols}}
    @Column({{{ this.colData }}})
    {{ this.colCamelCase }}: {{ this.colType }};
    {{/each}}
}
{{/each}}

`);

const sqlTypes = {
  string: [
    'nchar',
    'nvarchar',
    'varchar',
    'char',
    'tinytext',
    'text',
    'longtext',
    'mediumtext',
    'ntext',
    'varbinary',
    'uuid',
    'uniqueidentifier',
    'character varying',
    'bigint',
    'xml',
  ],
  number: [
    'tinyint',
    'int',
    'numeric',
    'integer',
    'real',
    'smallint',
    'decimal',
    'float',
    'double precision',
    'double',
    'dec',
    'fixed',
    'year',
    'serial',
    'bigserial',
    'int4',
    'money',
    'smallmoney',
  ],
  Date: [
    'datetime',
    'timestamp',
    'date',
    'time',
    'timestamp',
    'datetime2',
    'smalldatetime',
    'datetimeoffset',
  ],
  boolean: ['bit', 'boolean', 'bool'],
  Object: ['json', 'TVP'],
  buffer: ['binary', 'varbinary', 'image', 'UDT'],
};

const convertType = (sqlType: string) => {
  const res = Object.keys(sqlTypes).find((k) => {
    const vArr: string[] = sqlTypes[k];

    for (const v of vArr) {
      if (sqlType.includes(v)) {
        return true;
      }
    }

    return false;
  });

  return res;
};

const nameCapitalized = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const snakeToCamel = (str: string, firstUpperCase: boolean) => {
  const r = str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );

  return firstUpperCase ? nameCapitalized(r) : r;
};

const run = async () => {
  LogManager.log('Connecting to DB ..');
  SQLManager.getInstance();
  LogManager.log('Generating types ...');

  const [foreignKeys] = await SQLManager.knex.raw(
    "SELECT TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_SCHEMA = '" +
      process.env.MYSQL_DATABASE +
      "'"
  );

  const tablesRes = await SQLManager.knex.raw('SHOW TABLES');
  const tables = tablesRes[0].map(
    (t) => t[`Tables_in_${process.env.MYSQL_DATABASE}`]
  );

  const tablesArr = await Promise.all(
    tables.map(async (t) => {
      const [tableRes] = await SQLManager.knex.raw('DESC ' + t);

      const dependsOn = [];

      const colsArr = tableRes.map((c) => {
        const obj: any = {};

        obj.name = c.Field;

        if (c.Key === 'PRI') {
          obj.primary = true;
        }

        let type = convertType(c.Type);

        const fArr = foreignKeys.filter((fInfo) => fInfo.TABLE_NAME === t);
        if (fArr.length > 0) {
          const fData = fArr.find((fInfo) => fInfo.COLUMN_NAME === c.Field);

          if (fData) {
            if (!dependsOn.includes(fData.REFERENCED_TABLE_NAME)) {
              dependsOn.push(fData.REFERENCED_TABLE_NAME);
            }
            type = `Table${snakeToCamel(fData.REFERENCED_TABLE_NAME, true)}`;
          }
        }

        if (c.Null === 'YES') {
          type += ' | null';
        }

        return {
          colData: JSON.stringify(obj),
          colCamelCase: snakeToCamel(c.Field, false),
          colType: type,
        };
      });

      return {
        className: `Table${snakeToCamel(t, true)}`,
        tableName: `${t}`,
        cols: colsArr,
        dependsOn,
      };
    })
  );

  const recursiveSort = (
    baseArr: any[],
    newArr: any[] = [],
    filters: any[] = null,
    oldFilters: any[] = null,
    depth = 0
  ): any[] => {
    const newFilters = [];

    baseArr.forEach((t) => {
      if (!filters) {
        if (t.dependsOn.length === 0) {
          newArr.push(t);
          newFilters.push(t.tableName);
        }
      } else {
        if (
          !oldFilters.includes(t.tableName) &&
          !filters.includes(t.tableName)
        ) {
          const totalDependencies = t.dependsOn.length;
          const metDependencies = t.dependsOn.filter((d) => {
            return oldFilters.includes(d) || filters.includes(d);
          }).length;

          if (totalDependencies === metDependencies) {
            newFilters.push(t.tableName);
            newArr.push(t);
          }
        }
      }
    });

    if (newArr.length === baseArr.length || depth === 100) {
      return newArr;
    } else {
      if (!oldFilters) {
        oldFilters = [];
      } else {
        oldFilters = [...oldFilters, ...filters];
      }

      return recursiveSort(baseArr, newArr, newFilters, oldFilters, depth + 1);
    }
  };

  const sortedTablesArr = recursiveSort(tablesArr);

  const data = { tables: sortedTablesArr };
  const resFile = hbar(data);

  const resFilePath = path.join(__dirname, '../src/api/models/dbTypes.ts');

  await fs.writeFile(
    resFilePath,
    prettier.format(resFile, {
      parser: 'babel-ts',
      tabWidth: 2,
      trailingComma: 'es5',
      semi: true,
      singleQuote: true,
    })
  );

  LogManager.success('Done');
  process.exit(0);
};

run();
