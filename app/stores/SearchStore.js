import alt from '../libs/alt';
import SearchActions from '../actions/SearchActions';
import { webApi, SEARCH_TOPICS } from '../libs/webApi';

class SearchStore {
  constructor() {
    this.bindActions(SearchActions);

    this.results = [];
  }

  searchTopics({ q }) {
    webApi(SEARCH_TOPICS, { q });
  }
  searchTopicsSuccess({ results }) {
    // TODO: any check and/or ops

    this.setState({ results });

    return results;
  }
}

export default alt.createStore(SearchStore, 'SearchStore');
