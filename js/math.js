
const operations = {};

//this function return the sum among v1 and v2
operations.sum = (v1, v2) => {
  return v1 + v2;
}

//this function return the subtract among v1 and v2
operations.sub = (v1, v2) => {
  return v1 - v2;
}

//this function return the multiple among v1 and v2
operations.mult = (v1, v2) => {
  return v1 * v2;
}

//this function return the div among v1 and v2
operations.div = (v1, v2) => {
  return (v2 != 0) ? v1 / v2 : 0;
}

//this function return the rest of the division among v1 and v2
operations.mod = (v1, v2) => {
  return (v2 != 0) ? v1 % v2 : 0;
}

//this function return the value square root
operations.square_root = (value) => {
  return (value > 0) ? Math.sqrt(value) : 0;
}

export default operations;
