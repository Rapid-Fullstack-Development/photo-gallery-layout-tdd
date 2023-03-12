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

    test("can layout multiple items", () => {

        const targetRowHeight = 120;
        const item1 = {
            width: 140,
            height: 100,
        };
        const item2 = {
            width: 100,
            height: 140,
        };
        const item3 = {
            width: 300,
            height: 50,
        };

        const rows = createLayout([ item1, item2, item3 ], targetRowHeight);

        expect(rows.length).toBe(1);
        
        const row = rows[0];
        expect(row.height).toBe(targetRowHeight);
        expect(row.items.length).toBe(3);
        expect(row.items[0].width).toBe(item1.width);
        expect(row.items[0].height).toBe(item1.height);
        expect(row.items[1].width).toBe(item2.width);
        expect(row.items[1].height).toBe(item2.height);
        expect(row.items[2].width).toBe(item3.width);
        expect(row.items[2].height).toBe(item3.height);
    });
});