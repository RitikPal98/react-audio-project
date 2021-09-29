import db from "./db";
import categories from "../data/category-strcture";
import fuzzysort from "fuzzysort";

const pageSize = 10;

export const addAudio = async (data) => {
    return db.table("audioList").bulkPut(data);
};

export const getAudioByName = async (searchText, page) => {
    const HARD_LIMIT = 10000;
    // https://github.com/dfahlander/Dexie.js/issues/838
    try {
        const allItems = await db.table("audioList").limit(HARD_LIMIT).toArray();
        let filtered = searchText.startsWith('"')
            ? allItems.filter(item => item.name.toLowerCase().includes(searchText.replace(/"/g, "").toLowerCase()))
            : fuzzysort.go(searchText, allItems, { key: 'name', allowTypo: true }).map(result => ({
                ...result.obj,
                highlightName: fuzzysort.highlight(result, '<b style="background: yellow">', '</b>')
            }));
        if (allItems.length === HARD_LIMIT) {
            // We didn't get all data in first try.
            // Need to continue filtering one by one:
            const rest = await db
                .table("audioList")
                .offset(HARD_LIMIT)
                .toArray();
            
            const filteredRest = searchText.startsWith('"')
                ? rest.filter(item => item.name.toLowerCase().includes(searchText.replace(/"/g, "").toLowerCase()))
                : fuzzysort.go(searchText, rest, { key: 'name', allowTypo: true }).map(result => ({
                    ...result.obj,
                    highlightName: fuzzysort.highlight(result, '<b style="background: yellow">', '</b>')
                }));

            filtered = filtered.concat(filteredRest);
        }

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const data = filtered.slice(start, end);
        const allpage = Math.round(filtered.length / pageSize);

        return { data, allpage };
    } catch (error) {
        throw error;
    }
};

export const getAudioById = async (id) => {
    return db.table("audioList").get({ id: id.toString() });
};

export const getAudioByCategory = async (categoryId, page) => {
    const HARD_LIMIT = 10000;
    // https://github.com/dfahlander/Dexie.js/issues/838
    try {
        const allItems = await db.table("audioList").limit(HARD_LIMIT).toArray();
        let filtered = allItems.filter((item) => item.category_id === categoryId);
        if (allItems.length === HARD_LIMIT) {
            // We didn't get all data in first try.
            // Need to continue filtering one by one:
            const rest = await db
                .table("audioList")
                .offset(HARD_LIMIT)
                .filter((item) => item.category_id === categoryId)
                .toArray();
            filtered = filtered.concat(rest);
        }

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const data = filtered.slice(start, end);
        const allpage = Math.round(filtered.length / pageSize);

        return { data, allpage };
    } catch (error) {
        throw error;
    }
};

export const getAudio = async (page) => {
    try {
        const count = await db.table("audioList").count();
        const allpage = Math.round(count / pageSize);
        const data = await db
            .table("audioList")
            .orderBy("name")
            .offset((page - 1) * pageSize)
            .limit(pageSize)
            .toArray();
        return { data, allpage };
    } catch (error) {
        throw error;
    }
};

export const deleteAudio = async () => {
    return db.table("audioList").clear();
};

export const getAudioCount = async () => {
    return db.table("audioList").count();
};

const recursivSearchById = (categories, id) => {
    let category = undefined;

    for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === id) {
            return (category = categories[i]);
        } else if (categories[i].subCategories) {
            const _category = recursivSearchById(categories[i].subCategories, id);
            if (_category) return _category;
        }
    }
    if (category) {
        return category;
    }
};

const recursivSearchByName = (categories, searchText) => {
    let filtered = searchText.startsWith('"')
        ? categories.filter(item => item.name.toLowerCase().includes(searchText.replace(/"/g, "").toLowerCase()))
        : fuzzysort.go(searchText, categories, { key: 'name', allowTypo: true }).map(result => ({
            ...result.obj,
            highlightName: fuzzysort.highlight(result, '<b style="background: yellow">', '</b>')
        }));

    categories.forEach((category) => {
        if (category.subCategories) {
            filtered = filtered.concat(recursivSearchByName(category.subCategories, searchText));
        }
    });

    return filtered;
};

export const getCategoryById = (id) => {
    return recursivSearchById(categories, id);
};

export const getCategoryByName = (searchText, page) => {
    const filtered = recursivSearchByName(categories, searchText);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const data = filtered.slice(start, end);
    const allpage = Math.round(filtered.length / pageSize);

    return { data, allpage };
};
