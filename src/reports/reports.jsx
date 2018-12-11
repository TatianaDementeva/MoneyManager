import React, { Component } from 'react';
import Filters from '../filters/filters';
import Chart from '../pieChart/pieChart';
import createRequest from '../core/create-request';
import { fetchCommoditiesByDate } from '../core/api-config';

export default class Reports extends Component {
  state = {
    activeFilter: 'ДЕНЬ',
    commodities: []
  };

  componentDidMount() {
    const nowDate = new Date();
    const date = `${nowDate.getDate()}.${nowDate.getMonth()}.${nowDate.getFullYear()}`;
    createRequest(fetchCommoditiesByDate, { date: '03.12.2018' }).then((response) => {
      if (response.status === 'OK') {
        this.setState({ commodities: response.data });
      }
      console.log(response);
    });
  }

  changeFilter = (event) => {
    const newFilter = event.currentTarget.dataset.filterCode;
    this.setState({ activeFilter: newFilter });
  };

  render() {
    const { activeFilter, commodities } = this.state;
    return (
      <>
        <Filters activeFilter={activeFilter} changeFilter={this.changeFilter} />
        <Chart data={commodities} />
      </>
    );
  }
}
