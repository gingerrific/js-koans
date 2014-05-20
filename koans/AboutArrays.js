describe("About Arrays", function() {

  //We shall contemplate truth by testing reality, via spec expectations.
  it("should create arrays", function() {
    var emptyArray = [];
    expect(typeof(emptyArray)).toBe('object'); //A mistake? - http://javascript.crockford.com/remedial.html
    expect(emptyArray.length).toBe(0);

    var multiTypeArray = [0, 1, "two", function () { return 3; }, {value1: 4, value2: 5}, [6, 7]];
    expect(multiTypeArray[0]).toBe(0);
    expect(multiTypeArray[2]).toBe('two');
    expect(multiTypeArray[3]()).toBe(3); // as index 3 is a funciton the () at the end invokes the function and will thus be the return value
    expect(multiTypeArray[4].value1).toBe(4); 
    expect(multiTypeArray[4]["value2"]).toBe(5); //using object bracket notation to mean ['this keyname's value]
    expect(multiTypeArray[5][0]).toBe(6); // bracket notation here that instead means the index position of this array
  });

  it("should understand array literals", function () {
    var array = [];
    expect(array).toEqual([]);

    array[0] = 1;
    expect(array).toEqual([1]);

    array[1] = 2;
    expect(array).toEqual([1, 2]);

    array.push(3);
    expect(array).toEqual([1,2,3]); // push adds the passed parameter to the end of the array
  });

  it("should understand array length", function () {
    var fourNumberArray = [1, 2, 3, 4];

    expect(fourNumberArray.length).toBe(4);
    fourNumberArray.push(5, 6); // can push multiple elements at the same time
    expect(fourNumberArray.length).toBe(6);

    var tenEmptyElementArray = new Array(10); // creates a new array with length 10
    expect(tenEmptyElementArray.length).toBe(10);

    tenEmptyElementArray.length = 5;
    expect(tenEmptyElementArray.length).toBe(5); // can shorten an existing array to a "desired length"
  });

  it("should slice arrays", function () {
    var array = ["peanut", "butter", "and", "jelly"];

    expect(array.slice(0, 1)).toEqual(['peanut']);
    expect(array.slice(0, 2)).toEqual(['peanut', 'butter']);
    expect(array.slice(2, 2)).toEqual([]); // a slice with no spaces between start and end will return an empty array
    expect(array.slice(2, 20)).toEqual(['and', 'jelly']); // end's larger than the array will return what exists between the start and end. it will not create new indexes
    expect(array.slice(3, 0)).toEqual([]); // any start position larger than the array will return an empty array
    expect(array.slice(3, 100)).toEqual(['jelly']);
    expect(array.slice(5, 1)).toEqual([]);
  });

  it("should know array references", function () {
    var array = [ "zero", "one", "two", "three", "four", "five" ];

    function passedByReference(refArray) {
        refArray[1] = "changed in function";
    }
    passedByReference(array);
    expect(array[1]).toBe('changed in function'); // the named array was passed through a variable and mutated

    var assignedArray = array;
    assignedArray[5] = "changed in assignedArray";
    expect(array[5]).toBe('changed in assignedArray'); //by assigning the the variable to the array itself, the new variable now points to the array itself and any changes mutated upon it, will mutate the original as well.

    var copyOfArray = array.slice();
    copyOfArray[3] = "changed in copyOfArray"; // calling one of the array's methods to acquire it's data is not passed by reference, but rather just the value of it. changes to this variable will not mutate the original
    expect(array[3]).toBe('three'); // note: [] notation next to an array method is equal to that index number so array.slice()[3] == 'three' in this context
  });

  it("should push and pop", function () {
    var array = [1, 2];
    array.push(3);

    expect(array).toEqual([1,2,3]); //push adds passed argument to the end of the array

    var poppedValue = array.pop(); // returns the value of the last index of the array, removing it from the original array and in this case assinging it to the variable
    expect(poppedValue).toBe(3); 
    expect(array).toEqual([1,2]); // the method mutates the original array
  });

  it("should know about shifting arrays", function () {
    var array = [1, 2];

    array.unshift(3); 
    expect(array).toEqual([3,1,2]); //unshift will place it's argument at the beginning of the array and extend it's length

    var shiftedValue = array.shift();
    expect(shiftedValue).toEqual(3); //shift will be the 'opposite' of .pop() and return the first index of an array and remove it from the original, in this case assigning it to a variable
    expect(array).toEqual([1,2]);
  });
});
