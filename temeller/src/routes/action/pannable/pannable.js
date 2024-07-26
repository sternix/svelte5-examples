export default function pannable(node) {
    let x, y;

    function handlePointerdown(event) {
        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(new CustomEvent('panstart', {
            detail: { x, y }
        }));

        window.addEventListener('pointermove', handlePointermove);
        window.addEventListener('pointerup', handlePointerup);
    }

    function handlePointermove(event) {
        const dx = event.clientX - x;
        const dy = event.clientY - y;

        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(
            new CustomEvent('panmove', {
                detail: { x, y, dx, dy }
            })
        );
    }

    function handlePointerup(event) {
        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(
            new CustomEvent('panend', {
                detail: { x, y }
            })
        );

        window.removeEventListener('pointermove', handlePointermove);
        window.removeEventListener('pointerup', handlePointerup);
    }

    node.addEventListener('pointerdown', handlePointerdown);

    return {
        destroy() {
            node.removeEventListener('pointerdown', handlePointerdown);
        }
    }
}