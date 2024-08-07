<script>
    import { FLAG, STATUS, TITLE } from "$lib/constants";

    let { score, auto, hp, status } = $props();

    function formatScore(score) {
        if (String(score).length < 5) {
            return (
                Array(5 - String(score).length)
                    .fill(0)
                    .join("") + score
            );
        }
        return score;
    }

    function getStatusString(status) {
        switch (status) {
            case STATUS.GAME_OVER:
                return "Game Over";
            case STATUS.FLAG:
                return FLAG;
            default:
                return "";
        }
    }
</script>

<div class="header">
    <div class="left">
        <div>Score</div>
        <div>{formatScore(score)}</div>
    </div>
    <div class="right">
        <div>HP</div>
        <div>
            {#each Array(hp).fill() as _}
                x
            {/each}
        </div>
    </div>
    <div>{auto ? `${TITLE} (auto)` : TITLE}</div>
    <div>{getStatusString(status)}</div>
</div>
