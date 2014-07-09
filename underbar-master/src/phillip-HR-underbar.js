var _ = {};

(function() {

  // Return an array of the last n elements of an array. If n is undefined,
  // return just the last element.
  _.last = function(array, n) {
if (n === undefined) {
  return array[array.length - 1];
}
if (n === 0) {
  return [];
}
if (n > array.length) {
return array;
}
var returnArray = [];
for (var i = array.length - n; i < array.length; i++ ) {
  returnArray.push(array[i]);
}

//returnArray = array.slice(0-n);

return returnArray;
  };

  // Like last, but for the first elements
  _.first = function(array, n) {
if (n === undefined) {
  return array[0];
}
if (n === 0) {
  return [];
}
if (n > array.length) {
return array;
}
var returnArray = [];
for (var i = 0; i < n; i++) {
  returnArray.push(array[i]);
}
return returnArray;
  };


  // Call iterator(value, key, collection) for each element of collection
  _.each = function(obj, iterator) {
if (obj.length) {
    for (var i = 0; i < obj.length; i++) {
      iterator(obj[i], i, obj);
    }
} else {
  for (var val in obj) {
    iterator(obj[val], val, obj)
  }
}
  };

  /*
   * TIP: Here's an example of a function that needs to iterate, which we've
   * implemented for you. Instead of using a standard `for` loop, though,
   * it uses the iteration helper `each`, which you will need to write.
   */

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;
    _.each(array, function(item, index) {
        if (item === target && result === -1) {
            result = index;
        }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
_.filter = function(collection, test) {
  var result = [];
  _.each(collection, function(num) {
    if (test(num)) {
      result.push(num);
    }
 })
 return result;
};

  // Return all elements of an array that don't pass a truth test.
_.reject = function(collection, test) {
    return _.filter(collection, function(val, key, obj) {
        return !test(val, key, obj);
    })
};

 
  // Produce a duplicate-free version of the array.

_.uniq = function(array) {
  var result = [];
  var sortArray = Array.prototype.sort.call(array);
  _.each(sortArray, function(val, key, obj) {
    if (!(val === obj[key+1])) {
      result.push(val);
    }
  })
return result;
};


_.map = function(list, iterator) {
    var result = [];
    _.each(list, function(num) {
        result.push(iterator(num));
    });
    return result;
};
  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages

  _.pluck = function(obj, propertyName) {
  return _.map(obj, function(object) {
        return object[propertyName];
    })
  };
  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName) {
    return _.map(list, function(obj) {
      if (typeof methodName === "function") {
        return methodName.apply(obj, arguments);
      } else {
        return obj[methodName].apply(obj, arguments);
      }
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(obj, iterator, initialValue) {
    initialValue = (initialValue === undefined) ? 0 : initialValue;
    _.each(obj, function(num) {
      initialValue = iterator(initialValue, num);
    })
    return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
     // TIP: A lot of iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
 _.contains = function(collection, target) {
return _.reduce(collection, function(val, item) {
  // val here is the initialValue being returned through each time - false in this case
  if (val) {
    //once we capture a true value, keep it i.e., the array does contain the value
    return true;
  } 
  return item === target;
  //check if the item - next value in the collection - contains the target - returns boolean to initialValue
} ,false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(obj, iterator) {
    return _.reduce(obj, function(val, item) {
        // val here is the initialValue being returned through each time - true at the start in this case
      return val && !!iterator(item);
      // !! converts boolean-like to boolean i.e. 1 === true
      // checks each time through obj, if ever false => always false because of &&
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.any = function(obj, iterator) {
    if (iterator === undefined) {
      iterator = function(a) { return a; };
    };
    return _.reduce(obj, function(val, item) {
        // val here is the initialValue being returned through each time - true at the start in this case
      return val || !!iterator(item);
    }, false);
  };


  /*
   * These are a couple of helpers for merging objects
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  _.extend = function(obj) {
    _.each(arguments, function(num) {
      for (var key in num) {
        obj[key] = num[key];
      };
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(num) {
      for (var key in num) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = num[key];
        }
      }
    });
    return obj;
  };


  /*s t
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {

// check for specific key
// if exists return key/value
// if doesn't exist - create and store
    var alreadyCalled = false;
    var result;
    return function() {
      if (alreadyCalled) {
        return result;
      }
      alreadyCalled = true;
      result = func.apply(this,arguments);
      return result;
    };
 };
      // TIP: These variables are stored in a `closure scope` (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.


    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.


        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.


      // The new function always returns the originally computed result.


  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

    //function that is called by a function
  _.memoize = function(func) {
    return function() {
     if (func.hasOwnProperty(arguments)) {
        return func[arguments];   
     }
     func[arguments] = func.apply(this, arguments);
     return func[arguments];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    setTimeout(function() { return func.apply(arguments) }, wait);

  };









  /*
   * Advanced collection operations
   */
  _.range = function(topNumber){
    for (var i = 0, range; i <= topNumber; i++) {
      range[i] = i;
    }
    return range;

  };
  
    // Shuffle an array.
  _.shuffle = function(obj) {


  };

  /* (End of pre-course curriculum) */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3]]
  _.zip = function() {
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  _.flatten = function(nestedArray, result) {
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /*
   * Offroad
   */

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  _.throttle = function(func, wait) {
  };

}).call(this);