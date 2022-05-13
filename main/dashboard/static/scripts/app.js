
let urlGetAssets = "http://10.100.1.2:8000/assets/"; //url получения списка трансформаторов
let assets = []; // Список оборудования
let urlGetListStatesAssets = "http://10.100.1.2:8000/levels/"; //url получения списка состоний оборудования (критический, номинальный  и т.д.)
let colorsLevel = [
    { bg: "bg-success", colorText: 'text-white', id: 'normal' },
    { bg: "bg-warning", colorText: 'text-white', id: 'warning' },
    { bg: "bg-danger", colorText: 'text-white', id: 'critical' },
    { bg: "bg-white", colorText: 'text-dark', id: 'empty' }
]; // Список цветов для категорий
let categories = []; //Список категорий
let targetAsset; //Выбраное оборудование
let targetTypeAsset; //Тип выбраного оборудования
let lMenu; //Боковое меню

//Получение данных с сервера
//Аргументы: URL адресс на какой api делать запрос
async function GetData(url) {
    let response = await fetch(url).then(response => response.json());
    return response;
}

//Инициализация главного экрана
//Аргументы: URL(_urlGetListStatesAssets) - api получения списка состояний оборудования
//Аргументы: URL(_urlAssets) - api получения списка оборудования
function init(_urlGetListStatesAssets, _urlAssets) {

    GetData(_urlGetListStatesAssets).then(data => {
            for (let i = 0; i < data.levels.length; i++) {
                categories.push({ title: data.levels[i].title, bg: colorsLevel[i].bg, colorText: colorsLevel[i].colorText, id: colorsLevel[i].id});
            }
    }).catch(err => console.log(err));
    
    GetData(_urlAssets).then(data => {
        assets = data.assets;
        //console.log(assets);
        initMainWindow(categories, assets);
        lMenu = new LeftMenu(assets);
        lMenu.componentsInit();
        SubscrubeToEventClick();
        //CheckResize();
    }).catch(err => console.log(err));
}

//Подписка оборудования на событие клика(По клику на оборудование загружаются данные выбраного оборудования)
function SubscrubeToEventClick(){
    $('.disp').click((e) => {
        let targetAsset = {
            title: e.currentTarget.innerText.split('\n')[0].split('-')[0],
            type: e.currentTarget.innerText.split('\n')[0].split('-')[1].trim()
        }

        loadAsset(targetAsset)
        if (lMenu.checkStateMenu()) {
            lMenu.hide();
        }
    });
}

//Отслеживание изменения размера окна
// function CheckResize(){
//     window.onresize = function () {
//         loadAsset(targetAsset, targetTypeAsset);
//     }
// }

init(urlGetListStatesAssets, urlGetAssets);

