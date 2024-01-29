module.exports = (err, req, res, next) => {
  console.log(err);
  let errStatus = err.message.split("::")[1] || 500;
  let errMessage = err.message.split("::")[0];
  res.status(+errStatus).json({ error: errMessage });
};
