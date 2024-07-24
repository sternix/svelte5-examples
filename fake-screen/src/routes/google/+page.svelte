<script>
  import Search from "./Search.svelte";
  import Main from "./Main.svelte";

  let status = $state({
    route: "main",
    query: "",
  });

  function onSearch(str) {
    if (str.length) {
      status.route = "search";
      status.query = str;
    }
  }

  function goMain() {
    status.route = "main";
    status.query = "";
  }
</script>

{#if status.route === "main"}
  <Main {onSearch} />
{:else}
  <Search {goMain} {onSearch} query={status.query} />
{/if}
