export default function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? 'answer' : ''} ${
            hasAnswered
              ? i === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={answer !== null}
          onClick={() => dispatch({ type: 'newAnswer', payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
