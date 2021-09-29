import Dexie from "dexie";

const db = new Dexie("offilenData");
db.version(1).stores({
    audioList: `
    id,
    name,
    name_telugu,
    lyrics,
    lyrics_telugu,
    link,singerName,
    listen,
    download,
    album_id,
    author_id,
    category_id,
    link_app,
    order_number,
    image,
    description`,
});

export default db;
