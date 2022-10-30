import {defineStore} from 'pinia'
import {useToastsEmitter} from "@composables/toasts/toastsEmitter";
import {useFavoritesProxy} from "@proxies/favorites/favoritesProxy";

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        items: [],
        isLoading: false,
    }),
    persist: true,
    actions: {

        /**
         * Fetch favorites releases
         *
         * @return {Promise}
         */
        async fetchFavorites() {
            try {
                this.isLoading = true;
                this.items = await useFavoritesProxy().fetchFavorites();

            } catch (e) {
                console.error(e);
                useToastsEmitter().emitError(['Произошла ошибка при загрузке данны по избранным релизам', e])

            } finally {
                this.isLoading = false;
            }
        }

    }

})
