describe("About Functions", function() {

  it("should declare functions", function() {

    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function () {
    var message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      var message = "Inner"; // message, within the confines of this function is equal to 'Inner', however, above this it still is equal to 'Outer'
      return message;
    }

    expect(getMessage()).toBe('Outer');
    expect(overrideMessage()).toBe('Inner');
    expect(message).toBe('Outer'); // scoooooooooooooooooooope
  });

  it("should have lexical scoping", function () {
    var variable = "top-level";
    function parentfunction() {
      var variable = "local";
      function childfunction() {
        return variable; // scope will start at it's local instance and move towards the top level. it's not found in this instance, so it moves out one to the parentfunction, where it finds 'variable' defined
      }
      return childfunction();
    }
    expect(parentfunction()).toBe('local');
  });

  it("should use lexical scoping to synthesise functions", function () {

    function makeMysteryFunction(makerValue)
    {
      var newFunction = function doMysteriousThing(param)
      {
        return makerValue + param;
      };
      return newFunction;
    }

    var mysteryFunction3 = makeMysteryFunction(3); // creates makeMysteryFunction with one param (3)
    var mysteryFunction5 = makeMysteryFunction(5); // creates makeMysteryFunction with one param (5)
    // passes 10 as second argument returns 3 + 10 = 13      //passes five as second argument to function so now it's passed with (5,5) = 10, 10+13 == 23
    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23);
  });

  it("should allow extra function arguments", function () {

    function returnFirstArg(firstArg) {
      return firstArg;
    }

    expect(returnFirstArg("first", "second", "third")).toBe('first'); // extra parameters do not matter and will just be ignored as the function does not accept additional arguments

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    expect(returnSecondArg("only give first arg")).toBe(undefined); // only one argument is passed, while the second may not be necessary for all functions, as the return of this function returns the second argument and one has not been passed, it is undefined

    function returnAllArgs() {
      var argsArray = [];
      for (var i = 0; i < arguments.length; i += 1) {  //arguments is a JS defined term // arguments.length ==3, will loop over until i < 3 increasing 1 each time
        argsArray.push(arguments[i]); // will take the arguments and push them into the new array for as many items as there are
      }
      return argsArray.join(","); // joins them into one array, separated by the comma with no spaces and returns that evaluated string, not the array itself
    }

    expect(returnAllArgs("first", "second", "third")).toBe('first,second,third');
  });

  it("should pass functions as values", function () {

    var appendRules = function (name) {
      return name + " rules!";
    };

    var appendDoubleRules = function (name) {
      return name + " totally rules!";
    };

    var praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise("John")).toBe('John rules!');

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe('Mary totally rules!');

  });
});
