import React, { Component } from 'react';
import Filters from '../filters/filters';
import Chart from '../pieChart/pieChart';
import ListTags from '../listCommodities/listTags';
import createRequest from '../core/create-request';
import {
  fetchCommoditiesByDay,
  fetchCommoditiesByWeek,
  fetchCommoditiesByMonth,
  fetchCommoditiesByYear,
  fetchAllTags
} from '../core/api-config';

export default class Reports extends Component {
  state = {
    isLoading: true,
    activeFilter: 'ДЕНЬ',
    commodities: [],
    tags: [],
    today: 1544590780430 // new Date().getTime();
  };

  componentDidMount() {
    const { today } = this.state;
    let statusTags = false;

    createRequest(fetchAllTags).then((response) => {
      if (response.status === 'OK') {
        this.setState({ tags: response.data });
        statusTags = true;
      }
      console.log('RESPONSE TAGS', response);
    });

    createRequest(fetchCommoditiesByDay, { date: today }).then((response) => {
      if (response.status === 'OK') {
        this.setState({ isLoading: !statusTags, commodities: response.data });
      }
      console.log('RESPONSE COMMODITIES', response);
    });
  }

  changeFilter = (event) => {
    const newFilter = event.currentTarget.dataset.filterCode;
    const { today } = this.state;

    switch (newFilter) {
      case 'ДЕНЬ':
        createRequest(fetchCommoditiesByDay, { date: today }).then((response) => {
          if (response.status === 'OK') {
            this.setState({
              isLoading: false,
              commodities: response.data,
              activeFilter: newFilter
            });
          }
          console.log('RESPONSE COMMODITIES', response);
        });
        break;
      case 'НЕДЕЛЯ':
        createRequest(fetchCommoditiesByWeek, { date: today }).then((response) => {
          if (response.status === 'OK') {
            this.setState({
              isLoading: false,
              commodities: response.data,
              activeFilter: newFilter
            });
          }
          console.log('RESPONSE COMMODITIES', response);
        });
        break;
      case 'МЕСЯЦ':
        createRequest(fetchCommoditiesByMonth, { date: today }).then((response) => {
          if (response.status === 'OK') {
            this.setState({
              isLoading: false,
              commodities: response.data,
              activeFilter: newFilter
            });
          }
          console.log('RESPONSE COMMODITIES', response);
        });
        break;
      case 'ГОД':
        createRequest(fetchCommoditiesByYear, { date: today }).then((response) => {
          if (response.status === 'OK') {
            this.setState({
              isLoading: false,
              commodities: response.data,
              activeFilter: newFilter
            });
          }
          console.log('RESPONSE COMMODITIES', response);
        });
        break;
      default:
        console.log('Section is under development');
    }
  };

  createDate = (time) => {
    let day = time.getDate();
    if (toString(day).length === 1) day = `0${day}`;

    let month = time.getMonth();
    month += 1;
    if (toString(month).length === 1) month = `0${month}`;

    const date = `${day}.${month}.${time.getFullYear()}`;
    return date;
  };

  createTagsArray() {
    const { commodities, tags } = this.state;
    if (commodities.length === 0) return [{ name: 'Нет добавленных покупок', total: 0, id: 0 }];

    const myCommodities = commodities.reduce(
      (prevent, current) => ({
        ...prevent,
        [current.tag]: (prevent[current.tag] || 0) + current.price
      }),
      {}
    );

    const myTags = tags.reduce(
      (prevent, current) => ({
        ...prevent,
        [current.id]: current.tag
      }),
      {}
    );

    const tagsArray = Object.keys(myCommodities).map(key => ({
      name: myTags[key],
      total: myCommodities[key],
      id: +key
    }));

    return tagsArray;
  }

  createDateForPrint() {
    const { activeFilter, today } = this.state;
    const toD = new Date(today);
    switch (activeFilter) {
      case 'ДЕНЬ': {
        return this.createDate(toD);
      }

      case 'НЕДЕЛЯ': {
        toD.setHours(0, 0, 0, 0);

        const week = toD.getDay();

        let startDay;

        if (week === 0) {
          startDay = toD - 6 * 86400000;
        } else startDay = toD.getTime() - (week - 1) * 86400000;

        startDay = this.createDate(new Date(startDay));
        let endDay = toD.getTime() + ((7 - week + 1) % 7) * 86400000;
        endDay = this.createDate(new Date(endDay));

        return `${startDay}-${endDay}`;
      }
      case 'МЕСЯЦ': {
        let month = toD.getMonth();
        switch (month) {
          case 0:
            month = 'Январь';
            break;
          case 1:
            month = 'Февраль';
            break;
          case 2:
            month = 'Март';
            break;
          case 3:
            month = 'Апрель';
            break;
          case 4:
            month = 'Май';
            break;
          case 5:
            month = 'Июнь';
            break;
          case 6:
            month = 'Июль';
            break;
          case 7:
            month = 'Август';
            break;
          case 8:
            month = 'Сентябрь';
            break;
          case 9:
            month = 'Октябрь';
            break;
          case 10:
            month = 'Ноябрь';
            break;
          case 11:
            month = 'Декабрь';
            break;
          default:
            month = 'Ошибка при определении месяца';
        }
        return month;
      }
      case 'ГОД':
        return `${toD.getFullYear()}`;
      default:
        return 'Ошибка при создании даты';
    }
  }

  render() {
    const color = [
      '#83A6ED',
      '#FFDC58',
      '#8884D8',
      '#0088FE',
      '#00C49F',
      '#FFBB28',
      '#FF8042',
      '#EA5175',
      '#8DD1E1',
      '#A4DE6C',
      '#D0ED57',
      '#FFC658',
      '#FF6058',
      '#8CE3CE',
      '#FF2800',
      '#E3004D'
    ];
    const {
      activeFilter,
      commodities,
      isLoading
    } = this.state;

    if (!isLoading) {
      const data = this.createTagsArray();
      const printDate = this.createDateForPrint();
      return (
        <>
          <Filters activeFilter={activeFilter} changeFilter={this.changeFilter} />
          <div className="date">
            {printDate}
          </div>
          <div className="wrapper">
            <Chart data={data} color={color} />
            <ListTags data={data} color={color} commodities={commodities} />
          </div>
        </>
      );
    }
    return <div className="warning">ПОЖАЛУЙСТА, ПОДОЖДИТЕ ПРОИСХОДИТ ЗАГРУЗКА ДАННЫХ</div>;
  }
}
