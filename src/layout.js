
//
// Layout a gallery of items row by row.
//
export function createLayout(items, targetRowHeight) {
    if (!items || !items.length) {
        return [];
    }
    else {
        return [
            {
                items: items,
                height: targetRowHeight,
            },
        ];
    }
}