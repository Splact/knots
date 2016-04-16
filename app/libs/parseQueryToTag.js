export default (query) => {
  if (!query) {
    return false;
  }

  const deniedChars = /[^a-z0-9]/g;
  const lowerQuery = query.toLowerCase();

  return lowerQuery.replace(deniedChars, '');
};
