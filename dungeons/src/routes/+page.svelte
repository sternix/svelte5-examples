<script>
    import "./app.css";
    import genMaze from "$lib/genMaze";
    import Map from "$lib/components/Map.svelte";
    import Header from "$lib/components/Header.svelte";
    import {
        MAX_DEPTH,
        MAX_HP,
        FLAG_SCORE,
        STATUS,
        ROWS,
        COLUMNS,
    } from "$lib/constants";

    const mazeDir = genMaze(ROWS, COLUMNS);
    let interval = $state();

    let durum = $state({
        player: {
            x: Math.floor((Math.random() * COLUMNS) / 2),
            y: Math.floor((Math.random() * ROWS) / 2),
        },
        monster: {
            x: Math.floor((Math.random() * COLUMNS) / 2) + COLUMNS / 2,
            y: Math.floor((Math.random() * ROWS) / 2) + ROWS / 2,
        },
        items: [],
        key: "",
        score: 0,
        hp: MAX_HP,
        status: STATUS.START,
        auto: false,
    });

    function changeKey({ key }) {
        if (durum.key === "r" && durum.status !== STATUS.GAME_OVER) {
            if (durum.auto) {
                noauto();
                durum.auto = false;
            } else {
                auto();
                durum.auto = true;
            }
        }
        if (durum.auto) return;
        if (durum.key === "Enter") {
            action();
            durum.key = "";
        } else if ("wsadef".includes(key)) durum.key = key;
    }

    function autoAction() {
        movePlayerAuto();
        moveMonster();
        actionAuto();
    }

    function action() {
        monsterAttack();
        switch (durum.key) {
            case "e":
                pick();
                break;
            case "f":
                attack();
                break;
            case "w":
            case "s":
            case "a":
            case "d":
                movePlayer();
                break;
            default:
        }
        moveMonster();
        checkScore();
    }

    function clearListener() {
        window.removeEventListener('keypress', changeKey);
    }

    function monsterAttack() {
        const { hp, monster, player, key } = durum;
        if (monster.x !== player.x || monster.y !== player.y || key === "f")
            return;
        if (hp > 2) {
            durum.hp = hp - 2;
        } else {
            durum.hp = 0;
            durum.status = STATUS.GAME_OVER;
            clearListener();
        }
    }

    function moveMonster() {
        const monster = dfs(durum.monster, 0, 4, durum.player, MAX_DEPTH);
        if (monster) durum.monster = monster;
    }

    function movePlayer() {
        const { player, key } = durum;
        const pos = { ...player };
        const dir = "wsad".indexOf(key);
        if (!checkWall(pos, dir)) return alert("Boom!");
        switch (dir) {
            case 0:
                pos.y -= 1;
                break;
            case 1:
                pos.y += 1;
                break;
            case 2:
                pos.x -= 1;
                break;
            case 3:
                pos.x += 1;
                break;
            default:
        }
        durum.player = pos;
    }

    function movePlayerAuto() {
        const player = dfs(durum.player, 0, 42, durum.monster, 999);
        durum.player = player;
    }

    function actionAuto() {
        const { player, monster } = durum;
        if (player.x === monster.x && player.y === monster.y) {
            attack();
            pick();
        }
    }

    function auto() {
        interval = setInterval(autoAction, 10);
    }

    function noauto() {
        clearInterval(interval);
    }

    function attack() {
        const { monster, player, score, items } = durum;
        if (player.x === monster.x && player.y === monster.y) {
            durum.monster = {
                    x: Math.floor(Math.random() * 16),
                    y: Math.floor(Math.random() * 16),
                };
            durum.items = [...items, { ...player }];
            durum.score = score + 1;
            checkScore();
        } else {
            alert("Boom!");
        }
    }

    function checkScore() {
        if (durum.score === FLAG_SCORE) {
            durum.status = STATUS.FLAG;
        }
    }

    function pick() {
        const { items, player, hp } = durum;
        let itemIndex = -1;
        items.forEach(({ x, y }, i) => {
            if (x === player.x && y === player.y) {
                itemIndex = i;
            }
        });
        if (itemIndex === -1) {
            alert("Boom!");
            return;
        }
        durum.items = items.filter((_, i) => i !== itemIndex);
        durum.hp = hp < MAX_HP ? hp + 1 : MAX_HP;
    }

    function checkWall(pos, dir) {
        return mazeDir[pos.x + pos.y * 16][dir];
    }

    function dfs(pos, depth, last, desPos, maxDepth) {
        if (depth === maxDepth) return false;
        if (desPos.x === pos.x && desPos.y === pos.y) return pos;
        for (let dir = 0; dir < 4; dir++) {
            if ((last ^ 1) === dir) continue;
            if (checkWall(pos, dir)) {
                let newPos = { ...pos };
                switch (dir) {
                    case 0:
                        newPos.y -= 1;
                        break;
                    case 1:
                        newPos.y += 1;
                        break;
                    case 2:
                        newPos.x -= 1;
                        break;
                    case 3:
                        newPos.x += 1;
                        break;
                    default:
                }
                if (dfs(newPos, depth + 1, dir, desPos, maxDepth)) {
                    return newPos;
                }
            }
        }
        return false;
    }
</script>

<svelte:window onkeypress={changeKey} />

{#snippet Items()}
    {@const {items} = durum }
    {#each items as pos,i}
        {@render Item(pos.x,pos.y,i)}
    {/each}
{/snippet}

{#snippet Monster()}
    {@const {player,monster} = durum }
    {#if player.x === monster.x && player.y === monster.y}
        {@render Item(monster.x, monster.y, 'B')}
    {:else}
        {@render Item(monster.x, monster.y, 'M')}
    {/if}
{/snippet}

{#snippet Player()}
    {@const { player, items } = durum }
    {#if items.find(pos => pos.x === player.x && pos.y === player.y)}
        {@render Item(player.x, player.y, 'G')}
    {:else}
        {@render Item(player.x, player.y, 'O')}
    {/if}
{/snippet}

{#snippet Item(x,y,c)}
    <div
        style:transform='translate({x * 50}px,{y * 50}px)'
        class="item"
    >
        {c}
    </div>  
{/snippet}

<a
    href="https://github.com/sternix/svelte5-examples"
    class="github-corner"
    aria-label="View source on GitHub"
>
    <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        style="fill:#fff; color:#151513; position: absolute; top: 0; border: 0; right: 0;"
        aria-hidden="true"
    >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style="transform-origin: 130px 106px;"
            class="octo-arm"
        ></path>
        <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            class="octo-body"
        ></path></svg
    ></a
>

<div class="App">
    <Header {...durum} />
    {@render Items()}
    {@render Player()}
    {@render Monster()}
    <Map mazeDir={mazeDir} />
    <div class="key">[&gt;] action: {durum.key}</div>
  </div>

<style>
    .github-corner:hover .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
    }
    @keyframes octocat-wave {
        0%,
        100% {
            transform: rotate(0);
        }
        20%,
        60% {
            transform: rotate(-25deg);
        }
        40%,
        80% {
            transform: rotate(10deg);
        }
    }
    @media (max-width: 500px) {
        .github-corner:hover .octo-arm {
            animation: none;
        }
        .github-corner .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
        }
    }
</style>
