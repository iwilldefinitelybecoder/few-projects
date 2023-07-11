const {workerData,parentPort} = require('worker_threads')


function fibonacci(n){
    return n < 1?0
        :n <=2?1
        :fibonacci(n-1)+fibonacci(n-2)
  }
  
  const values = fibonacci(workerData.iter)

  parentPort.postMessage(values) 