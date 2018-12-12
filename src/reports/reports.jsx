import React, { Component } from 'react';
import Filters from '../filters/filters';
import Chart from '../pieChart/pieChart';
import createRequest from '../core/create-request';
import { fetchCommoditiesByDay } from '../core/api-config';

export default class Reports extends Component {
  state = {
    isLoading: true,
    activeFilter: 'ДЕНЬ',
    commodities: []
  };

  componentDidMount() {
    let nowDate = new Date();
    nowDate = nowDate.getTime();

    createRequest(fetchCommoditiesByDay, { date: nowDate }).then((response) => {
      if (response.status === 'OK') {
        this.setState({ isLoading: false, commodities: response.data });
      }
      console.log(response);
    });
  }

  changeFilter = (event) => {
    const newFilter = event.currentTarget.dataset.filterCode;
    this.setState({ activeFilter: newFilter });
  };

  createTagsArray() {
    const { commodities } = this.state;
    console.log('commodities', commodities);
    const tags = new Array(0);
    console.log('tags', tags);
    tags.push({
      name: commodities[0].tag,
      price: commodities[0].price
    });
    console.log('tags after 0', tags);

    function addInTags(element) {
      console.log('ele.tag', element.tag);
      const index = tags.indexOf({ tag: element.tag });
      console.log(index);
      if (index === -1) {
        tags.push({
          name: element.tag,
          price: element.price
        });
      } else {
        console.log(tags[index]);
        tags[index] = {
          name: tags[index].tag,
          price: tags[index].price + element.price
        };
      }
    }
    commodities.forEach(addInTags);
    console.log(tags);
    return tags;
  }

  render() {
    const { activeFilter, commodities, isLoading } = this.state;
    if (!isLoading) {
      return (
        <>
          <Filters activeFilter={activeFilter} changeFilter={this.changeFilter} />
          <Chart data={this.createTagsArray()} />
        </>
      );
    }
    return <div>Загрузка данных</div>;
  }
}
