<script>
    import { onMount } from "svelte";
    import CountDowner from "$lib/CountDowner";
    import { twoDigits } from "$lib/utils";
    import Window from "./Window.svelte";

    let { raise = [0, 0, 10, 0], lose = [0, 1, 0, 0] } = $props();

    let raiseDeadline = formatDeadline(offsetDate(new Date(), raise));
    let loseDeadline = formatDeadline(offsetDate(new Date(), lose));
    let remainRaiseTime = $state(formatDisplay(raise));
    let remainLoseTime = $state(formatDisplay(lose));
    let payment = $state(300);
    let raiseProgress = $state(formatProgress(0));
    let loseProgress = $state(formatProgress(0));

    function onCheck() {
        alert(`You didn't pay!\nYour files will be lost on ${loseDeadline}!`);
    }

    function onDecrypt() {
        alert(`Decrypt failed!\nPlease click <Contact Us>!`);
    }

    function onCopy() {
        try {
            document.execCommand("copy");
        } catch {
        } finally {
            alert("Content copied Successfully!");
        }
    }

    function onExit() {
        history.push("/");
    }

    onMount(() => {
        const now = new Date();
        const raiseTime = offsetDate(now, raise);
        const loseTime = offsetDate(now, lose);
        const raiseTimer = new CountDowner(raiseTime);
        const loseTimer = new CountDowner(loseTime);

        raiseTimer.on("second", (arr) => {
            remainRaiseTime = formatDisplay(arr);
            raiseProgress = formatProgress(raiseTimer.progress());
        });

        loseTimer.on("second", (arr) => {
            remainLoseTime = formatDisplay(arr);
            loseProgress = formatProgress(loseTimer.progress());
        });

        raiseTimer.on("stop", () => {
            payment = 600;
            raiseProgress = formatProgress(raiseTimer.progress());
        });

        loseTimer.on("stop", () => {
            loseProgress = formatProgress(loseTimer.progress());
        });

        remainRaiseTime = formatDisplay(raiseTimer.getLast());
        remainLoseTime = formatDisplay(loseTimer.getLast());
        document.addEventListener("copy", setClipboardData);

        return () => {
            document.removeEventListener("copy", setClipboardData);
            raiseTimer.clear();
            loseTimer.clear();
        };
    });

    function formatDisplay(array) {
        return array.map(twoDigits).join(":");
    }

    function formatProgress(p) {
        return `${p * 100}%`;
    }

    function offsetDate(now, array) {
        const date = new Date();
        date.setDate(now.getDate() + array[0]);
        date.setHours(now.getHours() + array[1]);
        date.setMinutes(now.getMinutes() + array[2]);
        date.setSeconds(now.getSeconds() + array[3]);
        return date;
    }

    function formatDeadline(date) {
        const y = date.getFullYear();
        const M = date.getMonth() + 1;
        const d = date.getDate();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const dateStr = [M, d, y].map(twoDigits).join("/");
        const timeStr = [h, m, s].map(twoDigits).join(":");
        return `${dateStr} ${timeStr}`;
    }

    function setClipboardData(event) {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData(
                "text/plain",
                "Money! Give me Money! ლ(́◉◞౪◟◉‵ლ)",
            );
        }
    }
</script>

<div style="height: 100%; background: #000;">
    <Window
        {remainLoseTime}
        {remainRaiseTime}
        {raiseProgress}
        {loseProgress}
        {payment}
        {onDecrypt}
        {onCheck}
        {onCopy}
        {onExit}
        {raiseDeadline}
        {loseDeadline}
    />
</div>
