import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Star =({ starId, rating}) => {
  
    let styleClass = "star-rating-blank";
    if (rating && rating >= starId) {
      styleClass = "star-rating-filled";
    }
  
    return (
      <div
        className="star"
     
      >
        <svg
          height="35px"
          width="23px"
          class={styleClass}
          viewBox="0 0 25 23"
          data-rating="1"
        >
          <polygon
            stroke-width="0"
            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
          />
        </svg>
      </div>
    );
  };
  

Star.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  color: {
    filled: PropTypes.string,
    unfilled: PropTypes.string,
  },
};

Star.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#f5eb3b",
    unfilled: "#DCDCDC",
  },
};

export default Star;