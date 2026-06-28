// This higher order function takes another function as a parameter and returns another function which is calling the callback function(the function which we got as parameter) with catch to catch async errors

function catchAsyncError(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

export { catchAsyncError };
