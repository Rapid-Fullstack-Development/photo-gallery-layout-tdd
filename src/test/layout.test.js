import { createLayout } from "../layout";

describe("layout", () => {

    test("empty items equals empty rows", () => {

        const items = [];
        const rows = createLayout([]);
        expect(rows).toEqual([]);
    });

    test("can layout single item", () => {

        const targetRowHeight = 115;
        const item = {
            width: 140,
            height: 100,
        };

        const rows = createLayout([ item ], targetRowHeight);

        expect(rows.length).toBe(1);
        
        const row = rows[0];
        expect(row.height).toBe(targetRowHeight);
        expect(row.items.length).toBe(1);

        const layoutItem = row.items[0];
        expect(layoutItem.width).toBe(item.width);
        expect(layoutItem.height).toBe(item.height);
    });
});