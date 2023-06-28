import {
  PlaceholderType,
  Placeholder,
} from '../../managers/PlaceholderManager';

import { CompanyNamePlaceholder } from './SharedEmailPlaceholders';
import { Utils } from '../../../Utils';

export class RegistrationEmailType implements PlaceholderType {
  name: string = 'registration';
  placeholders: Placeholder[];

  constructor() {
    this.placeholders = Utils.getAllMailPlaceholders();
  }
}
