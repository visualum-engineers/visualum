import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

const TeacherAdjective = (props: any) => {
  const [currWord, setCurrWord] = useState("");
  const wordIndex = useRef(0);
  const letterIndex = useRef(currWord.length);
  const wordSpelled = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0.1
  });
  useEffect(() => {
    let isMounted = true;
    const replacePhrases = [
      "n outstanding",
      " dedicated",
      "n impressive",
      " caring",
      " phenomenal",
      "n awe-inspiring",
      " stimulating",
      "n amazing",
    ];
    const current = replacePhrases[wordIndex.current];
    const wordComplete = wordSpelled.current;
    const wordIdx = wordIndex.current;
    if (!wordComplete) {
      //spell word
      letterIndex.current++;
      const firstRun = letterIndex.current <= 1;

      const newWord = replacePhrases[wordIdx].substring(0, letterIndex.current);
      setTimeout(
        () => {
          if (isMounted) setCurrWord(newWord);
        },
        firstRun ? 500 : 100
      );
      if (letterIndex.current >= current.length) {
        wordSpelled.current = true;
      }
    } else {
      const firstRun = current.length <= letterIndex.current;
      letterIndex.current--;
      const newWord = replacePhrases[wordIdx].substring(0, letterIndex.current);
      setTimeout(
        () => {
          if (isMounted) setCurrWord(newWord);
        },
        firstRun ? 500 : 100
      );

      //move one word forward as deletion has occured
      if (letterIndex.current <= 0) {
        letterIndex.current = 0;
        wordIndex.current++;
        wordSpelled.current = false;
      }
      //loop back to first word after reaching the end
      if (wordIndex.current >= replacePhrases.length) {
        wordIndex.current = 0;
      }
    }
    return () => {
      isMounted = false;
    };
  }, [currWord]);

  return (
    <span ref={ref} className="about-pg-mission-adjective">
      {inView && currWord}
    </span>
  );
};
const MissionStatement = (props: any) => {
  return (
    <div className="about-pg-mission-statement">
      <div className="about-pg-mission-text">
        <h2>
          Behind every great student lies a<TeacherAdjective /> educator
        </h2>
        <p>
          With the power of software, we help educators improve student
          outcomes. Our mission is to transform education, together
        </p>
      </div>
    </div>
  );
};
export default MissionStatement;
