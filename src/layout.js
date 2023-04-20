
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

        const aspectRatio = item.width / item.height;
        const computedWidth = targetRowHeight * aspectRatio;

        if (curRow.items.length > 0) {
            // 
	        // Wraps to the next row on overflow.
            //
            if (curRowWidth + computedWidth > maxGalleryWidth) {
                //
                // Set the width of the previous row.
                //
                curRow.width = curRowWidth;

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

        //
        // Clone the item so we can adjust it to fit the width of the gallery.
        //
        const clone = Object.assign({}, item, {
            width: computedWidth,
            height: targetRowHeight,
        }); 

        //
        // Add the item to the row.
        //
        curRow.items.push(clone);
        curRowWidth += computedWidth;
    }

    //
    // Set the width of the final row.
    //
    curRow.width = curRowWidth;

    //
    // For all rows, except the last row, stretch the items towards the boundary to fill the gap.
    //
    for (let rowIndex = 0; rowIndex < rows.length-1; rowIndex++) {
        const row = rows[rowIndex];
        
        let rowWidth = 0;
        for (const item of row.items) { //TODO: For performance do this in the loop above and record it for the row.
            rowWidth += item.width;
        }

        const gap = maxGalleryWidth - rowWidth;
        const deltaWidth = gap / row.items.length;

        let maxThumbHeight = 0;
        let newWidth = 0;

        //
        // Expand each item to fill the space.
        //
        for (const item of row.items) {
            //
            // NOTE: This is already computed in the previous loop.
            //       Should reuse that value for performance.
            //
            const aspectRatio = item.width / item.height; 

            //
            // Increase the width of the item.
            //
            // NOTE: At this point we are modifiying our inputs so we could clone the object in the loop above.
            //
            item.width += deltaWidth; 
            newWidth += item.width;

            // 
            // Compute a new height based off the adjusted width and the original aspect ratio.
            //
            item.height = item.width * (1.0 / aspectRatio);

            //
            // Track the minimum height of this row.
            //
            maxThumbHeight = Math.max(maxThumbHeight, item.height);
        }

        row.height = maxThumbHeight;
        row.width = newWidth;
    }

    return rows;
}