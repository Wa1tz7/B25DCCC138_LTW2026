const ProgressBar = ({ results, current, total }) => (
  <div className="progress-bar">
    {Array.from({ length: total }, (_, i) => {
      const status = results[i] || "pending"; // correct | wrong | skipped | pending
      const className = `cell ${status}${i === current ? " current" : ""}`;
      return (
        <span key={i} className={className}>
          {i + 1}
        </span>
      );
    })}
  </div>
);

export default ProgressBar;