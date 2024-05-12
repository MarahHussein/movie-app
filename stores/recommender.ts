import {da} from "cronstrue/dist/i18n/locales/da";

export const useRecommenderStore = defineStore("recommender", ()=> {
    const appWrite = useAppWrite();
    const authStore = useAuthStore();

    const bookMarks  = computed(()=>authStore.authUser?.bookmarks)
    const genres = computed(()=>authStore.authUser?.genres)

    const recommenderByBookmarks = ref<{recommended: Media[], not_find: []}>()
    const recommenderByGenres = ref<Media[]>()


    async function sendGenres(){
        if(genres.value) {
            try {
                recommenderByGenres.value = await $fetch('http://localhost:8000/recommend_by_genre', {
                    method: 'POST',
                    body: {
                        "genres": genres.value
                    }
                })
            } catch (error) {
                console.error('Failed to send genres:', error);
            }
        }


    }
    async function sendBookmarks(){
        if(bookMarks.value){
            try {
                recommenderByBookmarks.value = await $fetch('http://localhost:8000/recommend_by_bookmark', {
                    method: 'POST',
                    body: {
                        "movie_ids": bookMarks.value
                    }
                });
            } catch (error) {
                console.error('Failed to send bookmarks:', error);
                // Handle the error appropriately
            }
        }

    }

    function getRecommendation() {
        sendGenres()
        sendBookmarks()
        console.log('trying to send recommendation');
    }

    return {
        getRecommendation, recommenderByBookmarks, recommenderByGenres, sendGenres, sendBookmarks
    }
})