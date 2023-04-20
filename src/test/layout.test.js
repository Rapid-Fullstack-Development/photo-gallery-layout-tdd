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
    
    test("items wrap to next line on overflow", () => {

        const targetRowHeight = 110;
        const galleryWidth = 600;
        const items = [ 
            {
                width: 200,
                height: 110,
            },
            {
                width: 300,
                height: 110,
            },

            // The third item overflows the width of the gallery:
            {
                width: 180,
                height: 110,
            },
        ];
        
        const rows = createLayout(items, targetRowHeight, galleryWidth);
        expect(rows.length).toBe(2); // Expect items to be allocated across two rows.
        
        const firstRow = rows[0];
        expect(firstRow.height).toBe(targetRowHeight);
        expect(firstRow.items.length).toBe(2);
        expect(firstRow.items[0].width).toBe(items[0].width);
        expect(firstRow.items[0].height).toBe(items[0].height);
        expect(firstRow.items[1].width).toBe(items[1].width);
        expect(firstRow.items[1].height).toBe(items[1].height);
        
        const secondRow = rows[1];
        expect(secondRow.height).toBe(targetRowHeight);
        expect(secondRow.items.length).toBe(1);
        expect(secondRow.items[0].width).toBe(items[2].width);
        expect(secondRow.items[0].height).toBe(items[2].height);
    });    
});