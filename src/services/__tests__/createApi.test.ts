import { createApi } from '../createApi';

const mockFetch = jest.fn();
global.fetch = mockFetch;

function mockResponse(body: unknown, status = 200) {
  mockFetch.mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: () => Promise.resolve(body),
  });
}

describe('createApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('calls fetch with the correct full URL', async () => {
      mockResponse({ id: 1 });

      const api = createApi('https://api.example.com');
      await api.get('/users');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({ method: 'GET' }),
      );
    });

    it('returns { data } from the response body', async () => {
      mockResponse([{ id: 1 }]);

      const api = createApi('https://api.example.com');
      const result = await api.get<{ id: number }[]>('/users');

      expect(result.data).toEqual([{ id: 1 }]);
    });

    it('does not send Content-Type on a bodyless request', async () => {
      mockResponse({});

      const api = createApi('https://api.example.com');
      await api.get('/users');

      const headers = mockFetch.mock.calls[0][1].headers;
      expect(headers['Content-Type']).toBeUndefined();
    });

    it('does not send a body', async () => {
      mockResponse({});

      const api = createApi('https://api.example.com');
      await api.get('/users');

      expect(mockFetch.mock.calls[0][1].body).toBeUndefined();
    });

    it('throws on a non-2xx response', async () => {
      mockResponse({ message: 'Not Found' }, 404);

      const api = createApi('https://api.example.com');

      await expect(api.get('/users')).rejects.toThrow('HTTP 404');
    });
  });

  describe('post', () => {
    it('calls fetch with the correct full URL and POST method', async () => {
      mockResponse({ id: 1 });

      const api = createApi('https://api.example.com');
      await api.post('/users', { name: 'Alice' });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({ method: 'POST' }),
      );
    });

    it('serialises the body as JSON', async () => {
      mockResponse({ id: 1 });

      const api = createApi('https://api.example.com');
      await api.post('/users', { name: 'Alice' });

      expect(mockFetch.mock.calls[0][1].body).toBe(
        JSON.stringify({ name: 'Alice' }),
      );
    });

    it('sends Content-Type application/json when a body is present', async () => {
      mockResponse({ id: 1 });

      const api = createApi('https://api.example.com');
      await api.post('/users', { name: 'Alice' });

      const headers = mockFetch.mock.calls[0][1].headers;
      expect(headers['Content-Type']).toBe('application/json');
    });

    it('returns { data } from the response body', async () => {
      mockResponse({ id: 1, name: 'Alice' });

      const api = createApi('https://api.example.com');
      const result = await api.post<{ id: number }>('/users', {
        name: 'Alice',
      });

      expect(result.data).toEqual({ id: 1, name: 'Alice' });
    });

    it('sends no body when called without a second argument', async () => {
      mockResponse({});

      const api = createApi('https://api.example.com');
      await api.post('/logout');

      expect(mockFetch.mock.calls[0][1].body).toBeUndefined();
    });

    it('throws on a non-2xx response', async () => {
      mockResponse({ message: 'Unauthorized' }, 401);

      const api = createApi('https://api.example.com');

      await expect(api.post('/users', {})).rejects.toThrow('HTTP 401');
    });
  });

  describe('put', () => {
    it('calls fetch with PUT method and the correct URL', async () => {
      mockResponse({ id: 1 });

      const api = createApi('https://api.example.com');
      await api.put('/users/1', { name: 'Bob' });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({ method: 'PUT' }),
      );
    });

    it('serialises the body as JSON', async () => {
      mockResponse({ id: 1 });

      const api = createApi('https://api.example.com');
      await api.put('/users/1', { name: 'Bob' });

      expect(mockFetch.mock.calls[0][1].body).toBe(
        JSON.stringify({ name: 'Bob' }),
      );
    });

    it('returns { data } from the response body', async () => {
      mockResponse({ id: 1, name: 'Bob' });

      const api = createApi('https://api.example.com');
      const result = await api.put<{ id: number }>('/users/1', { name: 'Bob' });

      expect(result.data).toEqual({ id: 1, name: 'Bob' });
    });

    it('throws on a non-2xx response', async () => {
      mockResponse({}, 404);

      const api = createApi('https://api.example.com');

      await expect(api.put('/users/1', {})).rejects.toThrow('HTTP 404');
    });
  });

  describe('patch', () => {
    it('calls fetch with PATCH method and the correct URL', async () => {
      mockResponse({ id: 1 });

      const api = createApi('https://api.example.com');
      await api.patch('/users/1', { name: 'Bob' });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({ method: 'PATCH' }),
      );
    });

    it('serialises the body as JSON', async () => {
      mockResponse({ id: 1 });

      const api = createApi('https://api.example.com');
      await api.patch('/users/1', { name: 'Bob' });

      expect(mockFetch.mock.calls[0][1].body).toBe(
        JSON.stringify({ name: 'Bob' }),
      );
    });

    it('returns { data } from the response body', async () => {
      mockResponse({ id: 1, name: 'Bob' });

      const api = createApi('https://api.example.com');
      const result = await api.patch<{ id: number }>('/users/1', {
        name: 'Bob',
      });

      expect(result.data).toEqual({ id: 1, name: 'Bob' });
    });

    it('sends no body when called without a second argument', async () => {
      mockResponse({});

      const api = createApi('https://api.example.com');
      await api.patch('/users/1');

      expect(mockFetch.mock.calls[0][1].body).toBeUndefined();
    });

    it('throws on a non-2xx response', async () => {
      mockResponse({}, 404);

      const api = createApi('https://api.example.com');

      await expect(api.patch('/users/1', {})).rejects.toThrow('HTTP 404');
    });
  });

  describe('delete', () => {
    it('calls fetch with DELETE method and the correct URL', async () => {
      mockResponse({});

      const api = createApi('https://api.example.com');
      await api.delete('/users/1');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({ method: 'DELETE' }),
      );
    });

    it('does not send a body', async () => {
      mockResponse({});

      const api = createApi('https://api.example.com');
      await api.delete('/users/1');

      expect(mockFetch.mock.calls[0][1].body).toBeUndefined();
    });

    it('returns { data } from the response body', async () => {
      mockResponse({ deleted: true });

      const api = createApi('https://api.example.com');
      const result = await api.delete<{ deleted: boolean }>('/users/1');

      expect(result.data).toEqual({ deleted: true });
    });

    it('throws on a non-2xx response', async () => {
      mockResponse({}, 403);

      const api = createApi('https://api.example.com');

      await expect(api.delete('/users/1')).rejects.toThrow('HTTP 403');
    });
  });

  describe('getHeaders', () => {
    it('merges getHeaders result onto every request', async () => {
      mockResponse({});

      const api = createApi('https://api.example.com', async () => ({
        Authorization: 'Bearer token123',
      }));

      await api.get('/me');

      const headers = mockFetch.mock.calls[0][1].headers;
      expect(headers['Authorization']).toBe('Bearer token123');
    });

    it('getHeaders can override Content-Type on requests with a body', async () => {
      mockResponse({});

      const api = createApi('https://api.example.com', async () => ({
        'Content-Type': 'text/plain',
      }));

      await api.post('/data', { x: 1 });

      const headers = mockFetch.mock.calls[0][1].headers;
      expect(headers['Content-Type']).toBe('text/plain');
    });

    it('applies getHeaders to post requests too', async () => {
      mockResponse({});

      const api = createApi('https://api.example.com', async () => ({
        Authorization: 'Bearer abc',
      }));

      await api.post('/data', { x: 1 });

      const headers = mockFetch.mock.calls[0][1].headers;
      expect(headers['Authorization']).toBe('Bearer abc');
    });

    it('makes requests without auth header when no getHeaders is provided', async () => {
      mockResponse({});

      const api = createApi('https://api.example.com');
      await api.get('/public');

      const headers = mockFetch.mock.calls[0][1].headers;
      expect(headers['Authorization']).toBeUndefined();
    });
  });
});
