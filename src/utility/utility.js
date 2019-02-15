const CONNECTION_TIMEOUT_MESSAGE = "Connection timeout";
const NETWORK_ERROR_MESSAGE = "NetworkError when attempting to fetch resource.";

function isConnectionError(error) {
  return (
    error.message === CONNECTION_TIMEOUT_MESSAGE ||
    error.message === NETWORK_ERROR_MESSAGE
  );
}

function getShuffledArray(sourceArray) {
  const array = [...sourceArray];
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomNumber(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomElements(array, count) {
  if (count > array.length) {
    throw new Error(
      "getRandomIndices: count must be less or equal the array length!"
    );
  }

  const shuffled = getShuffledArray(array);
  return shuffled.splice(0, count);
}

function getRandomNumber(maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
}

function fetchTimeout(url, options, timeout = 10000) {
  return Promise.race([
    fetch(url, options),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error(CONNECTION_TIMEOUT_MESSAGE)), timeout)
    )
  ]);
}

export {
  isConnectionError,
  getShuffledArray,
  getRandomElements,
  getRandomNumber,
  fetchTimeout
};
