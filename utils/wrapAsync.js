// In this folder we add extra things like error handlers, wrapasync

module.exports = (fn) =>{
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    }
}