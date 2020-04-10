
// middleware that is specific to this router
  const timeLog = function(req,res,next){
      //   console.log(`${req.method} request from ${req.header('user-agent')}  at ${Date(Date.now()).toString()}`)
      console.log(`${req.method} request from ${req.get('host')+req.originalUrl}  at ${Date(Date.now()).toString()}`)
      next()
  }

  module.exports = timeLog