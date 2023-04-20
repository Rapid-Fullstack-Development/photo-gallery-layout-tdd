// const gallery = require("./gallery.json");
const { Gallery } = require("./gallery");

const gallery = [
    {
        thumb: "https://via.placeholder.com/140x100",
        width: 140,
        height: 100,
    },
];

export function App() {
    return (
        <Gallery
            items={gallery}
            />
    );
}