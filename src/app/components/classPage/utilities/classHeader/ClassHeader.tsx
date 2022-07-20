import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/scrollbar/scrollbar.min.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
export interface LinkData {
  link: string;
  icon?: JSX.Element;
  text: string;
  idForRoute: string;
}
const ClassPageHeader = ({
  links,
  className,
  linkClassName
}: {
  links: LinkData[];
  className?: string;
  linkClassName?: string;
}) => {
  const location = useLocation();
  const routeIds = location.pathname.split("/");
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      spaceBetween={40}
      slidesPerView={"auto"}
      className={`class-page-carousel-header ${className}`}
    >
      {links.map((item) => {
        return (
          <SwiperSlide
            key={item.text}
            style={{ width: "auto", height: "100%"}}
            className={"carousel-items"}
          >
              <Link
                to={`${item.link}`}
                className={`class-page-header-links ${linkClassName ? linkClassName : ''} ${
                  routeIds.includes(item.idForRoute) ? "selected" : ""
                }`}
              >
                {item.icon}
                {item.text}
              </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default ClassPageHeader;
