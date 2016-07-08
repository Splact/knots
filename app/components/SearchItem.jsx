import React, { PropTypes } from 'react';
import classnames from 'classnames';

const propTypes = {
  tag: PropTypes.string,
  checkinsCount: PropTypes.number,
  isCreate: PropTypes.bool,
};
const defaultProps = {};

const SearchItem = ({ tag, checkinsCount, isCreate, ...props }) => {
  // defining element css classes
  const styles = {
    topicResult: classnames('search-box--topic-result'),
    createTopic: classnames('search-box--create-topic'),
  };

  if (!isCreate) {
    return (
      <li
        className={styles.topicResult}
        {...props}
      >#{tag} ({checkinsCount})</li>
    );
  }
  return (
    <li
      className={styles.createTopic}
      {...props}
    >Be the first on <strong>#{tag}</strong></li>
  );
};

SearchItem.propTypes = propTypes;
SearchItem.defaultProps = defaultProps;

export default SearchItem;
