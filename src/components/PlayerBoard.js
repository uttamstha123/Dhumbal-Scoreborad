import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

export default function PlayerBoard() {
  const [playersName, setPlayersName] = useState([""]);
  const [value, setValue] = useState("");
  const {
    state: { players, limit }
  } = useLocation();
  let navigate = useNavigate();
  let numbers = [];

  for (let i = 1; i <= players; i++) {
    numbers.push(i);
  }

  // remove duplicates if any
  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  return (
    <div className="text-center">
      <h2 className="m-2">Enter Name of Players</h2>
      <Players>
        {numbers.map((num) => (
          <input
            key={num}
            id={num}
            onChange={(e) => {
              if (Number(e.target.id) === Number(num)) {
                setValue(e.target.value);
              }
            }}
            onBlur={(e) => {
              if (!value.length) return;
              setPlayersName([...playersName, value]);
            }}
            type="text"
            className="form-control"
            placeholder={`Player ${num}`}
          />
        ))}
      </Players>
      <button
        onClick={() => {
          let players = removeDuplicates(playersName);
          players.shift();
          navigate("/gameplay", { state: { players, limit } });
        }}
        className="btn btn-primary px-4 my-3"
      >
        Start
      </button>
    </div>
  );
}
const Players = styled.div`
  display: flex;
  max-height: 70vh;
  overflow-y: scroll;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  margin: 0 auto;
  input {
    padding: 10px;
  }
  input:focus {
    outline: none;
    box-shadow: none;
  }
`;
