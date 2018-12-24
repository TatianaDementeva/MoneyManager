/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListCommodities extends Component {
  static propTypes = {
    tag: PropTypes.shape({
      name: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired
    }).isRequired,
    commodities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        tag: PropTypes.number.isRequired
      })
    ).isRequired,
    color: PropTypes.string.isRequired
  };

  state = {
    showCommodaties: false
  };

  show = () => {
    const { showCommodaties } = this.state;

    this.setState({ showCommodaties: !showCommodaties });
  };

  SVGArrow = () => {
    return (
      <svg id="arrow" viewBox="0 0 32 32" x="0.00000000" y="0.00000000">
        <g transform="translate(16.000000, 16.000000) rotate(90.000000) translate(-16.000000, -16.000000) translate(11.000000, 6.000000)">
          <polygon
            className="Stroke-52"
            points="9.86363636 10 0.196969697 0"
            style={{
              stroke: '#282e33',
              strokeWidth: '3',
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }}
          />
          <path
            d="M9.86363636,10 L0.196969697,20"
            className="Stroke-56"
            style={{
              stroke: '#282e33',
              strokeWidth: '3',
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }}
          />
        </g>
      </svg>
    );
  };

  filter = () => {
    const { commodities, tag } = this.props;

    const newComm = commodities.filter(item => item.tag === tag.id);
    return newComm;
  };

  render() {
    const { showCommodaties } = this.state;
    const { tag, color } = this.props;
    const newComm = this.filter();
    return (
      <div>
        <div className="tag" onClick={this.show}>
          
          <div className="tag__name" style={{ color }}>
            {tag.name}
          </div>
          <div className="tag__total">{tag.total.toFixed(2)}</div>
        </div>
        {showCommodaties && (
          <div className="commodaties">
            {newComm.map(item => (
              <div className="commodities" key={item.id}>
                <div className="commodities__name">{item.name}</div>
                <div className="commodities__price">{item.price.toFixed(2)}</div>
              </div>))}
          </div>
        )}
      </div>
    );
  }
}
