/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @Msg 未启用
 * cookie "include"<带上> | "omit"<忽略> | "same-origin"<同源>
 * credentials?: RequestCredentials;
 * */
interface FetchBaseConfig extends RequestInit {
  baseURL?: string;
  timeout?: number;
}
interface FetchRequest extends RequestInit {}
interface FetchResponse {
  readonly headers: HeadersInit;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<HeadersInit>;
  readonly type: ResponseType;
  readonly url: string;
  readonly contentType: string | null;
  readonly response: Response;
  readonly data: any;
}

type InterceptorsReqFunc = (config: FetchRequest) => FetchRequest;
type InterceptorsResFunc = (config: FetchResponse) => FetchResponse;
type InterceptorsFail = (error: Error | null) => Promise<Error>;
interface InterceptorsTypes {
  request: {
    use: (func?: InterceptorsReqFunc, fail?: InterceptorsFail) => void;
  };
  response: {
    use: (func?: InterceptorsResFunc, fail?: InterceptorsFail) => void;
  };
}

export default class Fetch {
  private defaultOptions: FetchRequest;
  public interceptors: InterceptorsTypes;
  public baseURL: URL | null;
  public timeout: number;
  private useReqFunc?: InterceptorsReqFunc;
  private useResFunc?: InterceptorsResFunc;
  private useReqFailFunc?: InterceptorsFail;
  private useResFailFunc?: InterceptorsFail;
  constructor(baseConf?: FetchBaseConfig) {
    this.defaultOptions = {
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'omit'
    };
    this.baseURL = null;
    this.timeout = 18000;
    this.InitDefaultOptions(baseConf);
    /** 周期钩子 */
    this.mountHook();
  }

  private InitDefaultOptions(baseConf?: FetchBaseConfig): void {
    if (!baseConf || typeof baseConf !== 'object' || !Object.keys(baseConf).length) return;
    /** timeout */
    if (baseConf.timeout && typeof baseConf.timeout === 'number') {
      this.timeout = baseConf.timeout;
    }
    /** baseURL */
    if (baseConf.baseURL) {
      try {
        this.baseURL = new URL(baseConf.baseURL);
      } catch (error) {
        throw new Error(error);
      }
    }
    Object.keys(baseConf).forEach((objKey) => {
      if (objKey === 'baseURL' || objKey === 'timeout') return;
      if (baseConf[objKey]) {
        this.defaultOptions[objKey] = baseConf[objKey];
      }
    });
  }

  /** @Method 处理钩子 */
  private mountHook(): void {
    this.interceptors = {
      request: {
        use: (func, fail) => {
          if (func && typeof func === 'function') {
            this.useReqFunc = func;
          }
          if (fail && typeof fail === 'function') {
            this.useReqFailFunc = fail;
          }
        }
      },
      response: {
        use: (func, fail) => {
          if (func && typeof func === 'function') {
            this.useResFunc = func;
          }
          if (fail && typeof fail === 'function') {
            this.useResFailFunc = fail;
          }
        }
      }
    };
  }

  /** @Method 合并参数 根据传入的参数 */
  private getOptions(userConf: FetchRequest, foceConf?: FetchRequest): FetchRequest {
    return Object.assign(this.defaultOptions, userConf, foceConf ? foceConf : {});
  }

  /** @Method 自定义响应体 */
  private async mergeResponse(response: Response): Promise<FetchResponse> {
    const result: FetchResponse = {
      type: response.type,
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      trailer: response.trailer,
      url: response.url,
      response: response,
      contentType: response.headers.get('content-type'),
      data: null
    };
    if (response.status === 200 && response.ok) {
      return { ...result, data: await this.transfromResponseData(response) };
    }
    if (response.status === 504) {
      throw new Error(await response.text());
    }
    return result;
  }

  /** @Method 根据fetch返回响应头标记的响应体body的类型处理数据 */
  private async transfromResponseData(response: Response): Promise<unknown> {
    try {
      let contentType = response.headers.get('content-type');
      let data: null | unknown = null;
      if (!contentType) {
        contentType = 'text/plain';
      }
      /** application\/json */
      if (/json/.test(contentType)) {
        data = await response.json();
      } else if (/text/.test(contentType)) {
        data = await response.text();
      } else if (/form/.test(contentType)) {
        data = await response.formData();
      }
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @Method uri 检测
   * @Return 如果没有带domain，则返回baseURL的域名
   * @Return 如果有domain直接返回
   * @Return 如果没有domain也没有baseURL，返回原始输入地址
   */
  private URLDomain(uri: string): URL {
    /** 1 判断传入uri是否是个可访问uri */
    let isDomain = false;
    let url: URL | null = null;
    try {
      url = new URL(uri);
      isDomain = true;
    } catch (error) {
      isDomain = false;
    }
    if (isDomain && url) {
      return url;
    }
    /** @origin 使用 baseURL 或者使用 location */
    let __domainURL__: URL | null = null;
    if (this.baseURL) {
      __domainURL__ = this.baseURL;
    } else if (window.location) {
      __domainURL__ = new URL(window.location.origin);
    } else {
      if (this.useReqFailFunc) {
        this.useReqFailFunc(new Error(`URL 不合法！${uri}`));
      }
      throw new Error('URL 不合法！' + uri);
    }
    /** domain */
    const __origin__ = __domainURL__.origin;
    let __pathname__ = __domainURL__.pathname;
    const __search__ = __domainURL__.searchParams.toString();
    if (__pathname__ === '/') {
      __pathname__ = '';
    }
    /** param */
    const _domainURL_ = new URL(uri, __origin__);
    let _pathname_ = _domainURL_.pathname;
    const _search_ = _domainURL_.searchParams.toString();
    if (_pathname_ === '/') {
      _pathname_ = '';
    }

    const pathname = __pathname__ + _pathname_;
    let search = '';
    search = __search__ ? `?${__search__}` : '';
    if (_search_) {
      search = search ? `${search}&${_search_}` : `?${_search_}`;
    }
    return new URL(__origin__ + pathname + search);
  }

  /** @Method get url 地址参数处理 */
  private paramsQuery(uri: string, params?: object): string {
    const url = this.URLDomain(uri);
    if (params && typeof params === 'object') {
      Object.keys(params).forEach((key) => {
        url.searchParams.set(key, params[key]);
      });
    }
    return url.href;
  }

  /** @Method 合并配置 和 强制配置属性合并 */
  private paramsBody(uri: string, body?: any): { __url__: string; __body__: BodyInit | null } {
    const url = this.URLDomain(uri);
    let __body__: BodyInit | null = null;
    if (body) {
      try {
        __body__ = JSON.stringify(body);
      } catch (error) {
        __body__ = body;
      }
    }
    return {
      __url__: url.href,
      __body__
    };
  }

  private fetchWithTimeout(uri: string, config: FetchRequest): Promise<Response> {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeOutPromise: Promise<Response> = new Promise((resolve, reject) => {
      setTimeout(() => {
        const timeoutResponse = new Response('timeout', {
          status: 504,
          statusText: 'timeout '
        });
        resolve(timeoutResponse);
        controller.abort();
      }, this.timeout);
    });
    const fetchPromise: Promise<Response> = fetch(uri, { ...config, signal });
    return Promise.race<Response>([timeOutPromise, fetchPromise]);
  }

  /** @Method 发起 fetch 请求 */
  private async request(uri: string, config: FetchRequest): Promise<FetchResponse> {
    /** 钩子 */
    let requestOptions = this.getOptions(config);
    if (this.useReqFunc) {
      requestOptions = this.useReqFunc(requestOptions);
    }
    let response: FetchResponse | Response = await this.fetchWithTimeout(uri, requestOptions);
    try {
      response = await this.mergeResponse(response);
      if (this.useResFunc) {
        response = await this.useResFunc(response);
      }
    } catch (error) {
      if (this.useResFailFunc) {
        await this.useResFailFunc(error);
      } else {
        throw new Error(error);
      }
    }
    return response as FetchResponse;
  }

  /** @Method GET */
  public get(uri: string, params?: object, config?: FetchRequest): Promise<FetchResponse> {
    const url = this.paramsQuery(uri, params);
    const conf = this.getOptions(config ? config : {}, {
      method: 'GET',
      body: null
    });
    return this.request(url, conf);
  }

  /** @Method POST */
  public post(uri: string, body?: any, config?: FetchRequest): Promise<FetchResponse> {
    const { __url__, __body__ } = this.paramsBody(uri, body);
    const conf = this.getOptions(config ? config : {}, {
      method: 'POST',
      body: __body__
    });
    return this.request(__url__, conf);
  }
}
