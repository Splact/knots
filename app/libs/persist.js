import makeFinalStore from 'alt-utils/lib/makeFinalStore';

export default function(alt, storage, storeName) {
  const finalStore = makeFinalStore(alt);

  try {
    let stores = JSON.parse(storage.get(storeName));

    if (stores) {
      stores.TopicStore = {
        tag: null,
        checkins: []
      };
    }

    stores = JSON.stringify(stores);

    alt.bootstrap(stores);
  } catch (e) {
    console.error('Failed to bootstrap data', e);
  }

  finalStore.listen(() => {
    if (!storage.get('debug')) {
      storage.set(storeName, alt.takeSnapshot());
    }
  });
}
