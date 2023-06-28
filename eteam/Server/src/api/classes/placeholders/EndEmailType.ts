import {
  PlaceholderType,
  Placeholder,
} from '../../managers/PlaceholderManager';

import { Utils } from '../../../Utils';

export class EndEmailType implements PlaceholderType {
  name: string = 'end';
  placeholders: Placeholder[];

  constructor() {
    this.placeholders = Utils.getAllMailPlaceholders();
  }
}
