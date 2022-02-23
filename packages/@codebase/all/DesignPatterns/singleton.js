/* eslint-disable no-unused-vars */
const mySingleton = (function () {
  // Instance stores a reference to the Singleton
  let instance;

  function init() {
    // Singleton

    // Private methods and variables
    function privateMethod() {
      console.log("I am private");
    }

    const privateVariable = "Im also private";

    const privateRandomNumber = Math.random();

    return {
      // Public methods and variables
      publicMethod: function () {
        console.log("The public can see me!");
      },

      publicProperty: "I am also public",

      getRandomNumber: function () {
        return privateRandomNumber;
      },
    };
  }

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
      if (!instance) {
        instance = init();
      }

      return instance;
    },
  };
})();
