import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Prompt from './Prompt';
import { browserHistory } from 'react-router';
import { searchTopics, emptyResults } from '../actions/search';
import { fetch, create } from '../actions/topic';

function mapStateToProps(state) {
  const { results, query, isSearching } = state.search;

  return {
    results,
    query,
    isSearching
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onResultClick: (tag) => {
      const path = `/${tag}`;
      browserHistory.push(path);

      dispatch(fetch(tag));
      dispatch(emptyResults());
    },
    onTopicCreation: (tag, results) => {
      if ((tag.length > 2) && (!results.length)) {
        dispatch(create(tag));
        dispatch(emptyResults());
      }
    },
    onQueryChange: ({ newText }) => {
      if (newText.length < 3) {
        dispatch(emptyResults());
      } else {
        dispatch(searchTopics(newText));
      }
    }
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchBox extends React.Component {

  render = () => {

    const { results, query, isSearching, onResultClick, onTopicCreation, onQueryChange } = this.props;

    // defining element css classes
    const styles = {
      searchBox: classnames('search-box'),
      results: classnames({
        'search-box--results': true,
        'search-box--results--hidden': !query
      }),
      topicResult: classnames('search-box--topic-result'),
      createTopic: classnames('search-box--create-topic')
    };

    const topicCreationHandler = onTopicCreation.bind(this, query, results);
    const queryChangeHandler = onQueryChange;

    let ulChildren;
    if (results.length) {
      ulChildren = results.map(result => {
        const resultClickHandler = onResultClick.bind(this, result.tag);
        return (
          <li
            className={styles.topicResult}
            key={result.tag}
            onClick={resultClickHandler}>#{result.tag} ({result.usersCount})</li>
        );
      });
    } else if (query && !isSearching) {
      ulChildren = (
        <li
          className={styles.createTopic}
          key={query}
          onClick={topicCreationHandler}>Be the first on <strong>#{query}</strong></li>
      );
    }

    return (
      <div className={styles.searchBox}>
        <Prompt
          placeholder={'Search tags'}
          size={'big'}
          icon={'search'}
          onChange={queryChangeHandler}
          onEnter={topicCreationHandler}
          empty={true} />
        <ul className={styles.results}>{ulChildren}</ul>
      </div>
    );
  };
}
