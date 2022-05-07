import React from "react";
import StoreCarouselItem from "./StoreCarouselItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import sampleData from "./sampleData";

export default function Store() {
  const showMore = (id: any) => {
    return (
      <Link
        to={`${id}`}
        className="store-item store-carousel-item show-more-item d-flex justify-content-center align-items-center"
      >
        <span className="fw-bold">Show More</span>
      </Link>
    );
  };

  const sections = sampleData.map((store) => {
    return (
      <div className="col-12 mb-5">
        <div className="mb-2">
          <div className="row">
            <div className="col-lg-8 col-12">
              <h2 className="fw-bold">{store.name}</h2>
            </div>
            <div className="col-lg-4 col-12 d-flex justify-content-lg-end justify-content-between align-items-center">
              <span className="h6 mb-0">
                <FontAwesomeIcon icon={faDollarSign} className="icon me-2" />
                209 pts
              </span>
            </div>
          </div>
        </div>
        <div className="store-section">
          <div className="store-item-carousel">
            <div className="carousel-button-container">
              <div className="carousel-button">
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
            </div>
            <div className="store-item-container">
              {store.items.map((item) => (
                <StoreCarouselItem
                  title={item.name}
                  price={item.price}
                  key={item.id}
                />
              ))}
              {showMore(store.class_id)}
            </div>
            <div className="carousel-button-container">
              <div className="carousel-button">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <h1 className="fw-bold mb-5">All Stores</h1>
      <div className="row">{sections}</div>
    </>
  );
}
