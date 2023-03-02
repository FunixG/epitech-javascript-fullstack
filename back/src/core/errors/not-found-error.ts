import {NotFoundException} from '@nestjs/common';
import TranslocoKeys from '../transloco-keys';

export default class NotFoundError extends NotFoundException {
  constructor() {
    super(TranslocoKeys.ENTITY_NOT_FOUND);
  }
}
