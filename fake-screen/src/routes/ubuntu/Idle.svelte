<script>
    let {
        time = "22:22",
        dateString = "Tuesday, February 2",
        show = false,
    } = $props();
</script>

<div
    class="idle"
    style:--translateY={show ? "translateY(0)" : "translateY(-100%)"}
>
    <div class="time-container">
        <div class="content">
            <div class="time">{time}</div>
            <div class="date">{dateString}</div>
        </div>
    </div>
</div>

<style>
    .idle {
        transition: transform 1s;
        transform: var(--translateY);
        height: 100%;
        width: 100%;
        background: url("/ubuntu1804.jpg");
        background-size: cover;
        top: 0;
        left: 0;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        .content {
            height: 100%;
            color: #fff;
            padding-bottom: 20px;
        }
        .time {
            text-shadow: -1px 2px 4px rgb(50, 50, 50);
            text-align: center;
            font-size: 6rem;
            font-weight: 600;
            margin-bottom: 7px;
        }
        .date {
            text-shadow: -1px 1px rgb(50, 50, 50);
            font-size: 2.3rem;
            font-weight: 100;
            text-align: center;
        }
    }
</style>
