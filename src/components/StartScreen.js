import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { questionsBank } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsBank.length} questions to test your React mastery</h3>
    </div>
  );
}

export default StartScreen;
