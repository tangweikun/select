/* eslint no-console: 0 */

import React from 'react';
import Select, { Option } from 'so-select';
import 'so-select/assets/index.less';
import { fetch } from './common/tbFetchSuggest';
import ReactDOM from 'react-dom';

const Search = React.createClass({
  getInitialState() {
    return {
      data: [],
      value: '',
    };
  },

  onKeyDown(e) {
    if (e.keyCode === 13) {
      console.log('onEnter', this.state.value);
      this.jump(this.state.value);
    }
  },

  onSelect(value) {
    console.log('select ', value);
    this.jump(value);
  },

  jump(v) {
    console.log('jump ', v);
    // location.href = 'https://s.taobao.com/search?q=' + encodeURIComponent(v);
  },

  fetchData(value) {
    this.setState({
      value,
    });
    fetch(value, (data) => {
      this.setState({
        data,
      });
    });
  },

  render() {
    const data = this.state.data;
    const options = data.map((d) => {
      return <Option key={d.value}>{d.text}</Option>;
    });
    return (<div>
      <h2>suggest</h2>

      <div onKeyDown={this.onKeyDown}>
        <Select
          style={{ width: 500 }}
          combobox
          value={this.state.value}
          placeholder="placeholder"
          searchPlaceholder="searchPlaceholder"
          defaultActiveFirstOption={false}
          showArrow={false}
          notFoundContent=""
          onChange={this.fetchData}
          onSelect={this.onSelect}
          filterOption={false}
        >
          {options}
        </Select>
      </div>
    </div>);
  },
});

ReactDOM.render(<Search />, document.getElementById('__react-content'));
