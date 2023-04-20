// const gallery = require("./gallery.json");
const { Gallery } = require("./gallery");

//
// NOTE: You could use something like Storybook to setup
// visualize different configurations of the gallery.
//
// const gallery = [
//     {
//         thumb: "https://via.placeholder.com/140x100",
//         width: 140,
//         height: 100,
//     },
// ];

const gallery = [
    {
        thumb: "https://via.placeholder.com/110x100",
        width: 110,
        height: 100,
    },
    {
        thumb: "https://via.placeholder.com/80x140",
        width: 80,
        height: 140,
    },
    {
        thumb: "https://via.placeholder.com/90x80",
        width: 40,
        height: 30,
    },
];

export function App() {
    return (
        <Gallery
            items={gallery}
            />
    );
}