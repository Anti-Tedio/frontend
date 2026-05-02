import useCategoriesStore from "@/stores/categories.store";
import usePersonsStore from "@/stores/persons.store";
import useUserStore from "@/stores/user.store";
import { token } from "@/lib/refreshToken";
import type { Router } from "vue-router";

export const auth = (router: Router) => {
    router.beforeEach((to, from) => {

        const userStore = useUserStore()
        const personStore = usePersonsStore();
        const categoriestore = useCategoriesStore();

        if (to.name === 'persons') {
            if (personStore.selected.length < 3) return true;
            else return { name: 'categories' };

        }

        if (to.name === 'categories') {
            if (personStore.selected.length >= 3) return true
            else return { name: 'persons' };
        }

        if (to.name === 'result') {
            if (!categoriestore.selected?.id) return { name: 'categories' }

            if (token.value) return true;
            else { userStore.popUpLogin = true; return { name: 'persons' } };
        }

        if (to.name === 'profile') {
            if (token.value) return true;
            else { userStore.popUpLogin = true; return { name: 'home' } }
        }

        if (to.name === 'reset-password') {
            if (!to.query.userId || !to.query.token) return { name: 'home' };
            return true;
        }

        if (to.name === 'delete-account') {
            if (token.value) return true;
            else { userStore.popUpLogin = true; return { name: 'home' }; }
        }

        return true;
    })
}