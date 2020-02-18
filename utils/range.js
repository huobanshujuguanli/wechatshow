function range(id) {
  var rangeJson = {};
  var x = "";

  switch (id) {
    case 1:
      x = "天";
      break;
    case 2:
      x = "月";
      break;
  }
  rangeJson.x = x;
  return rangeJson;
}

module.exports = {
  range: range
}