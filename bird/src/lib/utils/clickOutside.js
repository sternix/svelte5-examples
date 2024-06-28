// https://github.com/Th1nkK1D/svelte-use-click-outside

export default function clickOutside(node, handler) {
    const handleClick = (ev) => {
        if (node && !node.contains(ev.target) && !ev.defaultPrevented) {
            handler();
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}