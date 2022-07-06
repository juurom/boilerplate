if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}
else{
    module.exports = require('./dev');
}
//process.envNODE_ENV는 환경 변수,
//development일때는 development
//deploy 이후에는 production