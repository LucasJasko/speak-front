interface requestContent {
  json?: Record<string, unknown>;
  method?: string;
  token?: string;
}

export default async function useAPI<T>(url: string, { json, method, token }: requestContent = {}): Promise<{ data: T; status: number }> {
  method ??= json ? "POST" : "GET";
  const body = json ? JSON.stringify(json) : undefined;
  const headers: HeadersInit = {
    "content-type": "application/json",
  };
  token ? (headers["Authorization"] = `Bearer ${token}`) : undefined;

  const req = await fetch("http://speak/api" + url, {
    method,
    body,
    credentials: "include",
    headers,
  });

  if (req.ok) {
    return {
      data: (await req.json()) as T,
      status: req.status,
    };
  }

  throw new ApiError(req.status, await req.json());
}

class ApiError extends Error {
  constructor(public status: number, public data: Record<string, unknown>) {
    if (status === 401) {
      window.location.reload();
    }
    super();
  }
}

export type LoginResponse = {
  message: string;
  accessToken: string;
  UID: number;
  deleteToken: string;
};

export type AuthResponse = {};
