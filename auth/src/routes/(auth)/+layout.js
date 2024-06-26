import { user } from '../../store/user.svelte';
import { redirect } from '@sveltejs/kit';

export async function load() {
    if (!user.login) {
        throw redirect(302, '/login');
    }
}