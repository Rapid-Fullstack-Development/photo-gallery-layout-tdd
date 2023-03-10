import { createLayout } from "./layout";

export function Gallery({ items }) {

    const targetHeight = 200;
    const galleryWidth = 600;

    const rows = createLayout(items, targetHeight, galleryWidth);

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
                                    />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

