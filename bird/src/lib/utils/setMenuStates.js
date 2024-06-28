import readStore from "./readStore";

export default function setMenuStates(activeMenu, expandedMenu) {
    const activeMenuStore = readStore('contextActiveMenu')
    const expandedMenuStore = readStore('contextExpandedMenu');
    activeMenuStore.value = activeMenu;
    expandedMenuStore.value = expandedMenu;
}