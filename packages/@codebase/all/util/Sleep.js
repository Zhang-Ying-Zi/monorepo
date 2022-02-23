export default class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }

  // eslint-disable-next-line no-unused-vars
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(() => resolve(Date.now() - startTime), this.timeout);
  }
}
