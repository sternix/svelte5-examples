<script>
    import { onMount, onDestroy } from "svelte";
    let { name } = $props();

    $effect(() => {
        // burası init'te ve her değer değişiminden sonra çalışıyor
        console.log(`effect block: ${name}`);

        // the return statement is run immediately before every $effect re-run
        // yani bir değer değiştiğinde önce retutn sonra $effect bloğu çalışıyor
        // burası zorunlu değil
        console.log('$effect block $effect.tracking()', $effect.tracking());
        return () => {
            // burası değer değiştiğinde çalışıyor
            // klavyeden girilen her değerde çalışıyor

            console.log(`effect cleanup ${name}`);
            console.log('$effect return $effect.tracking', $effect.tracking());
        };
    });

    /*
    bir değer değiştiğinde
    önce $effect.pre
    sonra $effect - return
    en son $effect - block

    init'de  (page load)
    önce $effect.pre
    sonra $effect.root
    sonra $effect block
    en son onMount

    $effect === afterUpdate
    $effect.pre === beforeUpdate
    */

    $effect.pre(() => {
        console.log('$effect.pre',name)
        console.log('$effect.pre $effect.tracking', $effect.tracking());
    })

    $effect.root( () => {
        console.log('$effect.root:', name)
    })

    // effect çalışıyor fakat cleanup'ı manuel olarak biz çalıştırabiliriz,
    // aşağıdaki button'a tıklanınca return fonksyinu çalışıyor
    const cleanup = $effect.root(() => {
        $effect(() => {
            console.log('$effect.root effect name değişti',name) 
        })

        return() => {
            console.log('$effect.root cleaup (return)',name)
        }
    })

    // effect'in bloğu onMount'tan önce çalışıyor
    onMount(() => {
        console.log("onMount", name);
    });

    // onDestroy başla bir route'a gideceğimiz zaman çalışıyor,
    onDestroy(() => {
        console.log("onDestroy", name);
    });
</script>

<br />
<strong>Component</strong>
<input type="text" bind:value={name} />

<p>Effect tracking değeri: {$effect.tracking()}</p>

<button onclick={() => cleanup()}>Cleanup</button>