import React, { Component } from 'react';
import tagCloud from 'static-tag-cloud';
import Cloud from './tagsCloud.js';

class Tags extends Component {
  render() {
    const tags = [
      { id: 'tag', count: 1 },
      { id: 'cat', count: 2 },
      { id: 'dog', count: 3 },
      { id: 'tag', count: 1 },
      { id: 'cat', count: 3 },
      { id: 'dog', count: 2 },
      { id: 'tag', count: 1 },
      { id: 'kot', count: 2 },
      { id: 'dog', count: 3 }
    ];
    console.log(tags);
    return (
      <React.Fragment>
        <div id="tagscloud">
          {tags.map(tag => (
            <a className={`tagc${tag.count}`}>{tag.id}</a>
          ))}
        </div>
        <Cloud />
      </React.Fragment>
    );
  }
}
export default Tags;
