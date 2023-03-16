const plugin = require("tailwindcss/plugin");
const flattenColorPalette = require("./utils/flattenColorPalette.cjs");

const addDefaultValues = (vals) => ({
    "inherit": "inherit",
    "initial": "initial",
    "unset": "unset",
    ...vals
});

module.exports = plugin(({ matchUtilities, theme }) => {

    matchUtilities({

        "text-gradient": (value) => ({
            "background-image": value,
            "color": "transparent",
            "background-clip": "text"
        }),

        "border-gradient": (value) => ({
            "background-clip": "padding-box, border-box",
            "background-origin": "border-box",
            "border-color": "transparent",
            "background-image": `linear-gradient(var(--tw-border-gradient-background), var(--tw-border-gradient-background)), ${value}`,
        }),

        "bg-gradient": (value) => ({
            "background-image": value,
        })

    }, { values: addDefaultValues(theme("gradients")) });

    matchUtilities({

        "border-bg": (value) => ({
            "--tw-border-gradient-background": value
        })

    }, { values: addDefaultValues(flattenColorPalette(theme("colors"))) });
});