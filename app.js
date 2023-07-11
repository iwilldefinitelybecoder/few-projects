const {Worker} = require('worker_threads')
        
                    
const dofib = (iter)=>
  new Promise((resolve,reject)=>{
    const start = Date.now()
    const worker  = new Worker('./fib.js',{
      workerData:{iter}
    }) 
    worker.once('message',(data)=>{
      console.log(`endtime ${Date.now()-start}ms for thread ID:[${worker.threadId}]`)
      resolve(data)

    })
    worker.once('error',(err)=>reject(err))
  })

function  main(){
  const start = Date.now()
  Promise.all([
    dofib(40),
    dofib(40),
    dofib(40),
    dofib(40),
    dofib(40),
    dofib(40),
    dofib(40),
    dofib(40),
    
  ])
  .then(res=>{console.log(res)
    console.log(`finished time ${Date.now() -start}ms`)
    
  })
  .catch(err=>console.log(err))
    
}
 
main()