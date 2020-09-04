const helperFunctions = require("../general-helper-functions");

describe("Test Rename Of Keys", () => {
  test("1. Basic Rename", () => {
    let nameMap = {
      spend: "COSTINGS",
    };
    let dataRow = {
      spend: "10",
    };
    expect(helperFunctions.renameKeys(nameMap, dataRow)).toStrictEqual({
      COSTINGS: "10",
    });
  });

  test("2. Multiple Renames", () => {
    let nameMap = {
      spend: "COSTINGS",
      city: "LOCATION",
    };
    let dataRow = {
      city: "london",
      spend: "10",
    };
    expect(helperFunctions.renameKeys(nameMap, dataRow)).toStrictEqual({
      COSTINGS: "10",
      LOCATION: "london",
    });
  });
});
