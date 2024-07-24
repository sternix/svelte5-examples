import { genID } from "$lib/utils";

const getThemeID = genID();

const themes = [
    {
        id: getThemeID(),
        fullScreen: false,
        displayName: "Google not found",
        name: "google",
        imgUrl: "https://i.imgur.com/cm1uwzI.png",
        isBackgroundDark: false,
        objectFit: "contain",
    },
    {
        id: getThemeID(),
        fullScreen: true,
        displayName: "macOS update",
        name: "macos",
        imgUrl: "https://i.imgur.com/keMbIbn.png",
        isBackgroundDark: true,
        objectFit: "contain",
    },
    {
        id: getThemeID(),
        fullScreen: true,
        displayName: "Ubuntu 18.04",
        name: "ubuntu",
        imgUrl: "https://i.imgur.com/XN599kK.png",
        isBackgroundDark: true,
        objectFit: "contain",
    },
    {
        id: getThemeID(),
        fullScreen: true,
        displayName: "Wanna Crypto 2.0",
        name: "wannacry",
        imgUrl: "https://i.imgur.com/pfF2PyS.png",
        isBackgroundDark: true,
        objectFit: "contain",
    },

    {
        id: getThemeID(),
        fullScreen: true,
        displayName: "Win10 crash",
        name: "win10blue",
        imgUrl: "https://i.imgur.com/lRT82Co.png",
        isBackgroundDark: false,
        objectFit: "contain",
    },
    {
        id: getThemeID(),
        fullScreen: true,
        displayName: "Win10 update",
        name: "win10update",
        imgUrl: "https://i.imgur.com/vj1vLO7.png",
        isBackgroundDark: false,
        objectFit: "contain",
    },
    {
        id: getThemeID(),
        fullScreen: true,
        displayName: "DVD Screensaver",
        name: "dvd",
        imgUrl: "https://i.imgur.com/AaSkNGk.png",
        isBackgroundDark: true,
        objectFit: "contain",
    },
];

export default themes;