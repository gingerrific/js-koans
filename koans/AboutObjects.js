describe("About Objects", function () {

  describe("Properties", function () {
    var megalomaniac;

    beforeEach(function () {
       megalomaniac = {  mastermind: "Joker", henchwoman: "Harley" };
    });

    it("should confirm objects are collections of properties", function () {
      expect(megalomaniac.mastermind).toBe('Joker');
    });

    it("should confirm that properties are case sensitive", function () {
      expect(megalomaniac.henchwoman).toBe('Harley');
      expect(megalomaniac.henchWoman).toBe(undefined);
    });
  });


  it("should know properties that are functions act like methods", function () {
    var megalomaniac = {
      mastermind : "Brain",
      henchman: "Pinky",
      battleCry: function (noOfBrains) {
        return "They are " + this.henchman + " and the" +
          Array(noOfBrains + 1).join(" " + this.mastermind); // the content of your join() will replace the separators in your array. An empty array with 5 indexes has 4 commas, thus for _brains will be added
      }
    };

    var battleCry = megalomaniac.battleCry(4);
    expect('They are Pinky and the Brain Brain Brain Brain').toMatch(battleCry);
  });

  it("should confirm that when a function is attached to an object, 'this' refers to the object", function () {
    var currentDate = new Date();
    var currentYear = (currentDate.getFullYear()); // will be the current year. new Date() is a new date object, and getFullYear() is one of it's properties that will return the current year according to local time
    var megalomaniac = {
      mastermind: "James Wood",
      henchman: "Adam West",
      birthYear: 1970,
      calculateAge: function () {
        return currentYear - this.birthYear;
      }
    };

    expect(currentYear).toBe(2014);
    expect(megalomaniac.calculateAge()).toBe(44);
  });

  describe("'in' keyword", function () {
    var megalomaniac;
    beforeEach(function () {
      megalomaniac = {
        mastermind: "The Monarch",
        henchwoman: "Dr Girlfriend",
        theBomb: true
      };
    });

    it("should have the bomb", function () {

      var hasBomb = "theBomb" in megalomaniac; // in returns a boolean based on whether or not the property is in the object

      expect(hasBomb).toBe(true);
    });

    it("should not have the detonator however", function () {

      var hasDetonator = "theDetonator" in megalomaniac; // the megalomaniac object does not have a property "theDetonator"

      expect(hasDetonator).toBe(false); //thus false
    });
  });

  it("should know that properties can be added and deleted", function () {
    var megalomaniac = { mastermind : "Agent Smith", henchman: "Agent Smith" };

    expect("secretary" in megalomaniac).toBe(false);

    megalomaniac.secretary = "Agent Smith";
    expect("secretary" in megalomaniac).toBe(true);

    delete megalomaniac.henchman;
    expect("henchman" in megalomaniac).toBe(false);
  });


  it("should use prototype to add to all objects", function () {
      function Circle(radius)
      {
        this.radius = radius;
      }

      var simpleCircle = new Circle(10);
      var colouredCircle = new Circle(5);
      colouredCircle.colour = "red";

      expect(simpleCircle.colour).toBe(undefined);
      expect(colouredCircle.colour).toBe('red');

      Circle.prototype.describe = function () {
        return "This circle has a radius of: " + this.radius;
      };

      expect(simpleCircle.describe()).toBe('This circle has a radius of: 10');
      expect(colouredCircle.describe()).toBe('This circle has a radius of: 5');
  });
});
