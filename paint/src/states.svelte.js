export function useState(initial = null) {
    let state = $state(initial);

    return {
        get value() {
            return state
        },
        set value(val) {
            state = val
        }
    }
}

export function LineOpacity(o) {
    let val = $state(o);
    let der = $derived(val / 100)

    return {
        get value() {
            return val
        },
        set value(v) {
            val = v
        },
        get opacity() {
            return der
        }
    }
}