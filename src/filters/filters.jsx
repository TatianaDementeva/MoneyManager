/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../class-names/class-names';

class Filters extends Component {
  static propTypes = {
    activeFilter: PropTypes.string.isRequired,
    changeFilter: PropTypes.func.isRequired
  };

  render() {
    const { activeFilter, changeFilter } = this.props;
    return (
      <div className="reports-filters__wrapper">
        <div className="reports-filters">
          {['ДЕНЬ', 'НЕДЕЛЯ', 'МЕСЯЦ', 'ГОД'].map(item => (
            <div
              className={classNames('reports-filters__item', { active: activeFilter === item })}
              onClick={changeFilter}
              data-filter-code={item}
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Filters;
