import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class AddTask extends Component {
  textRef = createRef();

  onSubmit = (event) => {
    const { addTask } = this.props;

    event.preventDefault();

    addTask(this.textRef.current.value);
    this.textRef.current.value = '';

    console.log(this.textRef.current);
  };

  render() {
    return (
      <form className="add-task" onSubmit={this.onSubmit}>
        <input className="add-task_field" type="text" name="text" ref={this.textRef} />
        <input className="add-task_button" type="submit" value="Добавить" />
      </form>
    );
  }
}
AddTask.propTypes = {
  addTask: PropTypes.func.isRequired
};
export default AddTask;
