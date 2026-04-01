type GetHeaders = () => Promise<Record<string, string>>;

interface ApiClient {
  get<T>(path: string): Promise<{ data: T }>;
  post<T>(path: string, body?: unknown): Promise<{ data: T }>;
  put<T>(path: string, body?: unknown): Promise<{ data: T }>;
  patch<T>(path: string, body?: unknown): Promise<{ data: T }>;
  delete<T>(path: string): Promise<{ data: T }>;
}

async function _request<T>(
  baseURL: string,
  method: string,
  path: string,
  body: unknown | undefined,
  getHeaders: GetHeaders | undefined,
): Promise<{ data: T }> {
  const extraHeaders = getHeaders ? await getHeaders() : {};

  const headers: Record<string, string> = {
    ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    ...extraHeaders,
  };

  const response = await fetch(`${baseURL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data: T = await response.json();
  return { data };
}

export function createApi(baseURL: string, getHeaders?: GetHeaders): ApiClient {
  return {
    get<T>(path: string) {
      return _request<T>(baseURL, 'GET', path, undefined, getHeaders);
    },
    post<T>(path: string, body?: unknown) {
      return _request<T>(baseURL, 'POST', path, body, getHeaders);
    },
    put<T>(path: string, body?: unknown) {
      return _request<T>(baseURL, 'PUT', path, body, getHeaders);
    },
    patch<T>(path: string, body?: unknown) {
      return _request<T>(baseURL, 'PATCH', path, body, getHeaders);
    },
    delete<T>(path: string) {
      return _request<T>(baseURL, 'DELETE', path, undefined, getHeaders);
    },
  };
}
