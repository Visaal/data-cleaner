const helperFunctions = require("../filter-helper-functions");

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
    spend: {
      number: 13,
      text: 0,
      date: 0,
      inconsistentDataTypes: true,
      likelyDataType: "number",
      distinctValues: {
        number: {
          1: [0, 2, 4, 6, 8],
          2: [1, 3, 7, 9],
        },
        text: {
          "n/a": [5, 10, 11, 12],
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

let filteredDataRowIndexes;

// TESTING setFilterValues i.e. object store holding filter fields and values

test("Single Field Single Value Filter Selection", () => {
  expect(
    helperFunctions.setFilterValues({
      selectedField: "animal",
      fieldValuesSelected: ["lion"],
    })
  ).toStrictEqual({ animal: ["lion"] });
});

test("Single Field Two Values Filter Selection", () => {
  expect(
    helperFunctions.setFilterValues({
      selectedField: "animal",
      fieldValuesSelected: ["lion", "tiger"],
    })
  ).toStrictEqual({
    animal: ["lion", "tiger"],
  });
});

describe("Testing when existing filter values are in place", () => {
  beforeAll(() => {
    // First filter: Animal > Lion, Tiger
    // Second filter: Cities > London
    activeFilterValues = {
      animal: ["lion", "tiger"],
    };
    return activeFilterValues;
  });

  afterAll(() => {
    delete activeFilterValues;
  });

  test("New field filter being added - single field with two values filtered in place", () => {
    expect(
      helperFunctions.setFilterValues(
        {
          selectedField: "cities",
          fieldValuesSelected: ["london"],
        },
        activeFilterValues
      )
    ).toStrictEqual({
      animal: ["lion", "tiger"],
      cities: ["london"],
    });
  });
});

describe("Testing when existing filter values are removed or changed", () => {
  beforeEach(() => {
    // First filter: Animal > Lion, Tiger
    // Second filter: Cities > London
    activeFilterValues = {
      animal: ["lion", "tiger"],
      cities: ["london"],
    };
    return activeFilterValues;
  });

  afterEach(() => {
    delete activeFilterValues;
  });

  test("Field filter being changed for existing field in active filter", () => {
    expect(
      helperFunctions.setFilterValues(
        {
          selectedField: "cities",
          fieldValuesSelected: ["paris"],
        },
        activeFilterValues
      )
    ).toStrictEqual({
      animal: ["lion", "tiger"],
      cities: ["paris"],
    });
  });
  test("10: Field filter being removed for existing field in active filter", () => {
    expect(
      helperFunctions.setFilterValues(
        {
          selectedField: "cities",
          fieldValuesSelected: [],
        },
        activeFilterValues
      )
    ).toStrictEqual({
      animal: ["lion", "tiger"],
    });
  });
  test("11: Field value previously selected being removed for existing field in active filter", () => {
    expect(
      helperFunctions.setFilterValues(
        {
          selectedField: "animal",
          fieldValuesSelected: ["lion"],
        },
        activeFilterValues
      )
    ).toStrictEqual({
      animal: ["lion"],
      cities: ["london"],
    });
  });
  test("12: Empty selection values where existing active filter in place", () => {
    expect(
      helperFunctions.setFilterValues(
        {
          selectedField: "vegetables",
          fieldValuesSelected: [],
        },
        activeFilterValues
      )
    ).toStrictEqual({
      animal: ["lion", "tiger"],
      cities: ["london"],
    });
  });
});

// TEST DISTINCT VALUES FOR A FIELD
test("Field with consistent data type", () => {
  expect(
    helperFunctions.getDistinctValuesForField(schema, "animal")
  ).toStrictEqual({
    lion: [0, 2, 4, 6, 8],
    elephant: [1, 5, 9, 13],
    tiger: [3, 7, 10, 11],
  });
});

test("Field with inconsistent data type", () => {
  expect(
    helperFunctions.getDistinctValuesForField(schema, "spend")
  ).toStrictEqual({
    1: [0, 2, 4, 6, 8],
    2: [1, 3, 7, 9],
    "n/a": [5, 10, 11, 12],
  });
});

test("GF1: One filter field, one value", () => {
  let selectedFilters = { animal: ["lion"] };
  expect(
    helperFunctions.getFilterRowIndexes(schema, selectedFilters)
  ).toStrictEqual([0, 2, 4, 6, 8]);
});

test("GF2: One filter field, two values", () => {
  let selectedFilters = { animal: ["lion", "tiger"] };
  expect(
    helperFunctions.getFilterRowIndexes(schema, selectedFilters)
  ).toStrictEqual([0, 2, 3, 4, 6, 7, 8, 10, 11]);
});

test("GF3: Two filter fields, one value each", () => {
  let selectedFilters = { animal: ["lion"], cities: ["london"] };
  expect(
    helperFunctions.getFilterRowIndexes(schema, selectedFilters)
  ).toStrictEqual([0, 2, 4]);
});

test("GF4: Two filter fields, two values each", () => {
  let selectedFilters = {
    animal: ["lion", "tiger"],
    cities: ["london", "paris"],
  };
  expect(
    helperFunctions.getFilterRowIndexes(schema, selectedFilters)
  ).toStrictEqual([0, 2, 3, 4, 6, 7, 8]);
});

test("GF5: Three filter fields, two values each", () => {
  let selectedFilters = {
    animal: ["elephant", "tiger"],
    cities: ["london", "paris"],
    spend: ["2", "n/a"],
  };
  expect(
    helperFunctions.getFilterRowIndexes(schema, selectedFilters)
  ).toStrictEqual([1, 3, 5, 7, 9]);
});
