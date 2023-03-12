import RequestInterface from './request-interface';

abstract class ApiEntity extends RequestInterface {
  id?: number;

  createdAt?: Date;

  updatedAt?: Date;
}

export default ApiEntity;
