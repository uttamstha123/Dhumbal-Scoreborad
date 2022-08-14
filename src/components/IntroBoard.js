import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IntroBoard() {
  const [players, setPlayers] = useState(0);
  const [limit, setLimit] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      <Form>
        <h1 className=" text-center fs-2 text-secondary mt-4">
          Dhumbal Score Board
        </h1>
        <input
          className="form-control form-control-sm"
          onChange={(e) => {
            setPlayers(e.target.value);
          }}
          type="number"
          min="0"
          title="How many players are playing ?"
          placeholder="Number Of Players"
        />
        <input
          className="form-control form-control-sm"
          onChange={(e) => setLimit(e.target.value)}
          type="number"
          min="0"
          title="You can also change the limit one more time later."
          placeholder="Set Limit"
        />
        <button
          className="btn btn-secondary px-4 py-1"
          onClick={() =>
            (players.length > 0) & (limit.length > 0)
              ? navigate("/players", { state: { players, limit } })
              : ""
          }
        >
          Play
        </button>
      </Form>
    </>
  );
}
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: min-content;
  margin: 0 auto;
  gap: 20px;
  input {
    width: max-content;
    padding: 10px;
  }
  button {
    width: min-content;
    padding: 8px 20px;
    align-self: center;
    cursor: pointer;
  }
`;
