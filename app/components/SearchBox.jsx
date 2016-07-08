/* eslint "react/prefer-stateless-function": "off" */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Prompt from './Prompt';
import SearchItem from './SearchItem';
import { browserHistory } from 'react-router';
import { searchTopics, emptyResults } from '../actions/search';
import { fetch, create } from '../actions/topic';
import parseQueryToTag from '../libs/parseQueryToTag';

const propTypes = {
  results: PropTypes.array,
  query: PropTypes.string,
  isSearching: PropTypes.bool,
  onResultClick: PropTypes.func,
  onTopicCreation: PropTypes.func,
  onQueryChange: PropTypes.func,
};
const defaultProps = {};

function mapStateToProps(state) {
  const { results, query, isSearching } = state.search;

  return {
    results,
    query,
    isSearching,
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
        const path = `/${tag}`;
        browserHistory.push(path);
      }
    },
    onQueryChange: ({ newText }) => {
      if (newText.length < 3) {
        dispatch(emptyResults());
      } else {
        dispatch(searchTopics(newText));
      }
    },
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class SearchBox extends React.Component {

  render = () => {
    const {
      results,
      query,
      isSearching,
      onResultClick,
      onTopicCreation,
      onQueryChange,
    } = this.props;

    // defining element css classes
    const styles = {
      searchBox: classnames('search-box'),
      results: classnames({
        'search-box--results': true,
        'search-box--results--hidden': !query,
      }),
      pendingSearch: classnames('search-box--pending-search'),
    };

    const sanitizedTag = parseQueryToTag(query);
    const topicCreationHandler = onTopicCreation.bind(this, sanitizedTag, results);
    const queryChangeHandler = onQueryChange;

    let ulChildren;
    if (results.length) {
      ulChildren = results.map(result => {
        const resultClickHandler = onResultClick.bind(this, result.tag);
        return (
          <SearchItem
            key={result.tag}
            tag={result.tag}
            checkinsCount={result.usersCount}
            onClick={resultClickHandler}
          />
        );
      });
    } else if (query && !isSearching) {
      ulChildren = (
        <SearchItem
          key={query}
          tag={sanitizedTag}
          isCreate
          onClick={topicCreationHandler}
        />
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
          empty
        />
        <ul className={styles.results}>{ulChildren}</ul>
      </div>
    );
  };
}

SearchBox.propTypes = propTypes;
SearchBox.defaultProps = defaultProps;

export default SearchBox;
