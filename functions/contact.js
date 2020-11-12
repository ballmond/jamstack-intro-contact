exports.handler = function (event, _context, callback) {
  console.log(event);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ boop: true }),
  });
};
