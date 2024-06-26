<script>
    import { user } from "../../store/user.svelte";
    import { goto } from "$app/navigation";

    async function logout() {
        user.login = false;
        const _res = await fetch("http://localhost:8080/auth/logout", {
            credentials: "include"
        });
        goto("/login");
    }

    async function test() {
        const res = await fetch("http://localhost:8080/auth/test",{
            credentials: "include"
        });
        console.log(await res.json());
    }

    let {children} = $props();
</script>

{@render children?.() }

<button onclick={logout}>Logout</button>
<button onclick={test}>Test</button>
