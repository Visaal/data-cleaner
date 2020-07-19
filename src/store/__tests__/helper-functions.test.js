const helperFunctions = require("../helper-functions");

let schema;

beforeAll(() => {
  schema = {
    animal: {
      number: 0,
      text: 13,
      date: 0,
      inconsistentDataTypes: false,
      likelyDataType: "text",
      distinctValues: {
        number: {},
        text: {
          lion: [0, 2, 4, 6, 8],
          elephant: [1, 5, 9, 13],
          tiger: [3, 7, 10, 11],
        },
        date: {},
      },
    },
    cities: {
      number: 0,
      text: 10,
      date: 0,
      inconsistentDataTypes: false,
      likelyDataType: "text",
      distinctValues: {
        number: {},
        text: {
          london: [0, 1, 2, 3, 4],
          paris: [5, 6, 7, 8, 9],
        },
        date: {},
      },
    },
    vegetables: {
      number: 0,
      text: 10,
      date: 0,
      inconsistentDataTypes: false,
      likelyDataType: "text",
      distinctValues: {
        number: {},
        text: {
          carrots: [2, 6, 7, 8],
          peas: [9, 10, 11, 12],
        },
        date: {},
      },
    },
  };
  return schema;
});

afterAll(() => {
  delete schema;
});

test("Single Field Single Value Filter", () => {
  expect(
    helperFunctions.getSelectedRowIndexes(schema, {
      selectedField: "animal",
      filterValues: ["lion"],
    })
  ).toStrictEqual([0, 2, 4, 6, 8]);
});

test("Single Field Two Value Filter", () => {
  expect(
    helperFunctions.getSelectedRowIndexes(schema, {
      selectedField: "animal",
      filterValues: ["lion", "tiger"],
    })
  ).toStrictEqual([0, 2, 4, 6, 8, 3, 7, 10, 11]);
});

let filteredDataRowIndexes;

describe("Test when one existing filter is in place", () => {
  beforeAll(() => {
    // First filter: Animal > Lion
    filteredDataRowIndexes = [0, 2, 4, 6, 8];
    return filteredDataRowIndexes;
  });

  afterAll(() => {
    delete filteredDataRowIndexes;
  });

  test("One existing filter in place and new filter applied for additional field", () => {
    expect(
      helperFunctions.getSelectedRowIndexes(
        schema,
        {
          selectedField: "cities",
          filterValues: ["london"],
        },
        filteredDataRowIndexes
      )
    ).toStrictEqual([0, 2, 4]);
  });
  test("Two existing filters in place and new filter applied for additional field", () => {
    expect(
      helperFunctions.getSelectedRowIndexes(
        schema,
        {
          selectedField: "cities",
          filterValues: ["london"],
        },
        filteredDataRowIndexes
      )
    ).toStrictEqual([0, 2, 4]);
  });
});

describe("Test when two existing filters are in place", () => {
  beforeAll(() => {
    // First filter: Animal > Lion
    // Second filter: Cities > London
    filteredDataRowIndexes = [0, 2, 4];
    return filteredDataRowIndexes;
  });

  afterAll(() => {
    delete filteredDataRowIndexes;
  });
  test("Two existing filters in place and new filter applied for additional field", () => {
    expect(
      helperFunctions.getSelectedRowIndexes(
        schema,
        {
          selectedField: "vegetables",
          filterValues: ["carrots"],
        },
        filteredDataRowIndexes
      )
    ).toStrictEqual([2]);
  });
});
