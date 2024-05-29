<script>
    let filelist = $state();

    function submitForm(e) {
        e.preventDefault();
        const formData = new FormData();
        //console.log(filelist);
        formData.append("resim", filelist[0]);

        // rust-upload çalışır durumda olması gerekiyor
        fetch("http://localhost:3001/upload", {
            method: "POST",
            body: formData,
            // diğer kontrollerde yapılabilir
        })
            .then(() => console.log("Dosya başarı ile upload edildi"))
            .catch((e) => console.log(`Dosya yükleme hatası: ${e}`));
    }
</script>

<form onsubmit={(e) => submitForm(e)}>
    <label>
        Dosya Seçiniz:
        <input
            accept="image/png, image/jpg"
            type="file"
            bind:files={filelist}
        />
    </label>
    <button type="submit">Yükle</button>
</form>
