var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */


        var noNuts = _.filter(products, function (pizza) { // filters the pizzas to only those that do not contain nuts
          return pizza.containsNuts == false;
        })
        
        var noShrooms = _.reject(noNuts, function (x) { // rejects, or removes those pizzas that meat the following
          return _(x.ingredients).any(function (y){ // goes through each item in the ingredients array and checks for 'mushrooms', if it exists, it removes it
            return y === 'mushrooms';
          });
        });

        productsICanEat.push(noShrooms); // as the contents of noNuts had been filted to three, the noShrooms function will remove the 2 still with mushrooms and push it to the array, which now has one index.
  
      


      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
     
    var sum = _.range(1000).reduce(function (x, y) {
              if (y % 3 === 0 || y % 5 === 0) {
                return x+y;
              }
              else {
                return x;
              }
            })  
            


 /* try chaining range() and reduce() */
    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _(products.map(function (product){
      return product.ingredient;
    })).flatten().reduce(function (x, y){
      return ingredientCount[y] = (ingredientCount[y] || 0) + 1 ;
    })




    expect(ingredientCount['mushrooms']).toBe(ingredientCount.mushrooms);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {


          function prime(x) {
             if ( x == 1 ) { return false; } // 1 is not a prime nor composite number
             
             var maxN = Math.floor(Math.sqrt(x)); // round down the square root of the argument passed
             for (var i=2; i <= maxN; i++) { // starting at two, divide the argument by i and if modulo == 0, return false, because it successfully divided into another number
                if ( x % i == 0 ) { return false; }
             }
             return true;
          }

          function primeFact(x) {
             var a = new Array(); //new array to player prime factors
             var i = 2 // again starting at 2 because 1 is not a prime number
             while ( i <= x ) { // while i is less than the argument, keep doing the following
                if ( x % i == 0 ) { // if the argument divided by i == 0, divide x by i and set it equal to that value. i.e. 6%2 == 0 x=6/2 x = 3
                   x /= i;
                   if ( prime(i) ) { // run this value throuh the prime number checker, if prime, add it to the array.
                      a.push(i);
                   }
                }
                i++; // increase the counter
             }
             return a; //return the array 
          }

          var result = primeFact(600851475143);
          alert(result[result.length - 1]);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

          function palinDromeo(x) {
              var z  = x.toString().split('').reverse(); //take the incoming array, two numbers multipled together, coerce it to a string, split it out at the spaces, and reverse it
              var xy = z.join(''); // join the previous string back together in reverse order
              
              if ( x == xy ) { return true; } // if the number is the same forwards as backwards, return true
              else { return false; }
          }

          function prod2Nums(n) {
              var a = new Array(); // creates a new array
              var min  = Math.pow(10, (n - 1)); //min is equal to 10 to the power of (your variable - 1). i.e. n=3 min = 10^(3-1)=100
              var max  = Math.pow(10, n) - 1; // max is equal to 10 to the power of your variable, and then subtract one from that total. i.e. n=3 max = (10^3)-1=999
              var msum = 0;
              var sum  = 0;
              
              for (var i=max; i >= min; i--) { //start from your max value and step down by one each time until you hit the min
                  for (var j=i; j >= min; j--) { // a second loop that mimics the actions of the first for a second set of numbers
                      sum = i * j; // multiple the two numbers together
                      if ( sum > msum ) { // if this number is larger than the current msum...
                          if ( palinDromeo(sum) ) { // and is a palindromero
                              msum = sum; // then msum is now the new sum
                              a = []; // push the two numbers that did this into an array
                              a.push(i);
                              a.push(j);
                              break; // then break out of the loop
                          }
                      }
                  }
              }
              return msum;
          }

          console.log("answer: " + prod2Nums(3));
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

      function gcd (x, y) {
        if (x == y) {return x}; // finds the greatest common demoninator between 2 numbers
        
        var z;
        while(y != 0){ //will run until the modulo is no longer != 0
          z = x % y;
          x = y;
          y = z;
        }
        return x
      }


      function lcm (a, b) { //returns the lowest common multiple of two numbers which is equal to both numbers times each other, and then divided by their greatest common denominator
        return (a/gcd(a,b))*b
      }

      var total = 1;

      for (var i = 2; i<=20; i++) {
        total = lcm(i, total);
      }
      console.log(total)

  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {


            function ssq(n) {
                  var sum = 0;
                  for (var i=1; i<=n; i++) {
                      sum += Math.pow(i,2); //assigns the value of i squared + the existing value of sum to sum. 
                  }
                  return sum; // returns this value.
              }
              
              function sqs(n) {
                  var sum = 0;
                  for (var i=1; i<=n; i++) { // takes the argument and sums the values from 1-the argument
                      sum += i;
                  }
                  return Math.pow(sum,2); // returns the square of this summed value
              }
              
              alert("answer: " + ( sqs(100) - ssq(100) ) ); // pass the same argument into each and subtract
  });

  // it("should find the 10001st prime", function () {

  // });
  
});
