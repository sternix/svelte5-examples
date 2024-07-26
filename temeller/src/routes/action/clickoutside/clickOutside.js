export default function clickOutside(node,fn) {
    const handleClick = (event) => {
        if (!node.contains(event.target)) {
            fn();
        }
    }
    document.addEventListener('click', handleClick, true)

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}