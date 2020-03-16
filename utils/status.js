function status(id) {
  var statusJson = {};
  var x = "";

  switch (id) {
    case 0:
      x = "待支付";
      break;
    case 1:
      x = "已付款";
      break;
  }
  statusJson.x = x;
  return statusJson;
}

module.exports = {
  status: status
}