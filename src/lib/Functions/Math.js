// BUTI Corp All right Reserved ©
// Son That Ton
// john@buti.io

// ------------------------------------------------------
// Return the value rounded up into an integer
// 11.40 -> 12
// 10.5 -> 11
const _roundUp = value => Math.ceil(parseFloat(value));

// ------------------------------------------------------
// Return the value rounded up into an integer
// 10.4 -> 10
// 10.6 -> 11
const _round = value => Math.round(parseFloat(value));

export default { _roundUp, _round };
