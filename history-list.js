import {renderCurrentAsset} from "../components/current-asset"
import {store, removeHistory} from "../store"
const $sectionHistory = document.querySelector(".history");
export function initHistoryList() {
    renderHistoryList();
    addHistoryListEventListener();
}

function addHistoryListEventListener() {
    $sectionHistory.addEventListener("click", function (event) {
        const element = event.target;
        if (!element.className.includes("delete-button")) return;

        const {dateid, itemid} = element.dataset;

        const isSuccess = removeHistory(dateid, itemid);
        if (!isSuccess) {
            alert("소비내역 삭제에 실패했습니다.");
            return;
        }
        reRender();
    })
}

function reRender() {
    renderCurrentAsset();
    renderHistoryList();
}
export function renderHistoryList() {
    $sectionHistory.innerHTML = store.dateList
    .map(({date, id: dateId}) => {
        const detail = store.detailList[dateId];
        if(!detail?.length) return "";
        return `<article class="history-per-day">
        <p class="history-date">2021년 12월 1일</p>
        ${detail.sort((a,b) => b.id - a.id).map(({description, category, amount, fundsAtTheTime, createAt, id}) => { //여기서 반환되는 값을 문자열이 아니라 배열
            //10:30분으로 표현하고 싶음 근데 현재 createAt은 ios타입 이걸 데이터 객체로 변화시켜야 함
            const time = new Date(createAt).toLocaleTimeString("ko-kr",{
                timeStyle: "short",
                hourCycle: "h24", //오후 2시 같은 경우 24시로 표현 잘 됨
        }); // 한국을 뜻하는 첫번째 인자
            return `<section class="history-item">
            <section class="history-item-column">
            <div class="create-at">${time}</div>
            <div class="history-detail">
            <div class="history-detail-row history-detail-title">
            <p>{${description}}</p>
            </div>
            <div class="history-detail-row history-detail-subtitle">
            <p>${category}</p>
            <p>
            ${amount.toLocaleString()}
            <span>원</span>
            </p>
            </div>
            </div>
            <div class="delete-section">
            <button class="delete-button" data-dateid=${dateId} data-itemid=${id}></button>
            </div>
            </section>
            <section class="history-item-caption">
            <p>
            <span>남은 자산</span>
            <span>${fundsAtTheTime.toLocalestring()}</span>
            <span>원</span>
            </p>
            </section>
            </section>`
        })
    .join("")}
        </article>`;
    })
    .join("");
}
//[1,2,3].map(_=>) => [1,2,3] => '123'
//즉 map은 배열을 반환하는데 우리는 문자열을 얻고 싶음 그러면 join하면 됨
//join('')