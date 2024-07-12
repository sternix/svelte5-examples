<script>
  import Minesweeper from "./Minesweeper/Minesweeper.svelte";
  let lastTouch = $state(new Date());
  let samePos = $state(false);

  $effect(() => {
    function touchStart() {
      samePos = true;
      lastTouch = new Date();
    }
    function touchMove() {
      samePos = false;
    }

    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchmove", touchMove);

    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
    };
  });

  function onClose() {
    // burası menüdeki Exit 
    console.log("onClose çalıştı");
  }
</script>

<div class="ilk_div">
  <div class="ikinci_div">
    <Minesweeper
      defaultDifficulty="Beginner"
      {onClose}
      sameTouchPos={samePos}
      {lastTouch}
    />
  </div>
</div>

<style>
  .ilk_div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .ikinci_div {
    display: inline-block;
  }
</style>
