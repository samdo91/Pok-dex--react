export const request = async (url) => {
  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();
    return json;
  }
  throw new Error("api를 받지 않았습니다");
};

export const pokeApi = async (url) => {
  if (url) {
    const listApi = await request(url);
    return listApi;
  } else {
    const listApi = await request("api/v2/pokemon?limit=24&offset=0");
    return listApi;
  }
};

export const pokeSpecialApi = async (url) => {
  if (url) {
    const listApi = await request(url);
    return listApi;
  } else {
    const listApi = await request("api/v2/pokemon-species/?limit=48&offset=0");
    return listApi;
  }
};
