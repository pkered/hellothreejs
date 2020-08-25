class CV {
  _dispatch(event) {
    const { msg } = event
    this._status[msg] = ['loading']
    this.worker.postMessage(event)
    return new Promise((res, rej) => {
      let interval = setInterval(()=>{
        const status = this._status[msg]
        console.log(status)
        if (status[0] === 'done') res(status[1])
        if (status[0] === 'error') rej(status[1])
        if (status[0] !== 'loading') {
          delete this._status[msg]
          clearInterval(interval)
        }
      }, 50)
    });
  }
  load() {
    if (window.Worker) {
      this._status = {}
      this.worker = new Worker('../static/js/cv.worker.js')
      this.worker.onmessage = e => this._status[e.data.msg] = ['done', e]
      this.worker.onerror = e => this._status[e.data.msg] = ['error', e]
      return this._dispatch({ msg: 'load' })
    } else {
      alert('Your browser does not support Web Workers');
    }
  }
  greyscaleVideo( payload ) {
    return this._dispatch({ msg: 'greyscale', payload })
  }
}

export default new CV();