# minesweeper

React ile yazılmış
[uygulamayı](https://github.com/ShizukuIchi/minesweeper)

Svelte 5 ile yeniden yazmaya çalıştım

TODO:
effect_update_depth_exceeded

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

    seconds çalışmıyor

    Menüye tıkladıktan sonra menü gitmiyor