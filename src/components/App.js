import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import ChooseQuestions from "./ChooseQuestions";
import ChooseDifficulty from "./ChooseDifficulty";
import StartBtn from "./StartBtn";
import { data } from "../data";
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
  const { dispatch, questions, status } = useQuiz();

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(
    function () {
      dispatch({ type: "dataReceived", payload: data });
    },
    // added dispatch into the dependency array... in doubts so far
    [dispatch]
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <>
            <StartScreen />
            <ChooseQuestions />
            <ChooseDifficulty />
            <StartBtn />
          </>
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question />
            <Footer>
              <Timer />
              <NextButton numQuestions={numQuestions} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen maxPossiblePoints={maxPossiblePoints} />
        )}
      </Main>
    </div>
  );
}
