import { NotFoundException } from '@nestjs/common';
import TranslocoKeys from '../transloco-keys';

export default class NotFoundError extends NotFoundException {
  constructor(message: string = TranslocoKeys.ENTITY_NOT_FOUND) {
    super(message);
  }
}
