/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListCommodaties from './listCommodities';

export default class ListTags extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
      })
    ).isRequired,
    color: PropTypes.arrayOf(PropTypes.string).isRequired,
    commodities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        tag: PropTypes.number.isRequired
      })
    ).isRequired
  };

  render() {
    const { data, commodities, color } = this.props;
    return (
      <div className="tags-list">
        {data.map((item, index) => (
          <ListCommodaties
            tag={item}
            commodities={commodities}
            color={color[index % color.length]}
            key={item.name}
          />
        ))}
      </div>
    );
  }
}
