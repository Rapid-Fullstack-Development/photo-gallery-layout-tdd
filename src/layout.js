
//
// Layout a gallery of items row by row.
//
export function createLayout(items, targetRowHeight, maxGalleryWidth) {
    if (!items || !items.length) {
        return [];
    }

    const rows = [];

    // 
    // Start the first row.
    //
    let curRow = {
        items: [],
                height: targetRowHeight,
    };
    rows.push(curRow);

    let curRowWidth = 0;

    for (const item of items) {

        const aspectRatio = item.width / item.height;
        const computedWidth = targetRowHeight * aspectRatio;

        if (curRow.items.length > 0) {
            // 
            // If there are items in the current row already,
            // test if adding the next item overlaps the boundary.
            //
            if (curRowWidth + computedWidth > maxGalleryWidth) {
                //
                // Start a new row.
                //
                curRow = {
                    items: [],
                    height: targetRowHeight,
                };
                rows.push(curRow);

                curRowWidth = 0;
            }
        }

        curRow.items.push(item);
        curRowWidth += computedWidth;
    }

    return rows;
}