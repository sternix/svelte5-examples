<script>
    import { user } from "../../store/user.svelte";
    import { goto } from "$app/navigation";

    let username;
    let password;

    let hata = $state();

    async function handleSubmit(e) {
        hata = "";
        e.preventDefault();
        console.log(`username: ${username.value}, password: ${password.value}`);
        const res = await fetch("http://localhost:8080/auth/login", {
            // aysnı sitede {credentials: 'same-origin'} olabilir
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),
        });

        let ret = await res.json();
        console.log(ret);
        if (ret.status === "ok") {
            user.login = true;
            console.log(ret.message);
            goto("/admin");
        } else {
            hata = ret.message;
        }
    }
</script>

<div>
    <form onsubmit={handleSubmit}>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" bind:this={username} />
        <br />
        <label for="password">Password</label>
        <input
            type="password"
            name="password"
            id="password"
            bind:this={password}
        />
        <br />
        <button type="submit">Login</button>
    </form>

    {#if hata}
        <p style="color: red;">{hata}</p>
    {/if}
</div>
