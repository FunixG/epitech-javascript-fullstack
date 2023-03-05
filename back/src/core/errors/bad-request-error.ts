import {BadRequestException} from '@nestjs/common';
import TranslocoKeys from '../transloco-keys';

export default class BadRequestError extends BadRequestException {
  constructor(message: string = TranslocoKeys.BAD_REQUEST) {
    super(message);
  }
}
