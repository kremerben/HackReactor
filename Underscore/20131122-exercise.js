/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  _.identity = function(val) {
        return val;
  };

   _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  _.last = function(array, n) {
    if (n===0) {
      return [];
    } else {
        return n === undefined ? array[array.length-1] : array.slice(0 - n);
      }
  };

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i=0;i<collection.length;i++) {
       iterator(collection[i], i, collection);
     }
    } else  {
      for (var val in collection) {
        iterator(collection[val],val,collection);
      }
    }
  };

  _.eachOBJECTSECTIONNEEDSHELP = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i=0;i<collection.length;i++) {
       iterator(collection[i], i, collection);
     }
    } else if (collection.length !== undefined) {
      iterator(collection, iterator, collection);
    }  else {
      for (var j=0;j<collection.length;j++) {
        for (var val in collection[j]) {
          iterator(collection[val],val,collection);
        }
      }
    }
  };


  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  _.filter = function(collection, test) {
      var results = [];
      _.each(collection, function(num){
        if (test(num)) {
          results.push(num);
        }
      });
      return results;
  };


  _.filterALSOWORKS = function(collection, test) {
      var results = [];
      for (var i=0;i<collection.length;i++) {
        if (test(collection[i])) {
          results.push(collection[i]);
        }
      }
      return results;
  };



  // Return all elements of an array that don't pass a truth test.
  _.rejectDOESNTWORK = function(collection, test) {
      var falseTest = !(test);
      _.filter(collection, falseTest);
  };


  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
      var results = [];
      _.each(collection, function(num){
        if (!test(num)) {
          results.push(num);
        }
      });
      return results;
  };

  _.uniqOLD = function(array) {

    var newArray = array.slice();
// check if is in both array and newArray, if in both, delete one
for (var i=0;i<newArray.length;i++) {
  if (newArray[i]===newArray[i+1]) {
    newArray.splice(i,1);
  }
}
return newArray.slice().sort(function(a,b) {
      if (a>b) {
        return 1;
      } else if (a<b) {
        return -1;
      } else {
        return 0;
      }
    });
};

  _.uniq = function(array, test, iterator) {
//var newArray = [];
var newArray = array.slice();
for (var i=0;i<newArray.length;i++) {
    for (var j=0;j<newArray.length;j++) {
      if (i===j){
      } else if (newArray[i]===newArray[j]) {
       newArray.splice(i,1);
      }
    }
}
if (test) {
  return newArray;
} else if (typeof iterator === "function") {
return newArray.slice().sort(iterator);
} else {
return newArray.slice().sort(function(a,b) {
      if (a>b) {
        return 1;
      } else if (a<b) {
        return -1;
      } else {
        return 0;
      }
    });
}
};

  _.map = function(array, iterator) {
    var copyArray = array.slice();
    var resultArray =[];
    _.each(copyArray, function(sum) {
          resultArray.push(iterator(sum));
    });
    return resultArray;
  };

  _.mapALSOWORKS = function(array, iterator) {
    var copyArray = array.slice();
    for (var i=0;i<copyArray.length;i++) {
      copyArray[i] = iterator(copyArray[i]);
    }
    return copyArray;
};

  _.pluck = function(array, propertyName) {
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  _.invoke2 = function(collection, functionOrKey, args) {
      //var returnArray = [];
      var invokeFunction = function() {
      return collection[functionOrKey].apply(args);
      };
      return invokeFunction(args);
  };

  _.invoke1 = function(collection, functionOrKey, args) {
      //var returnArray = [];
    return _.map(collection, function(value){
      var tempFunction = value[functionOrKey];
      tempFunction.apply(collection,args);
    });

  };
  _.invoke = function(collection, functionOrKey, args) {
      var returnArray = [];
      if (typeof functionOrKey === "function") {
    for (var i=0;i<collection.length;i++) {
      var pushMe = functionOrKey.apply(collection[i],args);
    //  var functionToUse = collection.functionOrKey;
      returnArray.push(pushMe);
}
} else {
      for (var j=0;j<collection.length;j++) {
        var providedMethod = collection[j][functionOrKey];
      var pushMeAgain = providedMethod.apply(collection[j],args);
      //var functionToUseAgain = collection.functionOrKey;
      returnArray.push(pushMeAgain);
}
}
return returnArray;
  };

  _.invokeNEWTRYMEFIRST = function(collection, functionOrKey, args) {
      if (typeof functionOrKey === "function") {
       return _.map(collection, function(num){
          return functionOrKey.apply(num,args);
        });
      } else {
      return  _.map(collection, function(num) {
          return sum[functionOrKey].apply(num,args);
        });
      }
 };

  _.invokeNEWTRYMENEXT = function(collection, functionOrKey, args) {
      return  _.map(collection, function(num) {
        if (typeof functionOrKey === "function"){
          return functionOrKey.apply(num,args);
        } else {
          return sum[functionOrKey].apply(num,args);
        }
      });
};


  _.reduce = function(collection, iterator, accumulator) {
      _.each(collection, function(num) {
        accumulator =  iterator(accumulator, num);
    });
return accumulator;
  };


  _.reduceALSOYES = function(collection, iterator, accumulator) {
//var returnVar;
for (var i=0;i<collection.length;i++) {
  accumulator = iterator(accumulator,collection[i]);
}
return accumulator;
};

  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  _.every = function(collection, iterator) {
var returnTrue = true;
if (collection.length > 0 && iterator !== undefined) {
      _.each(collection, function(num) {
        if (iterator(num) && returnTrue === true) {
          returnTrue = true;
        } else if (iterator(num) && returnTrue === false) {
          returnTrue = false;
        } else {
          returnTrue = false;
        }
    });
} else if (collection.length > 0 && iterator === undefined) {
      _.each(collection, function(num) {
        if ((num) && returnTrue === true) {
          returnTrue = true;
        } else if ((num) && returnTrue === false) {
          returnTrue = false;
        } else {
          returnTrue = false;
        }
    });
} else {
  return true;
}
return returnTrue;
  };


  _.someWORKS = function(collection, iterator) {
var returnTrue;
if (collection.length > 0 && iterator !== undefined) {
      _.each(collection, function(num) {
        if (!iterator(num) && (returnTrue === undefined || returnTrue === false)) {
          returnTrue = false;
        } else if (iterator(num) || returnTrue === true) {
          returnTrue = true;
        } else {
          returnTrue = true;
        }
    });
} else if (collection.length > 0 && iterator === undefined) {
      _.each(collection, function(num) {
        if ((num) || returnTrue === true) {
          returnTrue = true;
        } else if ((num) && returnTrue === false) {
          returnTrue = false;
        } else {
          returnTrue = false;
        }
    });
} else {
  return false;
}
return returnTrue;
  };

  _.some = function(collection, iterator) {
//could use some cleaning up
var returnTrue = false;
if (collection.length > 0 && iterator !== undefined) {
      _.each(collection, function(num) {
        if (!iterator(num) &&  returnTrue === false) {
          returnTrue = false;
        } else if (iterator(num) || returnTrue === true) {
          returnTrue = true;
        } else {
          returnTrue = true;
        }
    });
} else if (collection.length > 0 && iterator === undefined) {
      _.each(collection, function(num) {
        if ((num) || returnTrue === true) {
          returnTrue = true;
        } else if ((num) && returnTrue === false) {
          returnTrue = false;
        } else {
          returnTrue = false;
        }
    });
} else {
  return false;
}
return returnTrue;
  };


 _.extendasd = function (destination, sourceA, sourceB) {
//cheats but works for 1 dest and 2 sources
//need to iterate
for (var prop in sourceA) {
    destination[prop] = sourceA[prop];
}
for (prop in sourceB) {
    destination[prop] = sourceB[prop];
}
return destination;
};


  _.extend = function(destination) {
    _.each(Array.prototype.slice.call(arguments, 1), function(num) {
      for (var prop in num) {
      destination[prop] = num[prop];
}
      });
return destination;
  };

  _.extendUNDERSCORE = function(obj) {
    _.each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };


  _.defaults = function(destination) {
    _.each(Array.prototype.slice.call(arguments, 1), function(num) {
      for (var prop in num) {
        if (destination[prop] === undefined) {
          destination[prop] = num[prop];
        }
      }
    });
return destination;
  };

  _.once = function(func) {
    var alreadyCalled = false;
    var result;
    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  _.memoize = function(func) {
    var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    if (func.hasOwnProperty(args)) {
    } else {
      func.args = func.apply(this, arguments);
      }
    return func.args;
  }
};




//check old orig versions of delay - may be correct

_.delay = function(func, wait) {
  console.log("test");
  var args = Array.prototype.slice.call(arguments, 2);
  var callFunc = function() {
    return Function.prototype.func.apply(null, args);
  };
  return setTimeout(callFunc, wait);
};

  _.delay???? = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    var callFunc = function(args) {
    return func.apply(args);
};
      return setTimeout(callFunc, wait);
};


  _.delayx = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 1);
    return setTimeout(function() { return func.apply(args);}, wait);

  };
  _.delayxx = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  _.shuffle = function(array) {
    var oldArray = array.slice();
    var shuffledArray = [];
    while (oldArray.length>0) {
      shuffledArray.push(oldArray.splice(Math.floor(Math.random()*oldArray.length)));
    }
    return shuffledArray;
  };

  _.sortBy2NDAND4THWORK = function(collection, iterator) {
      var returnArray = [];
      var compare = function (a, b){
  if (a > b) {
  return 1;
  } else if (a < b) {
  return -1;
  }
  return 0;
};
      if (typeof iterator === "function") {
        _.each(collection,iterator);
        returnArray = collection.sort();
      } else if (typeof iterator === "string") {
        returnArray = collection.sort(collection.iterator);
      }
      return returnArray;
  };

  _.sortBy = function(collection, iterator) {
    var returnArray = [];
    if (typeof iterator === "string") {
      var compare = function (a,b){
        if (a.iterator > b.iterator) {
          return 1;
        } else if (a.iterator < b.iterator) {
          return -1;
        }
        return 0;
      };
      returnArray = collection.sort(compare);
        //returnArray = collection.sort(collection.iterator);
      } else if (typeof iterator === "function") {
        _.each(collection,iterator);
        returnArray = collection.sort();
      };
      return returnArray;
    };




  _.flatten1 = function(nestedArray, result) {
    if (result === undefined) {
      result = [];
    }
    if(Array.isArray(nestedArray)) {
    result = _.map(nestedArray, function(num) {
      return num;
    });
  };
    return result;
  };

  _.flatten = function(nestedArray, result) {
    //currently not flattening
    if (result === undefined) {
      result = [];
    }


    if(Array.isArray(nestedArray)) {
    result = _.map(nestedArray, function(num) {
      return num;
    });
  };


    return result;
};



  _.zip = function() {
//object has no method slice
      var returnArray = [];
      for (var i=0;i<arguments.length;i++){
        //possinbly need an if statement if no value at argument[i][j]?
        returnArray[i] = _.pluck(arguments,i);
      }
      return returnArray;
  };






  _.intersection = function() {
    var returnArray = [];



    return returnArray;
  };

  _.difference = function(array) {
  };

  _.throttle = function(func, wait) {
  };

}).call(this);
