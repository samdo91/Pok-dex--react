import React, { useState, useEffect } from "react";
import SearchBar from "./searchBar/searchBar";
import BoardPage from "./board/board";
import { request } from "./userStore/api/api";
import { useInView } from "react-intersection-observer";

function MainPage() {
  const [PokémonState, setPokémonState] = useState({
    list: [],
    keyword: "포켓몬",
    searchValue: "",
    pakesprites: [],
  });

  const Pokémonlist = async () => {
    const lists = await request("api/v2/pokemon?limit=24&offset=0");
    let pritesList = [];

    lists.results.forEach(async (item) => {
      const pokeState = await request(item.url);
      pritesList.push({
        ...pokeState,
        name: item.name,
        url: item.url,
        prites: pokeState.sprites.front_default,
      });
      const list = PokémonState.pakesprites.concat(pritesList);
      setPokémonState({
        ...PokémonState,
        list: lists,
        pakesprites: list,
      });
    });
  };

  useEffect(() => {
    try {
      if (PokémonState.list === null) {
        Pokémonlist();
      }
    } catch {
      console.log("api를 못받아 왔어!");
    }
  }, []); //

  const { ref, inView, entry } = useInView({});

  console.log(inView);

  return (
    <div>
      <h1> 포켓몬 도감</h1>
      <SearchBar
        PokémonState={PokémonState}
        setPokémonState={setPokémonState}
      />
      <BoardPage
        PokémonState={PokémonState}
        setPokémonState={setPokémonState}
      />

      <div ref={ref}>
        <h2>{`${inView}`}</h2>
      </div>
    </div>
  );
}

export default MainPage;
