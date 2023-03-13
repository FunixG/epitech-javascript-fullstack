import { HttpException, HttpStatus } from '@nestjs/common';
import TranslocoKeys from '../transloco-keys';

export default class ApiException extends HttpException {
  constructor(message: string = TranslocoKeys.INTERNAL_ERROR) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
