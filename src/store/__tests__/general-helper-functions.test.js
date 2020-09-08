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

describe("Test Index Filtering", () => {
  test("1. Filtering in place", () => {
    let data = ["a", "b", "c", "d", "e", "f"];
    let filteredDataRowIndexes = [0, 2, 4];
    expect(
      helperFunctions.getFilteredOutDataRowIndexes(data, filteredDataRowIndexes)
    ).toStrictEqual([1, 3, 5]);
  });
  test("2. No filtering in place", () => {
    let data = ["a", "b", "c", "d", "e", "f"];
    let filteredDataRowIndexes = [];
    expect(
      helperFunctions.getFilteredOutDataRowIndexes(data, filteredDataRowIndexes)
    ).toStrictEqual([0, 1, 2, 3, 4, 5]);
  });
  test("3. Everything selected in filter", () => {
    let data = ["a", "b", "c", "d", "e", "f"];
    let filteredDataRowIndexes = [0, 1, 2, 3, 4, 5];
    expect(
      helperFunctions.getFilteredOutDataRowIndexes(data, filteredDataRowIndexes)
    ).toStrictEqual([]);
  });
});
