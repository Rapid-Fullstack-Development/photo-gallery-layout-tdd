import { createLayout } from "./layout";

export function Gallery({ items, targetRowHeight }) {

    const galleryWidth = 600;

    const rows = createLayout(items, targetRowHeight, galleryWidth);

    return (
        <div 
            style={{
                width: `${galleryWidth}px`,
                border: "solid green 1px",
            }}
            >
            {rows.map((row, index) => {
                return (
                    <div 
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            height: `${row.height}px`,
                        }}
                        >
                        {row.items.map(item => {
                            return (
                                <img
                                    key={item.thumb}
                                    src={item.thumb} 
                                    style={{
                                        border: "solid red 1px",
                                    }}
                                    />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

