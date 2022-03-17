import { useInView } from "react-intersection-observer";

const GroupImage = (props) => {
   const { ref, inView } = useInView({
     threshold: 0.3,
     triggerOnce: true
   });
  return (
    <div className="about-pg-group-image-container" ref={ref}>
      {inView ? (
        <div className="about-pg-group-image"></div>
      ) : (
        <div className="about-pg-group-image-placeholder"></div>
      )}
    </div>
  );
};
export default GroupImage;
