onmessage = function (event) {
  const { password, maxLength } = event.data;
  const allowedCharacters = "0123456789";

  let candidate = '';
  let passwordFound = false;

  const recursiveGenerate = (remainingLength) => {
    if (remainingLength === 0) {
      if (candidate === password) {
        passwordFound = true;
        postMessage({ found: true, candidate });
        return;
      }
      return;
    }
    for (const char of allowedCharacters) {
      candidate += char;
      postMessage({ tryingCandidate: candidate });
      recursiveGenerate(remainingLength - 1);
      candidate = candidate.slice(0, -1);
      if (passwordFound) return;
    }
  };

  recursiveGenerate(maxLength);

  if (!passwordFound) {
    postMessage({ found: false, candidate: '' });
  }
};
