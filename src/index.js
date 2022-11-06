import React from "react";
import ReactDOM from "react-dom";
import "./App.css"

function Slider({ onChange, min, max }) {
  const [value, setValue] = React.useState(1);

  return (
    <React.Fragment>
      {value}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const value = Number(e.target.value);
          onChange(value);
          setValue(value);
        }}
      />
    </React.Fragment>
  );
}

function reducer(state, action) {
  if (action.type === "increment") {
    return {
      count: state.count + state.step,
      step: state.step
    };
  } else if (action.type === "decrement") {
    return {
      count: state.count - state.step,
      step: state.step
    };
  } else if (action.type === "reset") {
    return {
      count: 0,
      step: state.step
    };
  } else if (action.type === "updateStep") {
    return {
      count: state.count,
      step: action.step
    };
  } else {
    throw new Error("No such action");
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0, step: 1 });

  return (
    <React.Fragment>
      <Slider
        onChange={(value) =>
          dispatch({
            type: "updateStep",
            step: value
          })
        }
      />
      <div>
        <h1>{state.count}</h1>
        <button
          onClick={() =>
            dispatch({
              type: "increment"
            })
          }
        >
          +
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "decrement"
            })
          }
        >
          -
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "reset"
            })
          }
        >
          Reset
        </button>
      </div>

    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);