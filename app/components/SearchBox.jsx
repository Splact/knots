import React from 'react';
import classnames from 'classnames';
import Prompt from './Prompt';
import { browserHistory } from 'react-router';
import SearchAction from '../actions/SearchActions';
import TopicActions from '../actions/TopicActions';

export default class SearchBox extends React.Component {

  render = () => {

    const { results, query, isPending } = this.props;

    // defining element css classes
    const styles = {
      searchBox: classnames('search-box'),
      results: classnames({
        'search-box--results': true,
        'search-box--results--hidden': !query
      }),
      topicResult: classnames('search-box--topic-result'),
      createTopic: classnames('search-box--create-topic'),
      pendingSearch: classnames('search-box--pending-search')
    };

    let ulChildren = null;

    if (!isPending) {
      if (results.length) {
        ulChildren = results.map(result =>
          <li
            className={styles.topicResult}
            key={result.tag}
            onClick={this.handleResultClick.bind(this, { tag: result.tag })}>#{result.tag} ({result.usersCount})</li>
        );
      } else {
        const handleTopicCreation = this.handleTopicCreation.bind(this, { newText: query });
        ulChildren = (
          <li
            className={styles.createTopic}
            key={query}
            onClick={handleTopicCreation}>Be the first on <strong>#{query}</strong></li>
        );
      }
    }

    return (
      <div className={styles.searchBox}>
        <Prompt
          placeholder={'Search tags'}
          size={'big'}
          icon={'search'}
          onChange={this.handleChange}
          onEnter={this.handleTopicCreation}
          empty={true} />
        <ul className={styles.results}>{ulChildren}</ul>
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
    const path = `/${tag}`;
    browserHistory.push(path);
    TopicActions.read({ tag });
    SearchAction.emptyResults();
  }

  handleTopicCreation({ newText }) {
    const { results } = this.props;
    const path = `/${newText}`;

    if ((newText.length > 2) && (!results.length)) {
      TopicActions.create({tag: newText});
      browserHistory.push(path);
      SearchAction.emptyResults();
    }
  }
}
