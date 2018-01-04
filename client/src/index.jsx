import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: JSON.stringify({username: term}),
      contentType: 'application/json',
      success: () => {

        this.getData();
        console.log('success!');
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }

  getData () {
    var app = this;
    $.ajax({
      url: '/repos',
      method: 'GET',
      contentType: 'application/json',
      success: (data) => {
          app.setState({
          repos: data
        })
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }


  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));