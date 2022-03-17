const IntroRow = () => {
  const circleUnderline = (
    <svg viewBox="0 0 502 102" xmlns="http://www.w3.org/2000/svg">
      <circle cx="51" cy="51" r="50" />
      <line x1="1" y1="51" x2="501" y2="50"></line>
      <circle cx="251" cy="51" r="50" />
      <circle cx="451" cy="51" r="50" />
    </svg>
  );
    return (
      <div className="about-pg-intro-row">
        <div className="about-pg-intro-image"></div>

        <div className="about-pg-intro-text">
          <div className="about-pg-intro-column">
            <h2>Who Are We?</h2>
            {circleUnderline}
            <p>
              Visualum is a NY based company for educators. We understand that
              educators wear many hats for the sake of their students. So when
              it comes to creating interactive content, they shouldn't need to
              wear another one. We are here to simply the process, and bring
              interactive and rewarding content, to the classroom.
            </p>
          </div>
          <div className="about-pg-intro-column">
            <h2>Our Vision</h2>
            {circleUnderline}
            <p>
              We will empower educators around the world, with the tools to
              create interactive and rewarding content for their students
            </p>
          </div>
        </div>
      </div>
    );
}
export default IntroRow