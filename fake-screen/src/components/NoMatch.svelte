<script>
    import { onMount } from "svelte";

    let shadow;

    onMount(() => {
        function mouseMove(e) {
            const { clientX, clientY } = e;
            shadow.style["-webkit-mask-image"] =
                `radial-gradient(circle at ${clientX}px ${clientY}px, rgba(0,0,0,0.0) 0, rgba(0,0,0,1) 30%)`;
        }
        shadow.style["-webkit-mask-image"] =
            `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.0) 0, rgba(0,0,0,1) 30%)`;

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    });
</script>

<div class="background">
    <div class="text">404</div>
    <div class="text">Not Found</div>
    <div class="hint">{"<"} Home Page</div>
</div>
<div bind:this={shadow} class="shadow">
    <div class="hint">{"<"} Home Page</div>
</div>

<style>
    @keyframes hintAnimation {
        0% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(15px);
        }
        100% {
            transform: translateX(0);
        }
    }

    .background {
        height: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        .text:nth-child(1) {
            font-size: 150px;
        }
        .text {
            font-weight: 700;
            font-size: 130px;
        }
        .hint {
            animation: hintAnimation 1.5s infinite;
            transition-timing-function: cubic-bezier(0.1, 0.7, 1, 0.1);
            position: absolute;
            top: 0;
            left: 50px;
            height: 50px;
            line-height: 50px;
            color: black;
        }
    }

    .shadow {
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        background-color: black;
        position: absolute;
        .hint {
            animation: hintAnimation 1.5s infinite;
            transition-timing-function: cubic-bezier(0.1, 0.7, 1, 0.1);
            position: absolute;
            top: 0;
            left: 50px;
            height: 50px;
            line-height: 50px;
            color: white;
        }
    }
</style>
