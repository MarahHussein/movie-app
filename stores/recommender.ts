export const useRecommenderStore = defineStore("recommender", ()=> {
    const appWrite = useAppWrite();
    const recommender = ref()
    const authID = useAuthStore().authId;
    const simpleIds = ref([{type: 'movie', id: '693134'},{type: '', id: ''}])
    const simple = ref([])

    const updateRecommender = async () => {
        try {
            recommender.value= await appWrite.databases.getDocument('appData','recommenders',authID)
        }catch (error) {
            console.log(error)
        }

    }
    return {
        simple, updateRecommender, simpleIds
    }
})