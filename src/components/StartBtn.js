import { useQuiz } from "../contexts/QuizContext";

function StartBtn() {
  const { dispatch, chosenQuestions } = useQuiz();
  return (
    <div className="start">
      <br />
      <button
        className="btn btn-ui"
        onClick={() => {
          if (chosenQuestions.length !== 0) dispatch({ type: "start" });
        }}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartBtn;
