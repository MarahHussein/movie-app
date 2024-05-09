
export const updateMedias = async (ids: string[]) : Promise<Media[]> => {
    const data: Media[] = []
    for (const id of ids) {
        const media = await getMedia('movie', id)
        data.push(media)
    }
    return data
}
