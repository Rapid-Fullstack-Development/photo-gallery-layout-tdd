
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

    let curRowWidth = 0;  // Tracks current row width.

    for (const item of items) {

        // 
        // Wraps to the next row on overflow.
        //
        if (curRowWidth + item.width > maxGalleryWidth) {
            //
            // Starts a new row.
            //
            curRow = {
                items: [],
                height: targetRowHeight,
            };
            rows.push(curRow);

            curRowWidth = 0; // Resets the current row width.
        }

        curRow.items.push(item);
        curRowWidth += item.width;
    }

    return rows;
}