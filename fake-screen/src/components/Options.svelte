<script>
  import { onMount } from "svelte";
  import themes from "$lib/themes";
  import Option from "./Option.svelte";
  import GithubCorner from "./GithubCorner.svelte";
  import ScrollTop from "./ScrollTop.svelte";

  let nearTop = $state(true);

  onMount(() => {
    const onScroll = () => {
      nearTop = window.pageYOffset < 150;
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  function onScrollTop() {
    window.scroll({ top: 0, behavior: "smooth" });
  }
</script>

<div class="options">
  <div class="container">
    <header>
      <a href="https://github.com/sternix/svelte5-examples/fake-screen">
        <span class="title">Fake Screen</span>
      </a>
      <GithubCorner />
    </header>
    <div class="grid">
      {#each themes as { name, imgUrl, displayName }}
        <a class="area" href="/{name}">
          <Option {name} {imgUrl} {displayName} />
        </a>
      {/each}
    </div>
  </div>
  <ScrollTop handleClick={onScrollTop} show={!nearTop} />
</div>

<style>
  .options {
    height: 100%;
    position: relative;
    width: 100%;
    .container {
      background-color: #fff9c4;
      min-height: 100%;
    }
    header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 150px;
      filter: drop-shadow(rgba(61, 193, 211, 0.8) 1px 1px 1.5px);
      .title {
        color: #64ceaa;
        text-align: center;
        font-size: 2em;
      }
      a {
        text-decoration: none;
      }
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, 288px);
      grid-auto-rows: 162px;
      grid-gap: 40px 40px;
      justify-content: center;
      padding: 0 40px 60px;
    }
    .area {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
</style>
