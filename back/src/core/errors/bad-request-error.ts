import {BadRequestException} from '@nestjs/common';
import TranslocoKeys from '../transloco-keys';

export default class BadRequestError extends BadRequestException {
  constructor() {
    super(TranslocoKeys.BAD_REQUEST);
  }
}
