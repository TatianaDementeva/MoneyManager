/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  PieChart, Pie, Cell, Sector
} from 'recharts';

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
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
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
        {`Сумма ${value}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class Chart extends Component {
  state = {
    activeIndex: 0
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { data } = this.props;
    const color = [
      '#3DB27A',
      '#FFDC58',
      '#8884D8',
      '#0088FE',
      '#00C49F',
      '#FFBB28',
      '#FF8042',
      '#EA5175',
      '#83A6ED',
      '#8DD1E1',
      '#A4DE6C',
      '#D0ED57',
      '#FFC658',
      '#FF6058',
      '#8CE3CE',
      '#FF2800',
      '#E3004D'
    ];
    const { activeIndex } = this.state;
    return (
      <PieChart width={885} height={450}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          dataKey="price"
          nameKey="name"
          cx="50%"
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
    );
  }
}
