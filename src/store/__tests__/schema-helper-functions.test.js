const helperFunctions = require("../schema-helper-functions");

const dataTypes = ["null", "number", "text", "date"];
const dataFields = ["animal", "cities", "vegetable", "spend"];

describe("1. Testing initial schema creation - skeleton schema", () => {
  test("1.01: Skeleton Schema Creation", () => {
    expect(
      helperFunctions.createSchemaFieldSkeleton(dataFields, dataTypes)
    ).toStrictEqual({
      animal: {
        null: 0,
        number: 0,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {},
          date: {},
        },
      },
      cities: {
        null: 0,
        number: 0,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {},
          date: {},
        },
      },
      vegetable: {
        null: 0,
        number: 0,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {},
          date: {},
        },
      },
      spend: {
        null: 0,
        number: 0,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {},
          date: {},
        },
      },
    });
  });
});

describe("2. Populate Schema - Unique Values", () => {
  let dataOne,
    dataTwo,
    dataThree,
    dataFour,
    dataFive,
    dataSix,
    dataSeven,
    dataEight,
    dataNine,
    schemaOne,
    schemaTwo,
    schemaThree,
    schemaFour;
  beforeEach(() => {
    dataOne = [{ spend: "10" }];
    dataTwo = [
      { animal: "lion", cities: "london", vegetable: "carrot", spend: "10" },
    ];
    dataThree = [
      { spend: "10" },
      { spend: "20" },
      { spend: "30" },
      { spend: "40" },
      { spend: "50" },
    ];
    dataFour = [{ spend: "10" }, { spend: "Null" }];
    dataFive = [
      { spend: "10" },
      { spend: "20" },
      { spend: "20" },
      { spend: "10" },
      { spend: "50" },
      { spend: "20" },
      { spend: "50" },
    ];
    dataSix = [
      { animal: "lion", cities: "london", vegetable: "carrot", spend: "10" },
      { animal: "tiger", cities: "paris", vegetable: "potato", spend: "10" },
      { animal: "dog", cities: "milan", vegetable: "pea", spend: "Null" },
      { animal: "lion", cities: "mumbai", vegetable: "celery", spend: "10" },
      { animal: "cat", cities: "auckland", vegetable: "carrot", spend: "20" },
      { animal: "lion", cities: "stockholm", vegetable: "pea", spend: "Null" },
    ];
    dataSeven = [{ start_date: "2020-06-21" }];
    dataEight = [
      { start_date: "2020-06-21" },
      { start_date: "15thDecember2020" },
    ];
    dataNine = [
      {
        animal: "lion",
        cities: "london",
        vegetable: "carrot",
        spend: "10",
        start_date: "2020-06-21",
      },
      {
        animal: "tiger",
        cities: "paris",
        vegetable: "potato",
        spend: "10",
        start_date: "2020-06-21",
      },
      {
        animal: "dog",
        cities: "milan",
        vegetable: "pea",
        spend: "Null",
        start_date: "2020-06-21",
      },
      {
        animal: "lion",
        cities: "mumbai",
        vegetable: "celery",
        spend: "10",
        start_date: "15thDecember2020",
      },
      {
        animal: "cat",
        cities: "auckland",
        vegetable: "carrot",
        spend: "20",
        start_date: "2020-06-21",
      },
      {
        animal: "lion",
        cities: "stockholm",
        vegetable: "pea",
        spend: "Null",
        start_date: "15thDecember2020",
      },
    ];
    schemaOne = {
      spend: {
        null: 0,
        number: 0,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {},
          date: {},
        },
      },
    };
    schemaTwo = {
      animal: {
        null: 0,
        number: 0,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {},
          date: {},
        },
      },
      cities: {
        null: 0,
        number: 0,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {},
          date: {},
        },
      },
      vegetable: {
        null: 0,
        number: 0,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {},
          date: {},
        },
      },
      spend: {
        null: 0,
        number: 0,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {},
          date: {},
        },
      },
    };
    schemaThree = {
      start_date: {
        null: 0,
        number: 0,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {},
          date: {},
        },
      },
    };
    schemaFour = {
      ...schemaTwo,
      ...schemaThree,
    };
  });

  afterEach(() => {
    delete dataOne,
      dataTwo,
      dataThree,
      dataFour,
      dataFive,
      dataSix,
      dataSeven,
      dataEight,
      dataNine,
      schemaOne,
      schemaTwo,
      schemaThree,
      schemaFour;
  });

  test("2.01: Distinct Value Creation - 1 row 1 field - number", () => {
    expect(
      helperFunctions.countUniqueFieldValues(schemaOne, dataOne)
    ).toStrictEqual({
      spend: {
        null: 0,
        number: 1,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0],
          },
          text: {},
          date: {},
        },
      },
    });
  });
  test("2.02: Distinct Value Creation - 1 row 4 fields - text and number", () => {
    expect(
      helperFunctions.countUniqueFieldValues(schemaTwo, dataTwo)
    ).toStrictEqual({
      animal: {
        null: 0,
        number: 0,
        text: 1,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            lion: [0],
          },
          date: {},
        },
      },
      cities: {
        null: 0,
        number: 0,
        text: 1,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            london: [0],
          },
          date: {},
        },
      },
      vegetable: {
        null: 0,
        number: 0,
        text: 1,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            carrot: [0],
          },
          date: {},
        },
      },
      spend: {
        null: 0,
        number: 1,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0],
          },
          text: {},
          date: {},
        },
      },
    });
  });
  test("2.03: Distinct Value Creation - 5 rows 1 field", () => {
    expect(
      helperFunctions.countUniqueFieldValues(schemaOne, dataThree)
    ).toStrictEqual({
      spend: {
        null: 0,
        number: 5,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0],
            20: [1],
            30: [2],
            40: [3],
            50: [4],
          },
          text: {},
          date: {},
        },
      },
    });
  });
  test("2.04: Distinct Value Creation - 2 rows 1 field - text and numeric types", () => {
    expect(
      helperFunctions.countUniqueFieldValues(schemaOne, dataFour)
    ).toStrictEqual({
      spend: {
        null: 0,
        number: 1,
        text: 1,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0],
          },
          text: {
            Null: [1],
          },
          date: {},
        },
      },
    });
  });
  test("2.05: Distinct Value Creation - 7 rows 1 field - same value appears on multiple rows", () => {
    expect(
      helperFunctions.countUniqueFieldValues(schemaOne, dataFive)
    ).toStrictEqual({
      spend: {
        null: 0,
        number: 7,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0, 3],
            20: [1, 2, 5],
            50: [4, 6],
          },
          text: {},
          date: {},
        },
      },
    });
  });
  test("2.06: Distinct Value Creation - 6 rows 4 fields - same value appears on multiple rows, inconsistent data types", () => {
    expect(
      helperFunctions.countUniqueFieldValues(schemaTwo, dataSix)
    ).toStrictEqual({
      animal: {
        null: 0,
        number: 0,
        text: 6,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            lion: [0, 3, 5],
            tiger: [1],
            dog: [2],
            cat: [4],
          },
          date: {},
        },
      },
      cities: {
        null: 0,
        number: 0,
        text: 6,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            london: [0],
            paris: [1],
            milan: [2],
            mumbai: [3],
            auckland: [4],
            stockholm: [5],
          },
          date: {},
        },
      },
      vegetable: {
        null: 0,
        number: 0,
        text: 6,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            carrot: [0, 4],
            potato: [1],
            pea: [2, 5],
            celery: [3],
          },
          date: {},
        },
      },
      spend: {
        null: 0,
        number: 4,
        text: 2,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0, 1, 3],
            20: [4],
          },
          text: {
            Null: [2, 5],
          },
          date: {},
        },
      },
    });
  });
  test("2.07: Distinct Value Creation - 1 rows 1 field - iso date type", () => {
    expect(
      helperFunctions.countUniqueFieldValues(schemaThree, dataSeven)
    ).toStrictEqual({
      start_date: {
        null: 0,
        number: 0,
        text: 0,
        date: 1,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {},
          date: {
            "2020-06-21": [0],
          },
        },
      },
    });
  });
  test("2.08: Distinct Value Creation - 2 rows 1 field - iso date type and text", () => {
    expect(
      helperFunctions.countUniqueFieldValues(schemaThree, dataEight)
    ).toStrictEqual({
      start_date: {
        null: 0,
        number: 0,
        text: 1,
        date: 1,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            "15thDecember2020": [1],
          },
          date: {
            "2020-06-21": [0],
          },
        },
      },
    });
  });
  test("2.09: Distinct Value Creation - 6 rows 5 fields - date, text, numbers", () => {
    expect(
      helperFunctions.countUniqueFieldValues(schemaFour, dataNine)
    ).toStrictEqual({
      animal: {
        null: 0,
        number: 0,
        text: 6,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            lion: [0, 3, 5],
            tiger: [1],
            dog: [2],
            cat: [4],
          },
          date: {},
        },
      },
      cities: {
        null: 0,
        number: 0,
        text: 6,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            london: [0],
            paris: [1],
            milan: [2],
            mumbai: [3],
            auckland: [4],
            stockholm: [5],
          },
          date: {},
        },
      },
      vegetable: {
        null: 0,
        number: 0,
        text: 6,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            carrot: [0, 4],
            potato: [1],
            pea: [2, 5],
            celery: [3],
          },
          date: {},
        },
      },
      spend: {
        null: 0,
        number: 4,
        text: 2,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0, 1, 3],
            20: [4],
          },
          text: {
            Null: [2, 5],
          },
          date: {},
        },
      },
      start_date: {
        null: 0,
        number: 0,
        text: 2,
        date: 4,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            "15thDecember2020": [3, 5],
          },
          date: {
            "2020-06-21": [0, 1, 2, 4],
          },
        },
      },
    });
  });
});

describe("3. Populate Schema - Likely Data Type", () => {
  let schemaOne, schemaTwo, schemaThree, schemaFour;
  beforeEach(() => {
    schemaOne = {
      spend: {
        null: 0,
        number: 1,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0],
          },
          text: {},
          date: {},
        },
      },
    };
    schemaTwo = {
      spend: {
        null: 0,
        number: 2,
        text: 1,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0, 1],
          },
          text: {
            NA: [2],
          },
          date: {},
        },
      },
    };
    schemaThree = {
      spend: {
        null: 0,
        number: 2,
        text: 2,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0, 1],
          },
          text: {
            NA: [2, 3],
          },
          date: {},
        },
      },
    };
    schemaFour = {
      start_date: {
        null: 0,
        number: 0,
        text: 2,
        date: 4,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {},
          text: {
            "15thDecember2020": [3, 5],
          },
          date: {
            "2020-06-21": [0, 1, 2, 4],
          },
        },
      },
      spend: {
        null: 0,
        number: 4,
        text: 2,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0, 1, 3],
            20: [4],
          },
          text: {
            Null: [2, 5],
          },
          date: {},
        },
      },
    };
  });

  afterEach(() => {
    delete schemaOne, schemaTwo, schemaThree, schemaFour;
  });

  test("3.01: Likely Data Type - 1 row 1 field", () => {
    expect(
      helperFunctions.determineLikelyFieldDataType(schemaOne, dataTypes)
    ).toStrictEqual({
      spend: {
        null: 0,
        number: 1,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "number",
        distinctValues: {
          null: {},
          number: {
            10: [0],
          },
          text: {},
          date: {},
        },
      },
    });
  });
  test("3.02: Likely Data Type - 1 row 3 fields - inconsistent values", () => {
    expect(
      helperFunctions.determineLikelyFieldDataType(schemaTwo, dataTypes)
    ).toStrictEqual({
      spend: {
        null: 0,
        number: 2,
        text: 1,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "number",
        distinctValues: {
          null: {},
          number: {
            10: [0, 1],
          },
          text: {
            NA: [2],
          },
          date: {},
        },
      },
    });
  });
  test("3.03: Likely Data Type - 1 row 4 fields - even split of data types", () => {
    expect(
      helperFunctions.determineLikelyFieldDataType(schemaThree, dataTypes)
    ).toStrictEqual({
      spend: {
        null: 0,
        number: 2,
        text: 2,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0, 1],
          },
          text: {
            NA: [2, 3],
          },
          date: {},
        },
      },
    });
  });
  test("3.04: Likely Data Type - 6 row 2 fields", () => {
    expect(
      helperFunctions.determineLikelyFieldDataType(schemaFour, dataTypes)
    ).toStrictEqual({
      start_date: {
        null: 0,
        number: 0,
        text: 2,
        date: 4,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "date",
        distinctValues: {
          null: {},
          number: {},
          text: {
            "15thDecember2020": [3, 5],
          },
          date: {
            "2020-06-21": [0, 1, 2, 4],
          },
        },
      },
      spend: {
        null: 0,
        number: 4,
        text: 2,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "number",
        distinctValues: {
          null: {},
          number: {
            10: [0, 1, 3],
            20: [4],
          },
          text: {
            Null: [2, 5],
          },
          date: {},
        },
      },
    });
  });
});

describe("4. Populate Schema - Check For Consistent Data Types", () => {
  beforeEach(() => {
    schemaOne = {
      spend: {
        null: 0,
        number: 1,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0],
          },
          text: {},
          date: {},
        },
      },
    };
    schemaTwo = {
      spend: {
        null: 0,
        number: 2,
        text: 1,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0, 1],
          },
          text: {
            NA: [2],
          },
          date: {},
        },
      },
    };
  });

  test("4.01: Consistent Value", () => {
    expect(
      helperFunctions.determineIfConsistentDataType(schemaOne, dataTypes)
    ).toStrictEqual({
      spend: {
        null: 0,
        number: 1,
        text: 0,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: false,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0],
          },
          text: {},
          date: {},
        },
      },
    });
  });
  test("4.02: Inconsistent Values", () => {
    expect(
      helperFunctions.determineIfConsistentDataType(schemaTwo, dataTypes)
    ).toStrictEqual({
      spend: {
        null: 0,
        number: 2,
        text: 1,
        date: 0,
        userCreatedField: false,
        inconsistentDataTypes: true,
        likelyDataType: "text",
        distinctValues: {
          null: {},
          number: {
            10: [0, 1],
          },
          text: {
            NA: [2],
          },
          date: {},
        },
      },
    });
  });
});
