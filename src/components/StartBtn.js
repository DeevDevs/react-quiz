import { useQuiz } from "../contexts/QuizContext";

function StartBtn() {
  const { dispatch } = useQuiz();
  return (
    <div className="start">
      <br />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartBtn;
