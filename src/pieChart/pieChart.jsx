/* eslint-disable react/require-default-props */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  PieChart, Pie, Cell, Sector
} from 'recharts';
import PropTypes from 'prop-types';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 7) * cos;
  const sy = cy + (outerRadius + 7) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {`Сумма ${value.toFixed(2)}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
renderActiveShape.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  midAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  payload: PropTypes.objectOf,
  percent: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired
};
export default class Chart extends Component {
  state = {
    activeIndex: 0
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired
    })).isRequired,
    color: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { data, color } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className="chart">
        <div className="chart__header">Расходы</div>
        <PieChart width={700} height={450}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            dataKey="total"
            nameKey="name"
            cx="47%"
            cy="50%"
            innerRadius={100}
            outerRadius={150}
            legendType="star"
            fill="#82ca9d"
            onMouseEnter={this.onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={color[index % color.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }
}
