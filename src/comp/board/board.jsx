import { css } from "@emotion/css";

function BoardPage(props) {
  const { PokémonState, setPokémonState } = props;

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
                <img src={item.prites}></img>
                <div>{item.name}</div>
              </div>
            );
          })
        : ""}
    </div>
  );
}
export default BoardPage;
