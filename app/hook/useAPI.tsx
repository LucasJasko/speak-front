export default async function useAPI<T>(url: string, { json, method }: { json?: Record<string, unknown>; method?: string } = {}): Promise<T> {
  method ??= json ? "POST" : "GET";
  const body = json ? JSON.stringify(json) : undefined;

  const req = await fetch("http://alert-mns-back/api" + url, {
    method,
    body,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });

  if (req.ok) {
    return req.json() as Promise<T>;
  }

  throw new ApiError(req.status, await req.json());
}

class ApiError extends Error {
  constructor(public status: number, public data: Record<string, unknown>) {
    if (status === 401) {
      localStorage.removeItem("auth_key");
      window.location.reload();
    }
    super();
  }
}

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    UID: number;
  };
};

export type AuthResponse = {};
