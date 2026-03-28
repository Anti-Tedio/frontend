import router from "@/router/routes"
import useCategorysStore from "@/stores/categorys.store";
import usePersonsStore from "@/stores/persons.store";
import useUserStore from "@/stores/user.store";
import { token } from "@/utils/refreshToken";
export const auth = () => {
    router.beforeEach((to, from) => {

        const userStore = useUserStore()
        const personStore = usePersonsStore();
        const categoryStore = useCategorysStore();

        if (to.name === 'persons') {
            if (personStore.selected.length < 3) return true;
            else return { name: 'categorys' };

        }

        if (to.name === 'categorys') {
            if (personStore.selected.length >= 3) return true
            else return { name: 'persons' };
        }

        if (to.name === 'result') {
            if (!categoryStore.selected?.id) return { name: 'categorys' }

            if (token.value) return true;
            else userStore.popUpLogin = true;
        }

        if (to.name === 'profile') {
            if (token.value) return true;
            else { userStore.popUpLogin = true; return { name:'home' } }
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