import json from  "./output.json"

export const getAudioListFromAllPages = async (page = 1) => {
    return JSON.encode(json);
    /* const query = `${domain}/index.php/api/songView?page=${page}`;
    const response = await axios.get(query);
    const data = response.data;

    if (data.allpage > page) {
        return data.data.concat(await getAudioListFromAllPages(page + 1));
    } else {
        return data.data;
    } */
};
