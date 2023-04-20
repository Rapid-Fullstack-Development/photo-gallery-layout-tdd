import { createLayout } from "../layout";

describe("layout", () => {

    test("empty items equals empty rows", () => {

        const items = []
        const rows = createLayout([]);
        expect(rows).toEqual([]);
    });

});