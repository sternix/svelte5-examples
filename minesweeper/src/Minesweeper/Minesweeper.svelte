<script>
    import sampleSize from "lodash.samplesize";
    import { Config } from "./config";
    import View from "./View.svelte";

    // state: {
    //   difficulty: 'Beginner' || 'Intermediate' || 'Expert',
    //   status: 'new' || 'started' || 'died' || 'won',
    //   rows: Number,
    //   columns: Number,
    //   mines: Number,
    //   ceils: Array {
    //     durum: 'cover' || 'flag' || 'unknown' || 'open' || 'die' || 'misflagged',
    //     minesAround: Number (negative for mine itself),
    //     opening: true || false
    //   }
    // }

    let { defaultDifficulty, onClose, sameTouchPos, lastTouch } = $props();

    // @ts-ignore
    let status = $state(getInitState(defaultDifficulty));
    let seconds = $state(0);

    $effect(() => {
        let timer;
        status.status;
        switch (status.status) {
            case "started":
                timer = setInterval(() => (seconds += 1), 1000);
                break;
            case "new":
                seconds = 0;
                break;
            default:
                break;
        }
        return () => clearInterval(timer);
    });

    function getInitState(difficulty = "Beginner") {
        return {
            difficulty,
            status: "new",
            ...genGameConfig(Config[difficulty]),
        };
    }

    function dispatch(action = {}) {
        //console.log(JSON.stringify(action,null,2))
        //console.log("dispatch", action.type);
        switch (action.type) {
            case "CLEAR_MAP":
                const difficulty = action.payload || status.difficulty;
                status = getInitState(difficulty);
                break;

            case "START_GAME":
                const exclude = action.payload;
                status = {
                    ...status,
                    ...insertMines(
                        { ...Config[status.difficulty], exclude },
                        status.ceils,
                    ),
                    status: "started",
                };
                break;

            case "OPEN_CEIL": {
                //console.log("OPEN_CEIL: action.payload", action.payload);
                const indexes = autoCeils(action.payload);
                const ceils = [...status.ceils];
                indexes.forEach((i) => {
                    const ceil = ceils[i];
                    ceils[i] = { ...ceil, durum: "open" };
                });
                status = {
                    ...status,
                    ceils,
                };
                break;
            }

            case "CHANGE_CEIL_STATE": {
                const index = action.payload;
                const ceils = [...status.ceils];
                const ceil = status.ceils[index];
                let newState;
                switch (ceil.durum) {
                    case "cover":
                        newState = "flag";
                        break;
                    case "flag":
                        newState = "unknown";
                        break;
                    case "unknown":
                        newState = "cover";
                        break;
                    default:
                        throw new Error(`Unknown ceil state ${ceil.durum}`);
                }
                ceils[index] = { ...ceil, durum: newState };
                status = {
                    ...status,
                    ceils,
                };
                break;
            }

            case "GAME_OVER": {
                const ceils = status.ceils.map((ceil) => {
                    if (ceil.minesAround < 0 && ceil.durum !== "flag") {
                        return {
                            ...ceil,
                            durum: "mine",
                        };
                    } else if (ceil.durum === "flag" && ceil.minesAround >= 0) {
                        return {
                            ...ceil,
                            durum: "misflagged",
                        };
                    } else {
                        return {
                            ...ceil,
                            opening: false,
                        };
                    }
                });
                ceils[action.payload].durum = "die";
                status = {
                    ...status,
                    status: "died",
                    ceils,
                };
                break;
            }

            case "WON": {
                const ceils = status.ceils.map((ceil) => {
                    if (ceil.minesAround >= 0) {
                        return {
                            ...ceil,
                            durum: "open",
                        };
                    } else {
                        return {
                            ...ceil,
                            durum: "flag",
                        };
                    }
                });
                status = {
                    ...status,
                    ceils,
                    status: "won",
                };
                break;
            }

            case "OPENING_CEIL": {
                /*
                if (action.payload === -1)
                    return;
                const ceil = status.ceils[action.payload];
                const ceils = status.ceils.map((ceil) => ({
                    ...ceil,
                    opening: false,
                }));
                ceils[action.payload] = { ...ceil, opening: true };
                status.ceils = ceils;
                */
                const index = action.payload;
                if (index === -1) return;
                status.ceils[index].opening = true;
                break;
            }

            case "OPENING_CEILS": {
                const indexes = getNearIndexes(
                    action.payload,
                    status.rows,
                    status.columns,
                );
                const ceils = status.ceils.map((ceil) => ({
                    ...ceil,
                    opening: false,
                }));
                [...indexes, action.payload].forEach((index) => {
                    const ceil = { ...ceils[index] };
                    ceil.opening = true;
                    ceils[index] = ceil;
                });
                status.ceils = ceils;
                break;
            }

            default:
                break;
        }
    }

    function changeCeilState(index) {
        const ceil = status.ceils[index];
        if (ceil.durum === "open" || ["won", "died"].includes(status.status))
            return;
        dispatch({ type: "CHANGE_CEIL_STATE", payload: index });
    }

    function openCeil(index) {
        switch (status.status) {
            case "new":
                dispatch({ type: "START_GAME", payload: index });
                dispatch({ type: "OPEN_CEIL", payload: index });
                break;
            case "started":
                const ceil = status.ceils[index];
                if (["flag", "open"].includes(ceil.durum)) {
                    break;
                } else if (ceil.minesAround < 0) {
                    dispatch({ type: "GAME_OVER", payload: index });
                } else {
                    dispatch({ type: "OPEN_CEIL", payload: index });
                }
                break;
            default:
                break;
                //console.log(status.status);
        }
    }

    function openCeils(index) {
        const ceil = status.ceils[index];
        if (
            ceil.durum !== "open" ||
            ceil.minesAround <= 0 ||
            status.status !== "started"
        )
            return;
        const indexes = getNearIndexes(index, status.rows, status.columns);
        const nearCeils = indexes.map((i) => status.ceils[i]);
        if (
            nearCeils.filter((ceil) => ceil.durum === "flag").length !==
            ceil.minesAround
        )
            return;
        const mineIndex = indexes.find(
            (i) =>
                status.ceils[i].minesAround < 0 &&
                status.ceils[i].durum !== "flag",
        );
        if (mineIndex) {
            dispatch({ type: "GAME_OVER", payload: mineIndex });
        } else {
            indexes.forEach((i) => dispatch({ type: "OPEN_CEIL", payload: i }));
        }
    }

    $effect(() => {
        //console.log("status.status effect");
        if (status.status === "started" && checkRemains() === 0) {
            dispatch({ type: "WON" });
        }
    });

    function onReset(difficulty) {
        dispatch({ type: "CLEAR_MAP", payload: difficulty });
    }

    function checkRemains() {
        const safeCeils = status.ceils
            .filter((ceil) => ceil.durum !== "open")
            .filter((ceil) => ceil.minesAround >= 0);
        return safeCeils.length;
    }

    function openingCeil(index) {
        if (["died", "won"].includes(status.status)) return;
        dispatch({ type: "OPENING_CEIL", payload: index });
    }

    function openingCeils(index) {
        if (["died", "won"].includes(status.status)) return;
        dispatch({ type: "OPENING_CEILS", payload: index });
    }

    function genGameConfig(config) {
        const { rows, columns, mines } = config;
        const ceils = Array(rows * columns)
            .fill()
            .map((_) => ({
                durum: "cover",
                minesAround: 0,
                opening: false,
            }));
        return {
            rows,
            columns,
            ceils,
            mines,
        };
    }

    function insertMines(config, originCeils) {
        const { rows, columns, mines, exclude } = config;
        const ceils = originCeils.map((ceil) => ({ ...ceil }));
        if (rows * columns !== ceils.length)
            throw new Error("rows and columns not equal to ceils");
        const indexArray = [...Array(rows * columns).keys()];
        sampleSize(
            indexArray.filter((i) => i !== exclude),
            mines,
        ).forEach((chosen) => {
            ceils[chosen].minesAround = -10;
            getNearIndexes(chosen, rows, columns).forEach((nearIndex) => {
                ceils[nearIndex].minesAround += 1;
            });
        });
        return {
            rows,
            columns,
            ceils,
            mines,
        };
    }

    function autoCeils(index) {
        //console.log(JSON.stringify(status,null,2));
        //console.log("index: ", index);

        const { rows, columns } = status;
        const ceils = status.ceils.map((ceil) => ({
            ...ceil,
            walked: false,
        }));
        return walkCeils(index);
        function walkCeils(index) {
            const ceil = ceils[index];
            if (ceil.walked || ceil.minesAround < 0 || ceil.durum === "flag")
                return [];
            ceil.walked = true;
            if (ceil.minesAround > 0) return [index];
            return [
                index,
                ...getNearIndexes(index, rows, columns).reduce(
                    (lastIndexes, ceilIndex) => {
                        return [...lastIndexes, ...walkCeils(ceilIndex)];
                    },
                    [],
                ),
            ];
        }
    }

    function getNearIndexes(index, rows, columns) {
        if (index < 0 || index >= rows * columns) return [];
        const row = Math.floor(index / columns);
        const column = index % columns;
        return [
            index - columns - 1,
            index - columns,
            index - columns + 1,
            index - 1,
            index + 1,
            index + columns - 1,
            index + columns,
            index + columns + 1,
        ].filter((_, arrayIndex) => {
            if (row === 0 && arrayIndex < 3) return false;
            if (row === rows - 1 && arrayIndex > 4) return false;
            if (column === 0 && [0, 3, 5].includes(arrayIndex)) return false;
            if (column === columns - 1 && [2, 4, 7].includes(arrayIndex))
                return false;
            return true;
        });
    }

    /*
$inspect(status.mines).with((_t,v) => {
    console.log("Mines",v);
})
    */
</script>

<View
    --columns={status.columns}
    --rows={status.rows}
    ceils={status.ceils}
    mines={status.mines}
    status={status.status}
    {onClose}
    {changeCeilState}
    {openCeil}
    {openCeils}
    {onReset}
    bind:seconds
    {openingCeil}
    {openingCeils}
    sameTouchPos
    lastTouch
    difficulty={status.difficulty}
/>
