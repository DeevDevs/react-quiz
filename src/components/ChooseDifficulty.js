import { useQuiz } from "../contexts/QuizContext";

function ChooseDifficulty() {
  const { dispatch, difficulty } = useQuiz();
  return (
    <div className="start">
      <h3>Or, you can choose the difficulty level</h3>
      <button
        className={`btn btn-ui btn-choose-diff ${
          difficulty === "novice" ? "included" : ""
        }`}
        onClick={() => dispatch({ type: "setDifficulty", payload: "novice" })}
      >
        Novice
      </button>
      <button
        className={`btn btn-ui btn-choose-diff ${
          difficulty === "amateur" ? "included" : ""
        }`}
        onClick={() => dispatch({ type: "setDifficulty", payload: "amateur" })}
      >
        Amateur
      </button>
      <button
        className={`btn btn-ui btn-choose-diff ${
          difficulty === "professional" ? "included" : ""
        }`}
        onClick={() =>
          dispatch({ type: "setDifficulty", payload: "professional" })
        }
      >
        Professional
      </button>
    </div>
  );
}

export default ChooseDifficulty;
