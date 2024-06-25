<script>
    let dice = $state(0);
    let rolls = $state([]);

    function draw() {
        dice = Math.floor(Math.random() * Math.floor(6) + 1);
        rolls.push(dice)
    }

    function reset() {
        dice = 0;
        rolls = [];
    }
</script>

<main>
    <section
        style="padding-top: 50px; display: flex; gap: 20px; justify-content: center;"
    >
        <button onclick={draw}>Let's roll</button>
        <button onclick={reset}>Let's restart</button>
    </section>

    <section>
        <div
            style="display: grid; place-content: start center; padding-bottom: 28px;"
        >
            <h2 style="text-align: center; margin-top: 10px;">
                <span class="nes-text is-primary"
                    >{dice == 0 ? "Let's start rolling" : dice}</span
                >
            </h2>

            {#each rolls as r, i}
                <p style="text-align: center;">
                    <span class="nes-text is-success">
                        Rolling number {i + 1}, the dice says {r}
                    </span>
                </p>
            {/each}
        </div>
    </section>
</main>
