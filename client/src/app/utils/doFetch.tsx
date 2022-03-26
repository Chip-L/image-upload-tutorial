const doFetch = async (url: string, options: RequestInit) => {
  //  Note: don't use the full URL here... the proxy will pick up the correct path. Otherwise it will give a CORS error.
  const res = await fetch(url, options);
  const body = (await res.json()) as any;

  console.log("res:", res);
  console.log("body:", body);
  return { body, res };
};

export default doFetch;
