function delayMiddleware(time = 0) {
  return (req, res, next) => {
    if (time <= 0) {
        return next();
    }

    setTimeout(() => {
        next();
    }, time);
  }
}

export default delayMiddleware;