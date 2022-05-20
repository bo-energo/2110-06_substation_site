
let urlGetAssets = "http://10.0.1.9:8000/assets/"; //url получения списка трансформаторов
let assets = []; // Список оборудования
let urlGetListStatesAssets = "http://10.0.1.9:8000/levels/"; //url получения списка состоний оборудования (критический, номинальный  и т.д.)
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
async function initMainDisplay(_urlGetListStatesAssets, _urlAssets) {
    let response = await fetch(_urlGetListStatesAssets).then(response => response.json());
    
    for (let i = 0; i < response.levels.length; i++) {
        categories.push({ title: response.levels[i].title, bg: colorsLevel[i].bg, colorText: colorsLevel[i].colorText, id: colorsLevel[i].id });
    }

    response = await fetch(_urlAssets).then(response => response.json());

    assets = response.assets;
    initMainWindow(categories, assets);
    lMenu = new LeftMenu(assets);
    lMenu.componentsInit();
    loadTargetAsset();

    $('.btnReturn').click(() => refresh());
}

//Подписка оборудования на событие клика(По клику на оборудование загружаются данные выбраного оборудования)
function loadTargetAsset(){
    $('.disp').click((e) => {
        targetAsset = {
            title: e.currentTarget.innerText.split('\n')[0].split('-')[0],
            type: e.currentTarget.innerText.split('\n')[0].split('-')[1].trim()
        }

        loadAsset(targetAsset)
        if (lMenu.checkStateMenu()) {
            lMenu.hide();
        }
    });
}

//Перезапуск приложения. Служит как кнопка выхода на главный экран.
//Попутно перезапрашивает данные т.к. могли измениться.
function refresh(){
    $('.leftPnael').empty();
    $('.innerContiner').empty();
    initMainWindow(categories, assets);
    lMenu = new LeftMenu(assets);
    lMenu.componentsInit();
    loadTargetAsset();
    $('.btnReturn').click(() => refresh());
}

$(`#dropdownMenuButton1`).click(() => console.log("lol"));

initMainDisplay(urlGetListStatesAssets, urlGetAssets);



