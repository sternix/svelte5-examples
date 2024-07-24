<script>
  import { goto } from "$app/navigation";
  import { isStr } from "$lib/utils";
  import themes from "$lib/themes";
  import { page } from "$app/stores";

  let isRoot = isStr("/");

  function goRoot() {
    if (!isRoot($page.url.pathname)) goto("/");
  }

  function isDark(name) {
    const path = name.split("/")[1];
    const theme = themes.find((theme) => theme.name === path);
    return theme && theme.isBackgroundDark;
  }

  function getColor(dark) {
    return dark ? "white" : "rgb(22, 22, 22)";
  }
</script>

<div class="close-button">
  <button
    onclick={goRoot}
    style:--opacity={isRoot($page.url.pathname) ? 1 : 0}
    style:--cursor={isRoot($page.url.pathname) ? "auto" : "pointer"}
    style:--bgcolor={getColor(isDark($page.url.pathname))}
  ></button>
</div>

<style>
  .close-button {
    position: absolute;
    z-index: 10;
    button {
      opacity: var(--opacity);
      font-size: 2em;
      width: 50px;
      background-color: transparent;
      outline-color: transparent;
      cursor: var(--cursor);
      border-radius: 1px;
      height: 50px;
      border: 0;
      transition: all 0.3s;
    }
    button:hover {
      opacity: 1;
    }
    button:before {
      content: "";
      position: absolute;
      left: 23px;
      top: 14px;
      transform: rotate(45deg);
      height: 23px;
      width: 2px;
      background: var(--bgcolor);
    }
    button:after {
      content: "";
      position: absolute;
      left: 23px;
      top: 14px;
      transform: rotate(-45deg);
      height: 23px;
      width: 2px;
      background: var(--bgcolor);
    }
  }
</style>
