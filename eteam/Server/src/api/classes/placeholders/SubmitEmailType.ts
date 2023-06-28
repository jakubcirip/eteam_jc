import {
  PlaceholderType,
  Placeholder,
} from '../../managers/PlaceholderManager';

import { Utils } from '../../../Utils';

export class SubmitEmailType implements PlaceholderType {
  name: string = 'submit';
  placeholders: Placeholder[];

  constructor() {
    this.placeholders = Utils.getAllMailPlaceholders();
  }
}
