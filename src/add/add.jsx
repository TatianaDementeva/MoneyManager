import React, { Component, createRef } from 'react';
import createRequest from '../core/create-request';
import { fetchAllTags, createCommidity } from '../core/api-config';

export default class Add extends Component {
  state = {
    tags: []
  };

  nameRef = createRef();

  priceRef = createRef();

  tagRef = createRef();

  dateRef = createRef();

  componentDidMount() {
    createRequest(fetchAllTags).then((response) => {
      if (response.status === 'OK') {
        this.setState({ tags: response.data });
      }
      console.log('RESPONSE TAGS', response);
    });
  }
  /*
  onChange(event) {
    const val = event.target.value;
    this.setState({ name: val });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(`Имя: ${this.state.name}`);
  }
*/

  onSubmit = (event) => {
    event.preventDefault();
    if (
      this.nameRef.current.value !== ''
      && this.priceRef.current.value !== ''
      && this.tagRef.current.value !== ''
    ) {
      createRequest(createCommidity, null, {
        commodity: {
          date: 1544590780430,
          name: this.nameRef.current.value,
          price: this.priceRef.current.value,
          tag: this.tagRef.current.value
        }
      });
      this.dateRef.current.value = '';
      this.nameRef.current.value = '';
      this.priceRef.current.value = '';
      this.tagRef.current.value = 1;
    }
    /*    createRequest(createCommidity, null, {
      commodity: {
        date: 1544590780430,
        name: this.nameRef.current.value,
        price: this.priceRef.current.value,
        tag: this.tagRef.current.value
      }
    });
 */
  };

  render() {
    const { tags } = this.state;
    return (
      <form className="add-commodities" onSubmit={this.onSubmit}>
        <input
          className="add-commodities__name"
          type="text"
          name="name"
          placeholder="Дата: дд.мм.гггг"
          ref={this.dateRef}
        />
        <input
          className="add-commodities__name"
          type="text"
          name="name"
          placeholder="Покупка"
          ref={this.nameRef}
        />
        <input
          className="add-commodities__price"
          type="text"
          name="price"
          placeholder="Цена"
          ref={this.priceRef}
        />
        <select className="add-commodities__tag" ref={this.tagRef}>
          {tags.map(item => (
            <option value={item.id} key={item.id}>
              {item.tag}
            </option>
          ))}
        </select>
        <input className="add-commodities__button" type="submit" value="Добавить" />
      </form>
    );
  }
}
