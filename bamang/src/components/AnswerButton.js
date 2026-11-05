const AnswerButton = ({ letter, text, state, disabled, hidden, onClick }) => (
  <button
    className={`answer ${state}`}
    disabled={disabled || hidden}
    style={hidden ? { visibility: "hidden" } : undefined}
    onClick={onClick}
  >
    {!hidden && `${letter}. ${text}`}
  </button>
);

export default AnswerButton;