<script>
  import { onMount } from "svelte";
  import { listen, idle /*, onIdle */ } from "svelte-idle";
  import { twoDigits, getDayStr, getMonthStr } from "$lib/utils";
  import Header from "./Header.svelte";
  import LoginContainer from "./LoginContainer.svelte";
  import Idle from "./Idle.svelte";
  import "./ubuntu.css";

  let { hintTimeout = 1300, idleTimeout = 5000 } = $props();

  let password = $state("");
  let hint = $state("");
  let time = $state();
  let dateString = $state();

  // idle için
  listen({
    timer: idleTimeout,
  });

  function onPasswordChange(event) {
    password = event.target.value;
  }

  function onSubmit() {
    if (!password.length) return;
    hint = "Wrong password!";

    setTimeout(() => (hint = ""), hintTimeout);
  }

  function onPasswordClear() {
    password = "";
  }

  onMount(() => {
    const timer = setInterval(() => {
      const date = new Date();
      dateString = formatDateStr(date);
      time = [date.getHours(), date.getMinutes()].map(twoDigits).join(":");
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  function formatDateStr(date) {
    return `${getDayStr(date.getDay())}, ${getMonthStr(date.getMonth())} ${date.getDate()}`;
  }
</script>

<div style="position: relative; font-family: 'Ubuntu'; height: 100%;">
  <Header />
  <LoginContainer
    {onPasswordChange}
    {password}
    {hint}
    {onSubmit}
    {onPasswordClear}
  />
  <Idle show={$idle} {time} {dateString} />
</div>
