import { createLayout } from "../layout";

describe("layout", () => {

    test("empty items equals empty rows", () => {

        const items = [];
        const rows = createLayout([]);
        expect(rows).toEqual([]);
    });

    test("can layout single item that is smaller than the gallery", () => {

        const targetRowHeight = 115;
        const item = {
            width: 140,
            height: 100,
        };

		const galleryWidth = 1200;
        const rows = createLayout([ item ], targetRowHeight, galleryWidth);

        expect(rows.length).toBe(1);
        
        const row = rows[0];
        expect(row.height).toBe(targetRowHeight);
		expect(row.width).toBeLessThan(galleryWidth);
        expect(row.items.length).toBe(1);

        const layoutItem = row.items[0];
        expect(layoutItem.width).toBeGreaterThan(item.width);
        expect(layoutItem.height).toBe(targetRowHeight);
    });
    
   test("can layout single item that is larger than the gallery", () => {

        const targetRowHeight = 118;
        const items = [
            {
                width: 1200,
                height: 500,
            },
        ];

        const galleryWidth = 600;
        const rows = createLayout(items, targetRowHeight, galleryWidth);

        expect(rows.length).toBe(1);
        
        const row = rows[0];
        expect(row.height).toBeGreaterThanOrEqual(targetRowHeight);
        expect(row.width).toBeLessThan(galleryWidth);
        expect(row.items.length).toBe(1);

        const layoutItem = row.items[0];
        expect(layoutItem.width).toBeLessThan(items[0].width);
        expect(layoutItem.height).toBeLessThan(items[0].height);
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

		const galleryWidth = 1200;
        const rows = createLayout([ item1, item2, item3 ], targetRowHeight, galleryWidth);

        expect(rows.length).toBe(1);
        
        const row = rows[0];
        expect(row.height).toBe(targetRowHeight);
        expect(row.width).toBeLessThan(galleryWidth);
        expect(row.items.length).toBe(3);
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
        expect(firstRow.height).toBeGreaterThan(targetRowHeight);
        expect(firstRow.items.length).toBe(2);
        expect(firstRow.items[0].width).toBeGreaterThan(items[0].width);
        expect(firstRow.items[0].height).toBeGreaterThan(items[0].height);
        expect(firstRow.items[1].width).toBeGreaterThan(items[1].width);
        expect(firstRow.items[1].height).toBeGreaterThan(items[1].height);
        
        const secondRow = rows[1];
        expect(secondRow.height).toBe(targetRowHeight);
        expect(secondRow.items.length).toBe(1);
        expect(secondRow.items[0].width).toBe(items[2].width);
        expect(secondRow.items[0].height).toBe(targetRowHeight);
    });    
    
    test("scaled items wrap to next line on overflow", () => {

        const targetRowHeight = 110;
        const galleryWidth = 600;
        const items = [ 
            {
                width: 100,
                height: 40,
            },
            {
                width: 110,
                height: 60,
            },

            // The third item overflows the width of the gallery, but only when the
            // image is rescaled to fit the target row width.
            {
                width: 80,
                height: 30,
            },
        ];
        
        const rows = createLayout(items, targetRowHeight, galleryWidth);
        expect(rows.length).toBe(2); // Expect items to be allocated across two rows.
        
        const firstRow = rows[0];
        expect(firstRow.height).toBeGreaterThan(targetRowHeight);
        expect(firstRow.items.length).toBe(2);
        expect(firstRow.items[0].width).toBeGreaterThan(items[0].width);
        expect(firstRow.items[0].height).toBeGreaterThan(items[0].height);
        expect(firstRow.items[1].width).toBeGreaterThan(items[1].width);
        expect(firstRow.items[1].height).toBeGreaterThan(items[1].height);
        
        const secondRow = rows[1];
        expect(secondRow.height).toBe(targetRowHeight);
        expect(secondRow.items.length).toBe(1);
        expect(secondRow.items[0].width).toBeGreaterThan(items[2].width);
        expect(secondRow.items[0].height).toBeGreaterThan(items[2].height);
    });    
        
    test("items that are not on the last row should stretch toward the boundary", () => {

        const targetRowHeight = 110;
        const items = [ 
            {
                width: 200,
                height: 100,
            },
            {
                width: 300,
                height: 140,
            }, 
            {
                width: 180,
                height: 30,
            },
        ];
        
        const galleryWidth = 670;
        const rows = createLayout(items, targetRowHeight, galleryWidth);

        expect(rows.length).toBe(2);
        
        //
        // The first row is stretched out toward the boundary.
        //
        const firstRow = rows[0];
        expect(firstRow.items.length).toBe(2);

        for (let i = 0; i < 2; ++i) {
            expect(firstRow.items[i].width).toBeGreaterThan(items[i].width);
            expect(firstRow.items[i].height).toBeGreaterThan(items[i].height);
        }

        //
        // The height of the first row should be larger than the target.
        //
        expect(firstRow.height).toBeGreaterThan(targetRowHeight);

        //
        // The first frow must stretch to the width of the gallery.
        //
        expect(firstRow.width).toBeGreaterThanOrEqual(galleryWidth);

        //
        // The second row is not stretched.
        //        
        const secondRow = rows[1];
        expect(secondRow.items.length).toBe(1);

        // 
        // The height of the second row is the target.
        //
        expect(secondRow.height).toBe(targetRowHeight);

        //
        // The second row doesn't extend to the width of the gallery.
        //
        expect(secondRow.width).toBeLessThan(galleryWidth);

    });        
});