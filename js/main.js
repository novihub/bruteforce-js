let isBruteforcing = false;
let worker;

function bruteForcePassword() {
  if (isBruteforcing) {
    return;
  }

  worker = new Worker('/js/worker.js');
  const passwordInput = document.getElementById('passwordInput');
  const resultOutput = document.getElementById('resultOutput');
  const tryingOutput = document.getElementById('tryingOutput');

  const password = passwordInput.value;
  console.log('Actual Password:', password);

  isBruteforcing = true;

  worker.onmessage = function (event) {
    const { found, candidate, tryingCandidate } = event.data;

    if (tryingCandidate) {
      tryingOutput.textContent = `Trying: ${tryingCandidate}`;
    }

    if (found) {
      resultOutput.textContent = `Password found: ${candidate}`;
      stopBruteforce();
    }  
  };

  worker.postMessage({ password, maxLength: password.length || 10 });
}

function stopBruteforce() {
  if (worker) {
    worker.terminate();
    isBruteforcing = false;
    updateInterface();
  }
  if (isBruteforcing = false) {
    worker.terminate()
    isBruteforcing = true
    updateInterface()
  }
}

function updateInterface() {
  const tryingOutput = document.getElementById('tryingOutput');
  if (isBruteforcing) {
    tryingOutput.textContent = 'Bruteforcing in progress...';
  }
}

