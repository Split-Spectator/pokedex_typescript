import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: "  hello  world  ",
        expected: ["hello", "world"],
    },
    {
        input: "  This is   a  test.  ",
        expected: ["this", "is", "a", "test."],
    },
    {
        input: "SingleWord",
        expected: ["singleword"],
    },
    {
        input: "   multiple    spaces   ",
        expected: ["multiple", "spaces"],
    },
    {
        input: "New\nLine\tCharacters",
        expected: ["new", "line", "characters"],
    },
    {
        input: "  leading and trailing spaces  ",
        expected: ["leading", "and", "trailing", "spaces"],
    },
    {
        input: "   ", // Only spaces
        expected: [],
    },
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input);

        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});