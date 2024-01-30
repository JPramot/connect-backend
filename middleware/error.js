module.exports = (err, req, res, next) => {
  console.log(err);
  let errStatus = err.message.split("::")[1] || 500;
  let errMessage = err.message.split("::")[0];
  errStatus = err.message.includes("no Teacher found") ? 400 : errStatus;
  errStatus = err.message.includes("no Student found") ? 400 : errStatus;
  res.status(+errStatus).json({ error: errMessage });
};
