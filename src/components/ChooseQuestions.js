function ChooseQuestions({ questionsBank, chosenQuestions, dispatch }) {
  return (
    <div className="start">
      <h3>You can choose the questions you do not want to include</h3>
      <div className="legend">
        <span className="qns-choice-legend included">Included</span>
        <span className="qns-choice-legend">Excluded</span>
      </div>
      <div className="choosing-qns">
        {questionsBank.map((_, i) => (
          <button
            className={`btn btn-ui btn-choose-qns ${
              chosenQuestions.includes(i) ? "included" : ""
            }`}
            key={i}
            onClick={() => {
              dispatch({ type: "chooseQuestion", payload: i });
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChooseQuestions;
