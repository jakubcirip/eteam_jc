declare var Swal: any;

export enum AlertTypes {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export class Utils {
  static async sendRequest(title: string, req: Promise<any>) {
    const resFinal = await new Promise((res, rej) => {
      Swal.fire({
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      setTimeout(async () => {
        try {
          const res2 = await req;

          Swal.fire({
            type: 'success',
            title,
            text: res2.message,
          });

          res(res2);
        } catch (exp) {
          Swal.fire({
            type: this.getType(exp),
            title,
            text: Utils.getErrorMessage(exp),
          });
          res(null);
        }
      }, 100);
    });

    return resFinal;
  }

  static async sendRequestSilent(title: string, req: Promise<any>) {
    Swal.fire({
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const res = await req;

      Swal.close();
      return res;
    } catch (exp) {
      Swal.fire({
        type: this.getType(exp),
        title,
        text: Utils.getErrorMessage(exp),
      });
    }

    return null;
  }

  static async sendRequestFullSilent(title: string, req: Promise<any>) {
    Swal.close();
    try {
      const res = await req;

      return res;
    } catch (exp) {
      Swal.fire({
        type: this.getType(exp),
        title,
        text: Utils.getErrorMessage(exp),
      });
    }

    return null;
  }

  static async sendRequestToast(title: string, req: Promise<any>) {
    Swal.fire({
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const res = await req;

      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        type: 'success',
        title: res.message,
      });

      return res;
    } catch (exp) {
      Swal.fire({
        type: this.getType(exp),
        title,
        text: Utils.getErrorMessage(exp),
      });
    }

    return null;
  }

  static async sendRequestToastSilent(title: string, req: Promise<any>) {
    try {
      const res = await req;

      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        type: 'success',
        title: res.message,
      });

      return res;
    } catch (exp) {
      Swal.fire({
        type: this.getType(exp),
        title,
        text: Utils.getErrorMessage(exp),
      });
    }

    return null;
  }

  static getErrorTitle(exp) {
    if (!exp || !exp.details || !exp.message) {
      return 'Website error';
    }

    return exp.details.message;
  }

  static getErrorMessage(err: any): string {
    console.log(err);
    if (err.toString().includes('Failed to fetch')) {
      return 'Servers went down! Please try again later.';
    }

    if (
      err &&
      err.details &&
      err.details.message &&
      typeof err.details.message === 'string'
    ) {
      return err.details.message.toString();
    }

    if (err && err.message) {
      return err.message.toString();
    }

    // TODO: Insread of log, send it to some external API to keep track of errors
    console.log(err);

    return 'Unexpected error, our developres will take a look at this problem as soon as possible.';
  }

  // Do not use with new API
  static getErrorMessageDeprecated(exp) {
    if (exp.toString().includes('Failed to fetch')) {
      return 'Servers went down! Please try again later.';
    }
    console.log(exp);

    if (!exp || !exp.details || !exp.details.error) {
      return exp.toString();
    }

    const error: any = exp.details.error;

    if (error instanceof Object) {
      if (error.results && error.results.errors && error.results.errors[0]) {
        let msg = error.results.errors[0].message;

        if (
          error.results.errors[0].path &&
          error.results.errors[0].path.length !== 2
        ) {
          if (Array.isArray(error.results.errors[0].path)) {
            msg += ' (' + error.results.errors[0].path[0] + ')';
          } else {
            msg += ' (' + error.results.errors[0].path + ')';
          }
        }

        return msg;
      }
      return exp.details.message;
    }
    return exp.details.error;
  }

  static showAlert(type: AlertTypes, title: string, message: string) {
    Swal.fire({
      type,
      title,
      html: message,
    });
  }

  static getType(exp: any) {
    if (!exp || !exp.toString || !exp.toString()) {
      return 'error';
    }

    return exp.toString().includes('Failed to fetch') ? 'error' : 'warning';
  }
}
