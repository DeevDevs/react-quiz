import ChooseDifficulty from "./ChooseDifficulty";
import ChooseQuestions from "./ChooseQuestions";

function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
    </div>
  );
}

export default StartScreen;
