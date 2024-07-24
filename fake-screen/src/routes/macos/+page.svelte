<script>
    import { onMount } from "svelte";
    import apple from "./apple.svg";

    const initState = {
        value: 0,
        hint: "About an hour remaining",
    };

    let progress = $state({...initState});

    function getText(value) {
        switch (true) {
            case value < 3:
                return "About an hour remaining";
            case value <= 5.2:
                return "Installation is in progress. Calculating time remaining...";
            case value <= 6:
                return "About an hour remaining";
            default:
                const remainMin = Math.ceil(((100 - value) * 2.5 * 2.4) / 60);
                return `About ${remainMin} minutes remaining`;
        }
    }

    function next() {
        progress.value += 0.4;
        progress.hint = getText(progress.value);
    }

    function clear() {
        progress = { ...initState };
    }

    onMount(() => {
        const interval = setInterval(
            () => {
                if (progress.value <= 100) {
                    next();
                } else {
                    clear();
                    clearInterval(interval);
                }
            },
            Math.random() * 4000 + 400,
        );

        return () => clearInterval(interval);
    });
</script>

<div class="macos">
    <div class="content">
        <img src={apple} alt="apple" class="logo" />
        <div class="progress">
            <div class="bar" style:width="{progress.value}%;"></div>
        </div>
        <span class="hint">{progress.hint}</span>
    </div>
</div>

<style>
    .macos {
        @import url("https://fonts.googleapis.com/css?family=Roboto:300");
        height: 100%;
        background: #000;
        cursor: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: roboto;
        .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .logo {
            height: 150px;
            width: 150px;
            margin: 120px 0 180px 0;
        }
        .hint {
            font-weight: 700;
            font-size: 1.1em;
            color: white;
        }
        .progress {
            border: 1px solid rgba(240, 240, 240, 0.1);
            border-radius: 5px;
            height: 8px;
            width: 360px;
            margin-bottom: 30px;
            background: rgb(30, 30, 30);
            position: relative;
            overflow: hidden;
        }
        .bar {
            position: absolute;
            width: 0;
            height: 100%;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            background: rgba(240, 240, 240, 0.9);
        }
    }
</style>
