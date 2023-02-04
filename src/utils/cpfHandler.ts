function formatCpf(cpf: string) {
  return cpf.replaceAll('.', '').replace('-', '');
}

function calculateCheckDigit(referenceRemainder: number) {
  let checkDigit: number;

  if (referenceRemainder < 2) {
    checkDigit = 0;
  } else {
    checkDigit = 11 - referenceRemainder;
  }

  return checkDigit;
}

function calculateRemainder(weightedSum: number) {
  return weightedSum % 11;
}

function calculateWeightedSum(cpfDigits: string) {
  let weightedSum = 0;
  let multiplier = 2;
  for (let i = cpfDigits.length - 1; i >= 0; i--) {
    const digit = parseInt(cpfDigits[i]);
    weightedSum += digit * multiplier;
    multiplier++;
  }

  return weightedSum;
}

function calculateFirstCheckDigit(cpfFirstNineDigits: string) {
  const weightedSum = calculateWeightedSum(cpfFirstNineDigits);
  const referenceRemainder = calculateRemainder(weightedSum);
  const correctFirstCheckDigit = calculateCheckDigit(referenceRemainder);
  return correctFirstCheckDigit;
}

function calculateSecondCheckDigit(cpfFirstTenDigits: string) {
  const weightedSum = calculateWeightedSum(cpfFirstTenDigits);
  const referenceRemainder = calculateRemainder(weightedSum);
  const correctSecondCheckDigit = calculateCheckDigit(referenceRemainder);
  return correctSecondCheckDigit;
}

function validateCpf(formatedCpf: string) {
  const cpfFirstNineDigits = formatedCpf.slice(0, 9);
  const cpfFirstCheckDigit = parseInt(formatedCpf[9]);
  const correctFirstCheckDigit = calculateFirstCheckDigit(cpfFirstNineDigits);

  if (cpfFirstCheckDigit !== correctFirstCheckDigit) {
    return false;
  }

  const cpfFirstTenDigits = formatedCpf.slice(0, 10);
  const cpfSecondCheckDigit = parseInt(formatedCpf[10]);
  const correctSecondCheckDigit = calculateSecondCheckDigit(cpfFirstTenDigits);

  if (cpfSecondCheckDigit !== correctSecondCheckDigit) {
    return false;
  }

  return formatedCpf;
}

export { formatCpf, validateCpf };
