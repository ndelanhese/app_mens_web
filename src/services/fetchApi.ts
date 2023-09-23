export async function api<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${input}`, init);

  const result = await data.json();
  return result as T;
}

export async function nextApi<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const data = await fetch(`/api/${input}`, init);

  const result = await data.json();
  return result as T;
}
