import React from 'react';
import classnames from 'classnames';
import Prompt from './Prompt';
import SearchAction from '../actions/SearchActions';
import MarkerActions from '../actions/MarkerActions';

export default class SearchBox extends React.Component {

  state = {};

  componentWillMount() {
    //const { results } = this.props;
  }

  render = () => {

    const { results } = this.props;

    // defining element css classes
    const styles = {
      searchBox: classnames('search-box'),
      results: classnames({
        'search-box--results': true,
        'search-box--results--hidden': results.length === 0
      }),
      topicResult: classnames('search-box--topic-result')
    };

    return (
      <div className={styles.searchBox}>
        <Prompt
          placeholder={'Search tags'}
          size={'big'}
          icon={'search'}
          onChange={this.handleChange}
          empty={true} />
        <ul className={styles.results}>{
          results.map(result =>
            <li
              className={styles.topicResult}
              key={result.tag}
              onClick={this.handleResultClick.bind(this, { tag: result.tag })}>#{result.tag} ({result.usersCount})</li>
          )
        }</ul>
      </div>
    );
  };

  handleChange({ newText }) {
    if (newText.length < 3) {
      SearchAction.emptyResults();
    } else {
      SearchAction.searchTopics({ q: newText });
    }
  }

  handleResultClick({ tag }) {
    console.log(tag);
    MarkerActions.loadMarkers({ tag });
  }
}
