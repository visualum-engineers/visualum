const RadialLoadingDial = ({
  progressNum,
  customText,
  className,
  strokeWidth = "0.25rem",
}: {
  progressNum: number;
  customText?: string;
  className?: string;
  strokeWidth?: string;
}) => {
  const namespace = "radial-loading-dial";
  const innerPadding = { padding: strokeWidth ? strokeWidth : "1rem" };
  const radius = 20;
  const circumference = radius * 2 * Math.PI;
  const lineLength = circumference - (progressNum / 100) * circumference;
  return (
    <div className={`${namespace}-container ${className}`}>
      <div className={`${namespace}-dial`}>
        <svg viewBox="0 0 50 50">
          <circle
            className={`${namespace}-circle`}
            cx={25}
            r={radius}
            cy={25}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={lineLength}
          />
        </svg>
      </div>
      <div className={`${namespace}-content`} style={innerPadding}>
        {customText ? customText : `${progressNum}%`}
      </div>
    </div>
  );
};
export default RadialLoadingDial;
