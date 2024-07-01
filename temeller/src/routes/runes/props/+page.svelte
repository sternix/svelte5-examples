<script>
    import {base} from '$app/paths'
    import Comp from './Comp.svelte'
</script>

<a href="{base}/">Anasayfa</a>

<Comp a="A" b="B" c="C" d="D" />
<hr>
<Comp a="A" b="B" d="D" e="E" />
<hr>
<Comp a="A" b="B" d="D" e="E" />
<hr>
<Comp a="A" b="B" d="D" e="E" f="F" g="G" />
<hr>
<Comp b="B" d="D" e="E" f="F" g="G" />