import { Error400 } from '../helpers/errors';

export enum TokensType {
  TINY,
  SMALL,
  MEDIUM,
  BIG,
  LARGE,
}

export class TokensPackage {
  type: TokensType;

  constructor(req: any, type: string) {
    if (type === 'tiny') {
      this.type = TokensType.TINY;
    } else if (type === 'small') {
      this.type = TokensType.SMALL;
    } else if (type === 'medium') {
      this.type = TokensType.MEDIUM;
    } else if (type === 'big') {
      this.type = TokensType.BIG;
    } else if (type === 'large') {
      this.type = TokensType.LARGE;
    } else {
      throw Error400(req, __('TokensPackage.notSupportedPackage'));
    }
  }

  getAmount(): number {
    switch (this.type) {
      case TokensType.TINY:
        return 10;
      case TokensType.SMALL:
        return 25;
      case TokensType.MEDIUM:
        return 60;
      case TokensType.BIG:
        return 125;
      case TokensType.LARGE:
        return 300;
    }
  }
}
