import React, { useState, useEffect } from "react";
import SearchBar from "./searchBar/searchBar";
import BoardPage from "./board/board";
import { request } from "./userStore/api/api";

function MainPage() {
  const [PokémonState, setPokémonState] = useState({
    list: [],
    keyword: "포켓몬",
    searchValue: "",
    pakesprites: [],
  });

  useEffect(() => {
    try {
      const Pokémonlist = async () => {
        const lists = await request("api/v2/pokemon?limit=10&offset=0");
        let pritesList = [];

        lists.results.map(async (item) => {
          const pokeState = await request(item.url);
          pritesList.push({
            name: item.name,
            url: item.url,
            prites: pokeState.sprites.front_default,
          });
        });

        setPokémonState({
          ...PokémonState,
          list: lists,
          pakesprites: pritesList,
        });
      };
      Pokémonlist();
    } catch {
      console.log("api를 못받아 왔어!");
    }
  }, []); //

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
    </div>
  );
}

export default MainPage;