declare var Swal: any;

export enum AlertTypes {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export class Utils {
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

  // static getErrorMessage(exp) {
  //   if (!exp || !exp.details || !exp.details.error) {
  //     return exp.toString();
  //   }

  //   const error: any = exp.details.error;

  //   if (error instanceof Object) {
  //     if (error.results && error.results.errors && error.results.errors[0]) {
  //       let msg = error.results.errors[0].message;

  //       if (
  //         error.results.errors[0].path &&
  //         error.results.errors[0].path.length !== 2
  //       ) {
  //         msg += ' (' + error.results.errors[0].path.substring(2) + ')';
  //       }

  //       return msg;
  //     }
  //     return exp.details.message;
  //   }
  //   return exp.details.error;
  // }

  static showAlert(type: AlertTypes, title: string, message: string) {
    Swal.fire({
      type,
      title,
      html: message,
    });
  }
}
