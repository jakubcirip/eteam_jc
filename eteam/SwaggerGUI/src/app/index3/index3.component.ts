import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { SwaggerService } from '../swagger.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

declare const monaco: any;

@Component({
  selector: 'app-index3',
  templateUrl: './index3.component.html',
  styleUrls: ['./index3.component.css'],
})
export class Index3Component implements OnInit, OnDestroy {
  subs = [];

  // types = [
  //   { value: 'get', viewValue: 'GET' },
  //   { value: 'post', viewValue: 'POST' },
  //   { value: 'put', viewValue: 'PUT' },
  //   { value: 'delete', viewValue: 'DELETE' },
  // ];

  // tags = [
  //   { value: 'admin', viewValue: 'Admin' },
  //   { value: 'admin2', viewValue: 'Admin 2' },
  // ];

  // guards = [
  //   { value: 'admin', viewValue: 'Admin Guard' },
  //   { value: 'admin2', viewValue: 'Client Guard' },
  // ];

  routeType: string;
  routePath: string;
  routeTag: string;
  routeFunc: string;
  routeAuth: string;
  routeDesc: string;

  responseIsBasic = true;
  responseType = 'object';
  responseEditorInit = false;
  responseEditor = null;

  routeFolderValue: string;
  routeFolderValue2: string;
  controllerNameValue: string;

  parameters = [];

  tagsOptions = [];
  guardsOptions = [];
  pathsOptions = [];
  funcOptions = [];

  parNamesDynamic = [];

  types = [
    { value: 'get', viewValue: 'GET' },
    { value: 'post', viewValue: 'POST' },
    { value: 'put', viewValue: 'PUT' },
    { value: 'delete', viewValue: 'DELETE' },
  ];

  parameterIn = [
    { value: 'body', viewValue: 'Body' },
    { value: 'path', viewValue: 'Path' },
    { value: 'header', viewValue: 'Header' },
  ];

  parameterType = [
    { value: 'string', viewValue: 'String' },
    { value: 'number', viewValue: 'Number' },
    { value: 'object', viewValue: 'Object' },
    // { value: 'array', viewValue: 'Array' },
  ];

  constructor(private swagger: SwaggerService, private snackBar: MatSnackBar) {}

  async ngOnInit() {
    await this.swagger.isReady();
    this.updateData();
    this.subs.push(
      this.swagger.onData.subscribe(() => {
        this.updateData();
      }),
    );
  }

  getExportObj() {
    if (!this.routeType) {
      throw new Error('Specify TYPE please');
    }
    if (!this.routePath) {
      throw new Error('Specify PATH please');
    }
    if (!this.routeTag) {
      throw new Error('Specify TAG please');
    }
    if (!this.routeFunc) {
      throw new Error('Specify FUNCTION NAME please');
    }
    if (!this.routeDesc) {
      throw new Error('Specify DESCRIPTION please');
    }
    if (!this.routeAuth) {
      throw new Error('Specify GUARD please');
    }

    if (!this.routeFolderValue) {
      throw new Error('Specify ROUTE FOLDER please');
    }
    if (!this.routeFolderValue2) {
      throw new Error('Specify ROUTE FILE please');
    }
    if (!this.controllerNameValue) {
      throw new Error('Specify CTRL NAME please');
    }

    if (!this.responseIsBasic && this.responseType === 'object') {
      const editor = this.responseEditor;
      const resObjTxt = editor.getValue();
      if (!resObjTxt) {
        throw new Error('Specify RESPONSE MODEL please');
      }
    }

    this.parameters.forEach((p, index) => {
      if (!p.in) {
        throw new Error('[P' + index + '] Specify PLACEMENT please');
      }

      if (!p.type) {
        throw new Error('[P' + index + '] Specify TYPE please');
      }

      if (p.in === 'path') {
        if (!p.name) {
          throw new Error('[P' + index + '] Specify NAME please');
        }
      }

      if (p.type === 'string') {
        if (!p.len) {
          throw new Error('[P' + index + '] Specify LENGTH please');
        }
      }

      if (p.type === 'number') {
        if (!p.numLen) {
          throw new Error('[P' + index + '] Specify LENGTH (n) please');
        }
      }

      if (p.type === 'object') {
        const parObjTxt = p.editor.getValue();
        if (!parObjTxt) {
          throw new Error('[P' + index + '] Specify MODEL please');
        }
      }
    });

    const isResBasic = this.responseIsBasic;
    const resObj = {
      isBasic: isResBasic,
      data: isResBasic
        ? null
        : {
            type: this.responseType,
            model:
              this.responseType !== 'object'
                ? null
                : this.responseEditor.getValue(),
          },
    };

    const expObj = {
      type: this.routeType,
      path: this.routePath,
      tag: this.routeTag,
      func: this.routeFunc,
      guard: this.routeAuth,
      desc: this.routeDesc,
      folder: this.routeFolderValue,
      file: this.routeFolderValue2,
      ctrl: this.controllerNameValue,
      res: resObj,
      params: this.parameters.map((p) => {
        const parObj = {
          in: p.in,
          type: p.type,
          req: p.required,
          data: {
            name: p.in !== 'path' ? null : p.name,
            strLen: p.type !== 'string' ? null : p.len,
            numLen: p.type !== 'number' ? null : p.numLen,
            model: p.type !== 'object' ? null : p.editor.getValue(),
          },
        };

        return parObj;
      }),
    };

    return expObj;
  }

  copyText(str: string) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  onExport() {
    try {
      this.getExportObj();
      const snackBarRef = this.snackBar.open(
        'Route exported.',
        'COPY COMMAND',
        {
          duration: 5000,
        },
      );

      snackBarRef.onAction().subscribe(() => {
        this.onExportCopy();
      });
    } catch (err) {
      this.snackBar.open(err, 'OK', {
        duration: 10000,
      });
    }
  }

  onExportCopy() {
    try {
      const o = this.getExportObj();
      console.log('Copy Object: ', o);
      const obj = JSON.stringify(o);
      console.log('Copy Parsed: ', obj);
      const txt = `yarn gen:route '${obj}' && yarn build:swagger`;
      console.log('Copy Command: ', txt);
      this.copyText(txt);

      const snackBarRef = this.snackBar.open('Route exported and copied.', '', {
        duration: 5000,
      });

      snackBarRef.onAction().subscribe(() => {
        alert('The snack-bar action was triggered!');
      });
    } catch (err) {
      this.snackBar.open(err, 'OK', {
        duration: 10000,
      });
    }
  }

  onRouteType(e) {
    this.routeType = e.value;
  }

  onParamType(par, e) {
    par.type = e.value;

    par._editorInit = false;
    par.editor = null;

    this.checkEditors();
  }

  checkEditors() {
    setTimeout(() => {
      this.parameters.forEach((p, index) => {
        if (p.type === 'object') {
          if (p._editorInit === false) {
            p._editorInit = true;

            const editor = monaco.editor.create(
              document.getElementById('editor_' + index),
              {
                value: ['const model = {', '  ', '}'].join('\n'),
                language: 'javascript',
                theme: 'vs-dark',
              },
            );

            p.editor = editor;
          }
        }
      });

      if (!this.responseEditorInit && this.responseType === 'object') {
        this.responseEditorInit = true;

        this.responseEditor = monaco.editor.create(
          document.getElementById('editor_response'),
          {
            value: ['const model = {', '  ', '}'].join('\n'),
            language: 'javascript',
            theme: 'vs-dark',
          },
        );
      }
    }, 1);
  }

  onParamPlacement(par, e) {
    par.in = e.value;
    if (e.value === 'body') {
      par.type = 'object';
      par.name = 'body';

      this.checkEditors();
      return;
    }
  }

  onAddParameter() {
    this.parameters.push({
      in: null,
      name: null,
      type: null,
      required: true,
      numLen: '0-2147483647',
      len: '1-128',
      _editorInit: false,
      editor: null,
    });
  }

  onTagChange(newData) {
    this.routeFolderValue = newData.toLowerCase();
    this.controllerNameValue = newData.toLowerCase() + 'Ctrl';
  }

  onParamName(par, e) {
    par.name = e.value;
    if (
      par.name &&
      (par.name.toLowerCase().includes('id') ||
        par.name.toLowerCase().includes('amount'))
    ) {
      par.type = 'number';
    } else {
      par.type = 'string';
    }
  }

  onParamLength(par, e) {
    par.len = e;
  }

  onParamNumLength(par, e) {
    par.numLen = e;
  }

  onParamRequired(par, e) {
    par.required = e.checked;
  }

  onResponseBasic(e) {
    this.responseIsBasic = e.checked;

    this.responseEditorInit = false;
    this.responseEditor = null;
    this.checkEditors();
  }

  onResponseType(e) {
    this.responseType = e.value;
    this.responseEditorInit = false;
    this.responseEditor = null;
    this.checkEditors();
  }

  onRouteFunc(newData) {
    this.routeFunc = newData;
    this.routeFolderValue2 = newData;
  }

  onRoutePath(newData) {
    this.routePath = newData;

    const arr = [];
    const leftB = newData.split('').filter((ch) => ch === '{').length;
    const rightB = newData.split('').filter((ch) => ch === '}').length;

    if (leftB === rightB) {
      const re = /{([a-zA-Z0-9]+)}/g;
      let m;
      const s = newData;

      do {
        m = re.exec(s);
        if (m && m[1]) {
          arr.push(m[1]);
        }
      } while (m);
    }

    this.parNamesDynamic = arr.map((p) => {
      return {
        value: p,
        viewValue: p,
      };
    });
    console.log(this.parNamesDynamic);
  }

  onRouteTag(newData) {
    this.routeTag = newData;
  }

  onRouteGuard(newData) {
    this.routeAuth = newData;
  }

  onParamDelete(i) {
    this.parameters.splice(i, 1);
  }

  onRouteDesc(e) {
    this.routeDesc = e.target.value.split('\n').join(' ');
  }

  updateData() {
    const data = this.swagger.data;
    this.parseTags(data);
    this.parseGuards(data);
    this.parsePaths(data);
    this.parseFunctions(data);
  }

  parseFunctions(data) {
    const funcArr = [];
    Object.keys(data.paths).forEach((k) => {
      const path = data.paths[k];

      Object.keys(path).forEach((typeK) => {
        const type = path[typeK];

        funcArr.push(type.operationId);
      });
    });

    this.funcOptions = funcArr;
  }

  parseTags(data) {
    const tags = data.tags.map((t) => {
      return t.name;
    });
    this.tagsOptions = tags;
  }

  parseGuards(data) {
    this.guardsOptions = ['None', ...Object.keys(data.securityDefinitions)];
  }

  parsePaths(data) {
    this.pathsOptions = Object.keys(data.paths);
  }

  ngOnDestroy() {
    this.subs.forEach((s) => {
      s.unsubscribe();
    });
  }
}
