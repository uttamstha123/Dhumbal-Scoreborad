import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

/*
  Todo:
  1. Exclude lossed player 
  2. Display winner at last
*/

export default function GamePlay() {
  let {
    state: { players, limit },
  } = useLocation();
  const [round, setRound] = useState(1);
  const [totalScore, setTotalScore] = useState(
    // fill -> 0 to all index
    new Array(players.length).fill(0)
  );
  let currentScores = [];
  let rows = [];
  for (let i = 1; i <= round; i++) {
    rows.push(i);
  }
  function handleScore(e, index) {
    currentScores[index] = e.target.value;
    e.target.disabled = true;
  }

  function handleTotalScore() {
    setTotalScore((prevScores) => {
      for (let i = 0; i < players.length; i++) {
        if (!prevScores[i]) {
          prevScores[i] = currentScores[i];
        } else {
          let total = Number(prevScores[i]) + Number(currentScores[i]);
          prevScores[i] = Number(total);
        }
      }
      setRound((prev) => prev + 1);
      return prevScores;
    });
  }

  // function to remove lose player
  function removePlayer(i) {
    currentScores[i] = 0;
    return "You Loose";
  }
  return (
    <ScoreBoard>
      <Head title="You can change limit for 1 time in a game">
        <h1 className="text-secondary">GameBoard</h1>
        <h4 className="text-danger">Limit : {limit}</h4>
      </Head>
      <table className="scoreboard table table-striped">
        <tbody>
          <tr>
            <th>S.No.</th>
            {players.map((pName, index) => (
              <td key={index} className="text-capitalize">
                {pName} [{totalScore[index]}]
              </td>
            ))}
          </tr>
          {rows.map((row, index) => (
            <tr key={index} id={row}>
              <td>{row}.</td>
              {players.map((player, index) => (
                <td key={index} style={{ width: "max-content" }}>
                  <input
                    id={index}
                    className={row}
                    onBlur={(e) => {
                      handleScore(e, index);
                    }}
                    onDoubleClick={(e) => {
                      if (round > e.target.className) return;
                      e.target.disabled = false;
                    }}
                    disabled={
                      Number(totalScore[index]) >= Number(limit) ? true : false
                    }
                    type="number"
                    min="0"
                    placeholder={
                      Number(totalScore[index]) >= Number(limit)
                        ? removePlayer(index)
                        : "Enter Score"
                    }
                    style={{ width: "100%" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          let flag = 0;
          // Checking for value in each input
          currentScores.forEach((value, index) => {
            // console.log("value", value);
            if (!String(value)) return;
            flag++;
          });
          //     console.log("flag", flag);
          // if we get all value -> calculate current score
          if (flag === players.length) {
            // console.log("flag", flag);
            handleTotalScore();
          }
        }}
        style={{
          position: "absolute",
          bottom: "4%",
          left: "50%",
          transform: "translate(-50%,-2%)",
        }}
        className="btn btn-primary px-4 py-2 rounded shadow"
      >
        Ok
      </button>
    </ScoreBoard>
  );
}
const ScoreBoard = styled.div`
  max-height: 92vh;
  overflow-y: auto;
`;
const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: stretch;
  align-items: center;
  padding: 0 10px;
  h1 {
    width: 62.5%;
    text-align: right;
  }
  h4 {
    /* width: calc(100% - 62.5%); */
    width: max-content;
    margin-left: auto;
    cursor: pointer;
  }
`;
