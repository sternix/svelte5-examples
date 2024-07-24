<script>
    import { onMount } from "svelte";
    import DVDLogo from "../../components/DVDLogo.svelte";
    import { choose } from "$lib/utils";

    let colors = [
        "white",
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "skyblue",
        "purple",
    ];

    let status = $state({
        color: "white",
        velocity: { x: 2, y: 2 },
    });

    let logoLeft = 0;
    let logoTop = 0;
    let vx = status.velocity.x;
    let vy = status.velocity.y;

    let logoElement;

    onMount(() => {
        let cancelAnimationFrameId;

        function animate() {
            const { left, top, width, height } =
                logoElement.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let shouldUpdate = true;

            if (left < 0) {
                logoLeft = 0;
                vx = Math.abs(vx);
            } else if (left + width > windowWidth) {
                logoLeft = windowWidth - width;
                vx = -Math.abs(vx);
            } else if (top < 0) {
                logoTop = 0;
                vy = Math.abs(vy);
            } else if (top + height > windowHeight) {
                logoTop = windowHeight - height;
                vy = -Math.abs(vy);
            } else {
                shouldUpdate = false;
                logoLeft += vx;
                logoTop += vy;
            }

            if (shouldUpdate) {
                status = {
                    velocity: {
                        x: vx,
                        y: vy,
                    },
                    color: choose(colors),
                };
            }

            logoElement.style.transform = `translate(${logoLeft}px, ${logoTop}px)`;
            cancelAnimationFrameId = requestAnimationFrame(animate);
        }

        cancelAnimationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(cancelAnimationFrameId);
        };
    });
</script>

<!-- svelte-ignore state_referenced_locally -->
<!-- svelte-ignore state_referenced_locally -->
<div class="dvd">
    <div bind:this={logoElement} class="logo">
        <DVDLogo color={status.color} />
    </div>
</div>

<style>
    .dvd {
        background-color: #000;
        height: 100%;
        cursor: none;
        overflow: hidden;
        .logo {
            overflow: hidden;
            width: 300px;
            height: 132px;
        }
        @media (max-width: 768px) {
            .logo {
                width: 150px;
                height: 66px;
            }
        }
    }
</style>
