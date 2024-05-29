<script>
    // https://svelte.dev/docs/element-directives

    import { marked } from "marked";

    const iller = [
        { id: 6, name: "Ankara" },
        { id: 34, name: "İstanbul" },
        { id: 28, name: "Giresun" },
    ];

    let detay = $state(false);
    let html = $state("");
    let markdown = $state("");
    let md2html = $derived(marked.parse(markdown));

    let uye = $state({
        adi: "",
        soyadi: "",
        email: "",
        il: {},
        adres: "",
        cinsiyet: "",
        acceptTerms: false,
    });

    function handleSubmit(e) {
        e.preventDefault();

        console.log(JSON.stringify(uye));
    }
</script>

<form onsubmit={handleSubmit}>
    <label for="adi">Adı</label>
    <input type="text" name="adi" id="adi" bind:value={uye.adi} />
    <br />

    <label for="soyadi">Soyadı</label>
    <input type="text" name="soyadi" id="soyadi" bind:value={uye.soyadi} />
    <br />

    <label for="email">Email</label>
    <input type="email" name="email" id="email" />
    <br />

    <label for="il">İl</label>
    <select name="il" id="il" bind:value={uye.il}>
        {#each iller as { id, name } (id)}
            <option value={id}>{name}</option>
        {/each}
    </select>
    <br />

    <label for="adres">Adres</label>
    <br />
    <textarea
        name="adres"
        id="adres"
        cols="30"
        rows="10"
        placeholder="Adresiniz..."
        bind:value={uye.adres}
    ></textarea>
    <br />

    <label for="cinsiyet">Cinsiyetiniz</label>
    <label for="erkek">
        Erkek
        <input
            type="radio"
            name="cinsiyet"
            value="Erkek"
            id="erkek"
            bind:group={uye.cinsiyet}
        />
    </label>
    <label for="bayan">
        Bayan
        <input
            type="radio"
            name="cinsiyet"
            value="Bayan"
            id="bayan"
            bind:group={uye.cinsiyet}
        />
    </label>
    <br />
    <label for="acceptTerms">
        Şartları kabul ediyorum
        <input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            bind:checked={uye.acceptTerms}
        />
    </label>
    <br />
    <button type="submit" disabled={!uye.acceptTerms}>Kaydet</button>
</form>

<details bind:open={detay}>
    <summary>Üye durumu</summary>
    <pre>{JSON.stringify(uye, null, 2)}</pre>
</details>

HTML içerik
<div contenteditable="true" bind:innerHTML={html}></div>

{html}
<br />
Markdown içerik
<div contenteditable="true" bind:innerText={markdown}></div>
<p>{@html md2html}</p>

<style>
    div {
        border: 1px solid;
        width: 98vw;
        height: 100px;
        overflow: auto;
    }
</style>
