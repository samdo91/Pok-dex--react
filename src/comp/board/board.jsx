import { css } from "@emotion/css";
import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  PokémonStateContext,
  setPokémonStateContext,
} from "../userStore/contextApi/contextApi";

function BoardPage(props) {
  const PokémonState = useContext(PokémonStateContext);
  const setPokémonState = useContext(setPokémonStateContext);
  const { koreanNamelistState } = props;
  console.log(koreanNamelistState.koreanNamelist);

  const boardList = PokémonState.list.results;

  const pakespritesList = PokémonState.pakesprites;

  return (
    <div
      className={css`
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start
      margin-top: 25px;
      justify-content: space-evenly

    }
  `}
    >
      {boardList
        ? pakespritesList.map((item, index) => {
            return (
              <div
                key={index}
                className={css`
                  border: 1px solid black;
                  padding: 32px;
                  height: 200px;
                  font-size: 24px;
                  border-radius: 10px;
                  width: 200px;
                  margin: 10px;
                `}
              >
                <Link to={`${item.name}`} key={item.id}>
                  <img src={item.prites}></img>
                  <div>
                    {`No${item.id}. 
                  ${koreanNamelistState.koreanNamelist[item.id - 1]}`}
                  </div>
                </Link>
                <div>
                  {item.types.map((item, index) => {
                    return <div key={index}>{item.type.name}</div>;
                  })}
                </div>
              </div>
            );
          })
        : ""}

      <Outlet />
    </div>
  );
}
export default BoardPage;
