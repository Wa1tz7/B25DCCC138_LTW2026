import { MAX_LIVES } from "../data";

const Helpers = ({ used, lives, status, onFifty, onSkip, onLife }) => {
  const canAct = status === "answering";

  return (
    <div className="helpers">
      <button onClick={onFifty} disabled={!canAct || used.fifty}>
        50:50
      </button>
      <button onClick={onSkip} disabled={!canAct || used.skip}>
        Bỏ qua
      </button>
      <button onClick={onLife} disabled={!canAct || used.life || lives >= MAX_LIVES}>
        Thêm 1 mạng
      </button>
    </div>
  );
};

export default Helpers;