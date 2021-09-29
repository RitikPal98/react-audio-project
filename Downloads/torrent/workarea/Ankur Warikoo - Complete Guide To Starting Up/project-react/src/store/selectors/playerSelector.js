import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const selectDownloadingItem = createDraftSafeSelector(
    (state, _) => state.download.downloadingQueue,
    (_, id) => id,
    (items, id) => items.find((item) => item.id === id)
);
