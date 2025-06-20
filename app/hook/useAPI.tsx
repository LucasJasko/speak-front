interface requestContent {
  json?: Record<string, unknown>;
  method?: string;
  token?: string | null | undefined;
}

interface responseContent<T> {
  data: T;
  status: number;
}

export default async function useAPI<T>(url: string, { json, method, token }: requestContent = {}): Promise<responseContent<T>> {
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
    const text = await req.text();
    return {
      data: text ? ((await JSON.parse(text)) as T) : ("" as T),
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
