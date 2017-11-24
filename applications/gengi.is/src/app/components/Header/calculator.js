import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.css';

function CalculatorHeader({ code, name }) {
  return (
    <header>
      <div className="content-wrap">
        <div className="icon">
          <Link to="/" title="back">
            <svg width="22" height="18" viewBox="0 0 22 18">
              <path
                fill="#178C72"
                fillRule="evenodd"
                d="M0 9l12-9v18L0 9zm12-3h10v6H12V6z"
              />
            </svg>
          </Link>
        </div>
        <div className="title">
          <h1 className="code">{code}</h1>
          <h5 className="name">{name}</h5>
        </div>
      </div>
    </header>
  );
}

CalculatorHeader.propTypes = {
  code: PropTypes.string,
  name: PropTypes.string,
};

CalculatorHeader.defaultProps = {
  code: '',
  name: '',
};

export default CalculatorHeader;
