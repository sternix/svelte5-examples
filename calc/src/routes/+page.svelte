<script>
    let display = $state("0");

    let curNumber = $state(0);
    let prevNumber = $state(0);
    let afterOperation = $state(false);
    let curOperation = $state(undefined);

    function doOperation(operation) {
        if (!curOperation) {
            prevNumber = curNumber;
            curOperation = operation;
            afterOperation = true;
        } else if (!afterOperation) {
            evaluate(curOperation);
            prevNumber = curNumber;
            curOperation = operation;
            afterOperation = true;
        } else {
            curOperation = operation;
        }
    }

    function evaluate(operation) {
        if (!afterOperation) {
            switch (operation) {
                case "add":
                    curNumber = prevNumber + curNumber;
                    break;
                case "subtract":
                    curNumber = prevNumber - curNumber;
                    break;
                case "multiply":
                    curNumber = prevNumber * curNumber;
                    break;
                case "divide":
                    curNumber = prevNumber / curNumber;
                    break;
            }
            if (curNumber.toString().length >= 16) {
                curNumber = Number(curNumber.toFixed(16));
            }
            display = curNumber;
        }
        afterOperation = true;
        curOperation = undefined;
    }

    function changeDisplayVal(numString) {
        if (display === "0" || afterOperation) {
            display = "";
            afterOperation = false;
        }

        // fix having more than one decimal point
        if (numString === "." && display.indexOf(".") > -1) {
            numString = "";
        }

        if (display.toString().length < 16) {
            display += numString;
        }
        // set current number
        curNumber = Number(display);
    }

    function clearAll() {
        curNumber = 0;
        prevNumber = 0;
        curOperation = undefined;
        afterOperation = false;
        display = "0";
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto+Condensed"
    />
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"
    />
</svelte:head>

<div class="center">
    <div class="calculator">
        <div class="top-bar">
            <button class="op" onclick={clearAll}>C</button>
            <div class="display">{display}</div>
        </div>
        <div class="keys">
            <div class="row">
                <button class="num" onclick={changeDisplayVal("7")}>7</button>
                <button class="num" onclick={changeDisplayVal("8")}>8</button>
                <button class="num" onclick={changeDisplayVal("9")}>9</button>
                <button class="op" onclick={doOperation("multiply")}>x</button>
            </div>
            <div class="row">
                <button class="num" onclick={changeDisplayVal("4")}>4</button>
                <button class="num" onclick={changeDisplayVal("5")}>5</button>
                <button class="num" onclick={changeDisplayVal("6")}>6</button>
                <button class="op" onclick={doOperation("divide")}>/</button>
            </div>
            <div class="row">
                <button class="num" onclick={changeDisplayVal("1")}>1</button>
                <button class="num" onclick={changeDisplayVal("2")}>2</button>
                <button class="num" onclick={changeDisplayVal("3")}>3</button>
                <button class="op" onclick={doOperation("add")}>+</button>
            </div>
            <div class="row">
                <button class="num" onclick={changeDisplayVal(".")}>.</button>
                <button class="num" onclick={changeDisplayVal("0")}>0</button>
                <button class="equals" onclick={evaluate(curOperation)}
                    >=</button
                >
                <button class="op" onclick={doOperation("subtract")}>-</button>
            </div>
        </div>
    </div>
</div>

<style>
    :global(body, html) {
        height: 100%;
        background-color: #26547c;
        font-family: "Roboto Condensed";
        font-size: 24px;
    }

    button {
        border: 0;
        color: #fcfcfc;
        outline: 0;
        transition: transform 0.1s ease;
    }

    button:active {
        transform: translateY(5px);
    }

    .center {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .calculator {
        background-color: #ef476f;
        border-radius: 10px;
        box-shadow: 0 8px #eb184a;
        height: 355px;
        min-width: 390px;
        width: 390px;
    }

    .top-bar {
        display: flex;
        width: 100%;
    }

    .top-bar button {
        box-shadow: 0 4px 1px #cc8f00;
        background: #ffd166;
        border-radius: 10px;
        color: #7d7d7d;
        flex: 0.9;
        font-size: 22px;
        height: 48px;
        line-height: 48px;
        margin: 10px;
    }

    .top-bar div {
        background: #26547c;
        border-radius: 10px;
        box-shadow: inset 0 4px 5px #900d2c;
        color: #fcfcfc;
        flex: 4;
        font-size: 28px;
        height: 26px;
        margin: 10px;
        padding: 12px;
        text-align: right;
    }

    .keys {
        display: flex;
        flex-flow: column wrap;
        height: 290px;
    }

    .keys button {
        box-shadow: 0 4px 1px #142c41;
        background: #26547c;
        border-radius: 10px;
        height: 50px;
        line-height: 48px;
        margin: 9px;
        width: 75px;
    }

    .keys button.op {
        box-shadow: 0 4px 1px #cc8f00;
        background: #ffd166;
        color: #7d7d7d;
        line-height: 45px;
    }

    .keys button.equals {
        box-shadow: 0 4px 1px #048c68;
        background: #06d6a0;
        color: #7d7d7d;
    }
</style>
