import ApiError from './entities/api-error';

class ErrorHandler {
  // eslint-disable-next-line class-methods-use-this
  onNewErrorRequest(error: ApiError): void {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
}

export default ErrorHandler;
