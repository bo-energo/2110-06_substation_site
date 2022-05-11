
let urlGetAssets = "http://10.100.1.2:8000/assets/"; //url получения списка трансформаторов
let assets = []; // Список оборудования
let urlGetListStatesAssets = "http://10.100.1.2:8000/levels/"; //url получения списка состоний оборудования (критический, номинальный  и т.д.)
let colorsLevel = [
    { bg: "bg-success", colorText: 'text-white' },
    { bg: "bg-warning", colorText: 'text-white' },
    { bg: "bg-danger", colorText: 'text-white' },
    { bg: "bg-white", colorText: 'text-dark' }
]; // Список цветов для категорий
let categories = []; //Список категорий
let targetAsset; //Выбраное оборудование
let lMenu; //Боковое меню

//Получение данных с сервера
//Аргументы: URL адресс на какой api делать запрос
async function GetData(urlLevels) {
    let response = await fetch(urlLevels).then(response => response.json());
    return response;
}

//Инициализация главного экрана
//Аргументы: URL(_urlGetListStatesAssets) - api получения списка состояний оборудования
//Аргументы: URL(_urlAssets) - api получения списка оборудования
function init(_urlGetListStatesAssets, _urlAssets) {

    GetData(_urlGetListStatesAssets).then(data => {
            for (let i = 0; i < data.levels.length; i++) {
                categories.push({ title: data.levels[i].title, bg: colorsLevel[i].bg, colorText: colorsLevel[i].colorText });
            }
    }).catch(err => console.log(err));
    
    GetData(_urlAssets).then(data => {
        assets = data.assets;
        initMainWindow(categories, assets);
        lMenu = new LeftMenu(assets);
        lMenu.componentsInit();
        SubscrubeToEventClick();
        CheckResize();
    }).catch(err => console.log(err));
}

//Подписка оборудования на событие клика(По клику на оборудование загружаются данные выбраного оборудования)
function SubscrubeToEventClick(){
    $('.disp').click((e) => {
        targetAsset = e.currentTarget.innerText.split('\n');
        loadAsset(targetAsset[0])
        if (lMenu.checkStateMenu()) {
            lMenu.hide();
        }
    });
}

//Отслеживание изменения размера окна
function CheckResize(){
    window.onresize = function () {
        loadAsset(targetAsset[0]);
    }
}

init(urlGetListStatesAssets, urlGetAssets);

