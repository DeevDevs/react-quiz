import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { dispatch, questions, index, answer } = useQuiz();

  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
