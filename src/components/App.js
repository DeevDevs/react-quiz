import { useEffect, useReducer } from "react";
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

const initialState = {
  questionsBank: [],
  questions: [],
  chosenQuestions: [],
  noviceQuestions: [],
  amateurQuestions: [],
  difficulty: "professional",
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;
const NOVICE_POINTS = 10;
const AMATEUR_POINTS = 20;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      const noviceQuestionsIndexes = action.payload.reduce(
        (arr, question, i) =>
          question.points === NOVICE_POINTS ? [...arr, i] : arr,
        []
      );
      const amateurQuestionsIndexes = action.payload.reduce(
        (arr, question, i) =>
          question.points <= AMATEUR_POINTS ? [...arr, i] : arr,
        []
      );
      return {
        ...state,
        questionsBank: action.payload,
        status: "ready",
        chosenQuestions: action.payload.map((_, i) => i),
        noviceQuestions: [...noviceQuestionsIndexes],
        amateurQuestions: [...amateurQuestionsIndexes],
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      const setQuestions = state.questionsBank.filter((_, i) =>
        state.chosenQuestions.includes(i)
      );

      return {
        ...state,
        status: "active",
        questions: [...setQuestions],
        secondsRemaining: setQuestions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questionsBank: [...state.questionsBank],
        chosenQuestions: state.questionsBank.map((_, i) => i),
        noviceQuestions: [...state.noviceQuestions],
        amateurQuestions: [...state.amateurQuestions],
        difficulty: "professional",
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "chooseQuestion":
      const updatedList = state.chosenQuestions.includes(action.payload)
        ? state.chosenQuestions.filter((num) => num !== action.payload)
        : [...state.chosenQuestions, action.payload];
      return { ...state, chosenQuestions: updatedList, difficulty: null };
    case "setDifficulty":
      let updList;
      if (action.payload === "professional")
        updList = state.questionsBank.map((_, i) => i);
      if (action.payload === "amateur") updList = [...state.amateurQuestions];
      if (action.payload === "novice") updList = [...state.noviceQuestions];
      return {
        ...state,
        difficulty: action.payload,
        chosenQuestions: [...updList],
      };
    default:
      throw new Error("action unknown");
  }
}

export default function App() {
  const [
    {
      questions,
      questionsBank,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      chosenQuestions,
      difficulty,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    dispatch({ type: "dataReceived", payload: data });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <>
            <StartScreen
              numQuestions={questionsBank.length}
              dispatch={dispatch}
            />
            <ChooseQuestions
              questionsBank={questionsBank}
              chosenQuestions={chosenQuestions}
              dispatch={dispatch}
            />
            <ChooseDifficulty dispatch={dispatch} difficulty={difficulty} />
            <StartBtn dispatch={dispatch} />
          </>
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
