import ApiError from './entities/api-error';
import store from '../../components/global/store';
import { addCard } from '../../components/global/actions';

class ErrorHandler {
  static onNewErrorRequest(error: ApiError): void {
    if (error && error.message) {
      store.dispatch(addCard(Math.floor(Math.random() * 10000), error.message));
    }
  }

  static onNewError(message: string): void {
    store.dispatch(addCard(Math.floor(Math.random() * 10000), message));
  }
}

export default ErrorHandler;
