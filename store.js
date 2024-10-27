export const store = {
    currentFunds : 0,
    isFirstEdit : true,
    todayId : 1,
    dateList : [
        {
            id : 1,
            date : new Date().toLocaleDateString(),
        },
    ],
    detailList : {},

}

export function updateStorage() {
    sessionStorage.setItem("store", JSON.stringify(store))

}

export function initStore() {
    const storage = sessionStorage.getItem("store");
    if (!storage) updateStorage();

    const {dateList, detailList, todayId, currentFunds, isFirstEdit} =
    JSON.parse(storage);

    store.currentfunds = currentFunds;
    store.isFirstEdit = isFirstEdit;
    store.dateList = dateList;
    store.detailList = detailList;
    store.todayId = todayId
}
export function addNewHistory(newHistory) {
    try {
        if (store.detailList[todayId]) {
            store.detailList[todayId] = store.detailList[todayId].push(newHistory)
        } else {
            store.detailList[todayId] = [newHistory];
        }
        store.currentFunds -= newHistory.amount
        console.log(store)

        updateStorage()
        return true;
    }
    catch(error) {
        alert(error);
        return false;
    }
}
export function removeHistory(dateId, itemId) {
    try{
        //기존 배열 -> 삭제할 요소를 제거한 배열을 다시 재할당하면 됨
        store.detailList[dateId] = store.detailList[dateId].filter(({id, amount})=> {
            if (id === Number(itemId)) {
                store.currentFunds += amount;
            }
            return id !== Number(itemId);
        })
        updateStorage();
        return true;
    }
    catch (error) {
        alert(error);
        return false;
    }
}