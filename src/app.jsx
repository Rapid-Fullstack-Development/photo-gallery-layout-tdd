const gallery = require("./gallery.json");
const { Gallery } = require("./gallery");

export function App() {
    return (
        <Gallery
            items={gallery}
            />
    );
}