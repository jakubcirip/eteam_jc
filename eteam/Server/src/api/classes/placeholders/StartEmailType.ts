import {
  PlaceholderType,
  Placeholder,
} from '../../managers/PlaceholderManager';

import { Utils } from '../../../Utils';

export class StartEmailType implements PlaceholderType {
  name: string = 'start';
  placeholders: Placeholder[];

  constructor() {
    this.placeholders = Utils.getAllMailPlaceholders();
  }
}
