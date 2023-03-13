import ApiEntity from './entities/api-entity';
import ErrorHandler from './error-handler';
import ApiError from './entities/api-error';
import RequestInterface from './entities/request-interface';

abstract class CrudService<ENTITY extends ApiEntity> {
  protected readonly domain: string;

  public readonly errorHandler: ErrorHandler = new ErrorHandler();

  private readonly apiHeader = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${CrudService.getBearerToken()}`,
  };

  protected constructor(private readonly path: string) {
    if (!path.endsWith('/')) {
      throw Error('The path passed in parameter is not valid. It need to be ended by /');
    }
    const domain: string | undefined = process.env.REACT_APP_API_URL || 'https://epitech-api.funixgaming.fr/';
    if (!domain || !domain.endsWith('/')) {
      throw Error('The domain passed in env is not valid. It need to be ended by /');
    }
    this.domain = domain;
  }

  async getAll(): Promise<ENTITY[] | undefined> {
    const response = await fetch(this.domain + this.path);

    return CrudService.handleRequest<ENTITY[]>(response);
  }

  async getById(id: number): Promise<ENTITY | undefined> {
    const response = await fetch(`${this.domain + this.path}${id}`);

    return CrudService.handleRequest<ENTITY>(response);
  }

  async createEntity(request: ENTITY): Promise<ENTITY | undefined> {
    const response = await fetch(this.domain + this.path, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: this.apiHeader,
    });

    return CrudService.handleRequest<ENTITY>(response);
  }

  async updateEntity(request: ENTITY): Promise<ENTITY | undefined> {
    const response = await fetch(this.domain + this.path, {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: this.apiHeader,
    });

    return CrudService.handleRequest<ENTITY>(response);
  }

  async deleteEntity(id: number): Promise<void> {
    const response = await fetch(`${this.domain + this.path}${id}`, {
      method: 'DELETE',
      headers: this.apiHeader,
    });

    return CrudService.handleRequest<void>(response);
  }

  async postCustomPath<RESPONSE>(
    pathToAdd: string,
    request: RequestInterface,
  ): Promise<RESPONSE | undefined> {
    const response = await fetch(`${this.domain + this.path + pathToAdd}`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: this.apiHeader,
    });

    return CrudService.handleRequest<RESPONSE>(response);
  }

  async getCustomPath<RESPONSE>(
    pathToAdd: string,
  ): Promise<RESPONSE | undefined> {
    const response = await fetch(`${this.domain + this.path + pathToAdd}`, {
      method: 'GET',
      headers: this.apiHeader,
    });

    return CrudService.handleRequest<RESPONSE>(response);
  }

  private static getBearerToken(): string {
    const token: string | null = localStorage.getItem('auth-js-epitech-token');

    if (token === null || token.length === 0) {
      return '';
    }
    return token;
  }

  private static async handleRequest<T>(response: Response): Promise<T | undefined> {
    if (response.ok) {
      return await response.json() as Promise<T>;
    }
    const errorResponse: Promise<ApiError> = await response.json() as Promise<ApiError>;
    ErrorHandler.onNewErrorRequest(await errorResponse);
    return undefined;
  }
}

export default CrudService;
