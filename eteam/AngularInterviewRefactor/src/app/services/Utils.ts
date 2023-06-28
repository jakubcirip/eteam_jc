declare var Swal: any;

export enum AlertTypes {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export class Utils {
  static async sendRequest(title: string, req: Promise<any>) {
    Swal.fire({
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await req;

      Swal.fire({
        icon: 'success',
        title,
        text: res.message,
      });

      return res;
    } catch (exp) {
      Swal.fire({
        icon: 'error',
        title,
        text: Utils.getErrorMessage(exp),
      });
    }

    return null;
  }

  static async sendRequestToast(title: string, req: Promise<any>) {
    Swal.showLoading();
    try {
      const res = await req;

      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
      });
      Toast.fire({
        icon: 'success',
        title: res.message,
      });

      return res;
    } catch (exp) {
      Swal.fire({
        icon: 'error',
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

  static getErrorMessage(exp) {
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
            msg += ' (' + error.results.errors[0].path[0].substring(2) + ')';
          } else {
            msg += ' (' + error.results.errors[0].path.substring(2) + ')';
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
      icon: type,
      title,
      html: message,
    });
  }
}
