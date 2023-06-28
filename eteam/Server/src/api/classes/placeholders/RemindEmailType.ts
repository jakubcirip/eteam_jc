import {
  PlaceholderType,
  Placeholder,
} from '../../managers/PlaceholderManager';

import { Utils } from '../../../Utils';

export class RemindEmailType implements PlaceholderType {
  name: string = 'remind';
  placeholders: Placeholder[];

  constructor() {
    this.placeholders = Utils.getAllMailPlaceholders();
  }
}
