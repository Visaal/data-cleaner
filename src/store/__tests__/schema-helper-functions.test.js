const helperFunctions = require("../schema-helper-functions");

let data;
const dataTypes = ["null", "number", "text", "date"];
const dataFields = ["animal", "cities", "vegetable", "spend"];

beforeAll(() => {
  let data = [
    {
      animal: "lion",
      cities: "london",
      vegetable: "carrot",
      spend: "10",
    },
  ];
  return data;
});

afterAll(() => {
  delete data;
});

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
