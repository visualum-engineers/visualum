const FoundersColumnItem = ({ name }) => {
  return (
    <div key={name} className="founder-column-item">
      <div className="founder-pic-container">
        <div className="founder-image"></div>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>
      <div className="founder-pic-name">{name}</div>
    </div>
  );
};
export default FoundersColumnItem;
