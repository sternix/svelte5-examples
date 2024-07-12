<script>
// @ts-nocheck

    import dead from "$assets/dead.png";
    import smile from "$assets/smile.png";
    import win from "$assets/win.png";
    import ohh from "$assets/ohh.png";
    import empty from "$assets/empty.png";
    import open1 from "$assets/open1.png";
    import open2 from "$assets/open2.png";
    import open3 from "$assets/open3.png";
    import open4 from "$assets/open4.png";
    import open5 from "$assets/open5.png";
    import open6 from "$assets/open6.png";
    import open7 from "$assets/open7.png";
    import open8 from "$assets/open8.png";
    import flag from "$assets/flag.png";
    import mine from "$assets/mine-ceil.png";
    import mineDeath from "$assets/mine-death.png";
    import misFlagged from "$assets/misflagged.png";
    import question from "$assets/question.png";
    import checked from "$assets/checked.png";

    import Digit from "./Digit.svelte";

    let {
        ceils,
        mines,
        changeCeilState,
        onReset,
        openCeil,
        openCeils,
        status,
        onClose,
        difficulty,
        openingCeil,
        openingCeils,
        sameTouchPos,
        lastTouch,
        seconds = $bindable()
    } = $props();

    let face;
    let dropDown;
    let topBar;
    let mouseDownContent = $state(false);
    let openOption = $state();
    let openBehavior = $state({ index: -1, behavior: "" });
    let platform = $derived(window.innerWidth <= 768 ? 'mobile' : 'desktop');

    function remainMines() {
        return (
            mines -
            ceils.filter(
                (ceil) => ceil.state === "flag" || ceil.state === "misflagged",
            ).length
        );
    }

    function onMouseDownContent(e) {
        if (e.button !== 0) return;
        if (face.contains(e.target) || status === "won" || status === "died")
            return;

        mouseDownContent = true;
    }

    $effect(() => {
      // TODO: çok fala event oluşturuyor
      console.log("View openBehavior effect");
        const { index, behavior } = openBehavior;
        switch (behavior) {
            case "single":
                return openingCeil(index);
            case "multi":
                return openingCeils(index);
            default:
                openingCeil(-1);
        }
    });

    function onMouseDownCeils(e, index) {
        if (e.button === 2 && e.buttons === 2 && index !== -1) {
            changeCeilState(index);
        } else if (e.button === 0 && e.buttons === 1) {
            openBehavior = {
                index,
                behavior: "single",
            };
        } else if (e.buttons === 3) {
            openBehavior = {
                index,
                behavior: "multi",
            };
        }
    }

    function onMouseOverCeils(index) {
        openBehavior = {
            index,
            behavior: openBehavior.behavior,
        };
    }

    function onMouseUpCeils() {
        const { behavior, index } = openBehavior;
        if (index === -1) return;
        if (behavior === "single") {
            openCeil(index);
        } else if (behavior === "multi") {
            openCeils(index);
        }
    }

    function hoverOption(option) {
        if (openOption) openOption = option;
    }

    function onMouseUp(e) {
        openBehavior = { index: -1, behavior: "" };
        mouseDownContent = false;
        if (!dropDown.contains(e.target)) openOption = "";
    }

    function onTouchEndDropdown(e) {
        if (!dropDown.contains(e.target) && !topBar.contains(e.target))
            openOption = "";
    }

    function onTouchEndCeils(e) {
        const index = Array.prototype.indexOf.call(
            e.currentTarget.children,
            e.target.closest(".mine__ceil"),
        );
        if (index === -1 || !sameTouchPos) return;
        if (new Date() - lastTouch < 150) {
            if (ceils[index].state === "open") {
                openCeils(index);
            } else {
                openCeil(index);
            }
        } else {
            changeCeilState(index);
        }
    }

    $effect(() => {
      console.log("View touch effect");
        window.addEventListener("touchend", onTouchEndDropdown);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchend", onTouchEndDropdown);
        };
    });

    function getTextImg(index) {
        return [empty, open1, open2, open3, open4, open5, open6, open7, open8][
            index
        ];
    }

    let gameVisibility = $derived(openOption === 'Game' ? 'visible' : 'hidden');
    let helpVisibility = $derived(openOption === 'Help' ? 'visible' : 'hidden');

/*
--game-visibility
--help-visibility
--columns
--rows

--color
--bgcolor
*/
</script>



<!--
--game-visibility = openOption === 'Game' ? 'visible' : 'hidden'
--help-visibility: openOption === 'Help' ? 'visible' : 'hidden' }}
--columns
--rows
--color
--bgcolor

color: ${({ platform }) => (platform === 'desktop' ? '#FFF' : '#000')};
      background-color: ${({ platform }) =>
        platform === 'desktop' ? '#0b61ff' : 'transparent'};

https://github.com/sveltejs/svelte/blob/main/documentation/docs/02-template-syntax/05-styles-and-classes.md 

-->

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div style="display: inline-block;" oncontextmenu={(e) => e.preventDefault()}>
  <div class="mine__drop-downs" bind:this={dropDown}>
    <div
      style:visibility={gameVisibility}
      class="mine__drop-down"
    >
      <div class="mine__drop-down__title">Game</div>
      <div class="mine__drop-down__menu">
        <div class="mine__drop-down__row" onmouseup={() => onReset()}>
          <div class="mine__drop-down__check"></div>
          <div class="mine__drop-down__text">New</div>
          <span class="mine__drop-down__hot-key">F2</span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div class="mine__drop-down__separator"></div>
        <div
          class="mine__drop-down__row"
          onmouseup={() => onReset('Beginner')}
          ontouchstart={() => onReset('Beginner')}
        >
          <div class="mine__drop-down__check">
            {#if difficulty === 'Beginner'}
              <img src={checked} alt="checked" />
            {/if}
          </div>
          <span>Beginner</span>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div
          class="mine__drop-down__row"
          onmouseup={() => onReset('Intermediate')}
          ontouchstart={() => onReset('Intermediate')}
        >
          <div class="mine__drop-down__check">
            {#if difficulty === 'Intermediate'}
              <img src={checked} alt="checked" />
            {/if}
          </div>
          <span>Intermediate</span>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div
          class="mine__drop-down__row"
          onmouseup={() => onReset('Expert')}
          ontouchstart={() => onReset('Expert')}
        >
          <div class="mine__drop-down__check">
            {#if difficulty === 'Expert'}
             <img src={checked} alt="checked" />
            {/if}
          </div>
          <span>Expert</span>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div class="mine__drop-down__row">
          <div class="mine__drop-down__check"></div>
          <span>Custom...</span>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div class="mine__drop-down__separator"></div>
        <div class="mine__drop-down__row">
          <div class="mine__drop-down__check">
            <img src={checked} alt="checked" />
          </div>
          <span>Marks (?)</span>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div class="mine__drop-down__row">
          <div class="mine__drop-down__check">
            <img src={checked} alt="checked" />
          </div>
          <span>Color</span>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div class="mine__drop-down__row">
          <div class="mine__drop-down__check"></div>
          <span>Sound</span>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div class="mine__drop-down__separator"></div>
        <div class="mine__drop-down__row">
          <div class="mine__drop-down__check"></div>
          <span>Best Times...</span>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div class="mine__drop-down__separator"></div>

        <div class="mine__drop-down__row" onMouseUp={onClose}>
          <div class="mine__drop-down__check"></div>
          <span>Exit</span>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
      </div>
    </div>
    <div
      style:visibility={helpVisibility}
      class="mine__drop-down"
    >
      <div class="mine__drop-down__title">Help</div>
      <div class="mine__drop-down__menu">
        <div class="mine__drop-down__row">
          <div class="mine__drop-down__check"></div>
          <div class="mine__drop-down__text">Contents</div>
          <span class="mine__drop-down__hot-key">F1</span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div class="mine__drop-down__row">
          <div class="mine__drop-down__check"></div>
          <div class="mine__drop-down__text">Search for Help on...</div>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div class="mine__drop-down__row">
          <div class="mine__drop-down__check"></div>
          <div class="mine__drop-down__text">Using Help</div>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div class="mine__drop-down__separator"></div>
        <div class="mine__drop-down__row">
          <div class="mine__drop-down__check"></div>
          <div class="mine__drop-down__text">About Minesweeper...</div>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
        <div class="mine__drop-down__row">
          <div class="mine__drop-down__check"></div>
          <a
            class="mine__drop-down__text"
            href="https://github.com/sternix/svelte5-examples"
          >
            Github
          </a>
          <span class="mine__drop-down__hot-key"></span>
          <div class="mine__drop-down__arrow"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="mine__top-bar" bind:this={topBar}>
    <div
      onmousedown={() => openOption = 'Game'}
      ontouchstart={() => openOption = (openOption ? '' : 'Game')}
      onmouseover={() => hoverOption('Game')}
      onfocus={() => hoverOption('Game')}
      class="mine__top-bar__text"
    >
      Game
    </div>
    <div
      onmousedown={() => openOption = 'Help'}
      ontouchstart={() => openOption = openOption ? '' : 'Help'}
      onmouseover={() => hoverOption('Help')}
      onfocus={() => hoverOption('Help')}
      class="mine__top-bar__text"
    >
      Help
    </div>
  </div>
  <section class="mine__content" onmousedown={onMouseDownContent}>
    <div class="mine__score-bar">
      <div class="mine__digits__outer">
        <Digit number={remainMines()} />
      </div>
      <div class="mine__face__outer">
        <button bind:this={face} class="mine__face" onclick={() => onReset()}>
          {@render statusFace()}
          <img alt="smile" src={smile} />
        </button>
      </div>
      <div class="mine__digits__outer"><Digit number={seconds}/></div>
    </div>
    <div
      class="mine__content__inner"
      ontouchend={onTouchEndCeils}
      onmouseup={onMouseUpCeils}
    >
      {@render Ceils(ceils,onMouseDownCeils)}
    </div>
  </section>
</div>

{#snippet Ceils(ceils,onMouseDown, onMouseEnter)}
  {#each ceils as ceil,index (index)}
    <div
      onmousedown={e => onMouseDown(e, index)}
      class="mine__ceil"
      index={index}
      role="button"
      tabindex={index}
      >
        {@render Ceil(ceil)}
    </div>
  {/each}
{/snippet}

{#snippet Ceil({state,minesAround,opening})}
  {#if state === 'open'}
    {@render MinesAround(minesAround) }
  {:else if state === 'flag'}
    {@render Flag() }
  {:else if state === 'misflagged'}
    {@render MisFlagged() }
  {:else if state === 'mine'}
    {@render Mine() }
  {:else if state === 'die'}
    {@render Die() }
  {:else if state === 'unknown'}
    {#if opening}
      {@render QuestionOpen() }
    {:else}
      {@render Question() }
    {/if}
  {:else}
    {#if opening}
      {@render CeilBackgroundOpen() }
    {:else}
      {@render CeilBackgroundCover() }
    {/if}
  {/if}
{/snippet}

{#snippet statusFace()}
  {#if mouseDownContent}
    <img alt="ohh" src={ohh} />
  {:else}
    {#if status === 'died'}
        <img alt="dead" src={dead} />
    {:else if status === 'won'}
        <img alt="win" src={win} />
    {:else}
        <img alt="smile" src={smile} />
    {/if}
  {/if}
{/snippet}

{#snippet CeilBackgroundOpen()}
    <div class="ceil-background-open"></div>
{/snippet}

{#snippet CeilBackgroundCover()}
    <div class="ceil-background-cover"></div>
{/snippet}

{#snippet Die()}
    {@render CeilBackgroundOpen() }
    <img alt="death" src={mineDeath} />
{/snippet}

{#snippet MisFlagged()}
   {@render CeilBackgroundOpen()} 
   <img alt="misFlagged" src={misFlagged} />
{/snippet}

{#snippet Flag()}
   {@render CeilBackgroundCover()} 
   <img alt="flag" src={flag} />
{/snippet}

{#snippet MinesAround({mines})}
   {@render CeilBackgroundOpen()} 
   <img alt="mines-around" src={getTextImg(mines)} />
{/snippet}

{#snippet Question()}
    {@render CeilBackgroundCover() }
    <img alt="question" src={question} />
{/snippet}

{#snippet QuestionOpen()}
    {@render CeilBackgroundOpen() }
    <img alt="question" src={question} /> 
{/snippet}

{#snippet Mine()}
    {@render CeilBackgroundOpen()}
    <img alt="mine" src={mine} />
{/snippet}

<style lang="scss">
 .ceil-background-cover {
    position: absolute;
    width: 16px;
    height: 16px;
    border-left: rgb(245, 245, 245) solid 2px;
    border-top: rgb(245, 245, 245) solid 2px;
    border-right: rgb(128, 128, 128) solid 2px;
    border-bottom: rgb(128, 128, 128) solid 2px;
}

.ceil-background-open {
    position: absolute;
    width: 16px;
    height: 16px;
    border-left: rgb(128, 128, 128) solid 1px;
    border-top: rgb(128, 128, 128) solid 1px;
}

/* display: inline-block; */
img {
    pointer-events: none;
}

.mine__drop-downs {
    position: absolute;
    display: flex;
    height: 20px;
}

.mine__drop-down {
    position: relative;
    z-index: 1;
}

.mine__drop-down__title {
    padding: 0 5px;
    height: 100%;
    line-height: 20px;
    font-size: 11px;
    color: white;
    background-color: #1660e8;
}

.mine__drop-down__menu {
    background-color: white;
    position: absolute;
    box-shadow: 2px 2px 1px rgb(100, 100, 100);
    border: 1px solid gray;
    padding: 2px;
    display: grid;
    grid-template-columns: 18px auto auto 15px;
    line-height: 18px;
    font-size: 11px;
}

.mine__drop-down__row {
    display: contents;

    &:hover>* {
        background: #e99f17;
        filter: invert(100%);
    }
}

.mine__drop-down__separator {
    grid-column: 1 / 5;
    height: 1px;
    background-color: gray;
    margin: 3px 1px;
}

.mine__drop-down__check {
    display: flex;
    justify-content: center;
    align-items: center;
}

.mine__drop-down__arrow {}

.mine__drop-down__hot-key {
    padding-left: 5px;
}

.mine__drop-down__text {
    white-space: nowrap;
}

.mine__top-bar {
    position: relative;
    display: flex;
    height: 20px;
    background-color: rgb(236, 233, 216);
}

.mine__top-bar__text {
    padding: 0 5px;
    height: 100%;
    line-height: 20px;
    font-size: 11px;

    &:hover {
        color: #FFF;/* var(--color); */
        background-color: #0b61ff; /* var(--bgcolor); */
    }
}

.mine__content {
    border-left: rgb(245, 245, 245) solid 3px;
    border-top: rgb(245, 245, 245) solid 3px;
    background-color: rgb(192, 192, 192);
    padding: 5px;
}

.mine__score-bar {
    height: 34px;
    border-radius: 1px;
    border-top: rgb(128, 128, 128) solid 2px;
    border-left: rgb(128, 128, 128) solid 2px;
    border-right: rgb(245, 245, 245) solid 2px;
    border-bottom: rgb(245, 245, 245) solid 2px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 7px 3px 4px;
}

.mine__digits__outer {
    width: 40px;
    height: 24px;
    border-width: 0 1px 1px 0;
    border-style: solid;
    border-color: #fff;
    text-align: right;
}

.mine__face__outer {
    width: 24px;
    height: 24px;
    border-top: 1px solid rgb(128, 128, 128);
    border-left: 1px solid rgb(128, 128, 128);
    border-radius: 2px;
    transform: translateX(1px);
}

.mine__face {
    border-radius: 2px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(192, 192, 192);
    border-width: 2px;
    border-style: solid;
    border-color: rgb(245, 245, 245) rgb(128, 128, 128) rgb(128, 128, 128) rgb(245, 245, 245);
    outline: none;

    &:active:hover {
        border-width: 1px;
        border-color: rgb(128, 128, 128);

        img {
            transform: translate(1px, 1px);
        }

        img:nth-child(1) {
            display: none;
        }

        img:nth-child(2) {
            display: block;
        }
    }

    img:nth-child(2) {
        display: none;
    }
}

.mine__content__inner {
    display: grid;
    grid-template-columns: repeat(var(--columns), 16px);
    grid-template-rows: repeat(var(--rows), 16px);
    border-top: rgb(128, 128, 128) solid 3px;
    border-left: rgb(128, 128, 128) solid 3px;
    border-right: rgb(245, 245, 245) solid 3px;
    border-bottom: rgb(245, 245, 245) solid 3px;
}

.mine__ceil {
    position: relative;
/*
    img {
        position: absolute;
        width: 16px;
        height: 16px;
    }
        */
} 
</style>
