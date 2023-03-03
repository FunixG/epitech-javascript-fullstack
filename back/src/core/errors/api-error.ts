import {HttpException, HttpStatus} from '@nestjs/common';
import TranslocoKeys from '../transloco-keys';

export default class ApiException extends HttpException {
  constructor() {
    super(TranslocoKeys.INTERNAL_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
