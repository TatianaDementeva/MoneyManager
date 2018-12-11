import React, { Component } from 'react';
import Task from '../task/task';
import AddTask from '../add-task/add-tasl';
import createRequest from '../core/create-request';
import { fetchTasks, createTask } from '../core/api-config';
import classNames from '../class-names/class-names';

class Tasks extends Component {
  state = {
    isLoading: true,
    tasks: [
      /* { id: '1', text: 'React', isCompleted: true },
      { id: '2', text: 'Инициализация', isCompleted: true },
      { id: '3', text: 'Создание компонентов', isCompleted: false },
      { id: '4', text: 'Props', isCompleted: false },
      { id: '5', text: 'State', isCompleted: true } */
    ]
  };

  componentDidMount() {
    createRequest(fetchTasks).then((response) => {
      if (response.status === 'OK') {
        this.setState({ isLoading: false, tasks: response.data });
      }
      console.log(response);
    });
  }

  toggleTask = (event) => {
    const { id } = event.currentTarget.dataset;
    console.log(`update task-${id}`);
    this.setState(state => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      })
    }));
  };

  addTask = (text) => {
    this.setState({ isLoading: true });
    createRequest(createTask, null, { text }).then(({ status, data }) => {
      if (status === 'OK') {
        this.setState(({ tasks }) => ({
          isLoading: false,
          tasks: tasks.concat(data)
        }));
      }
    });
  };

  render() {
    const { tasks, isLoading } = this.state;
    return (
      <div className={classNames('tasks', { loading: isLoading })}>
        {tasks.map(task => (
          <Task task={task} toggleTask={this.toggleTask} key={task.id} />
        ))}
        <AddTask addTask={this.addTask} />
      </div>
    );
  }
}

export default Tasks;
