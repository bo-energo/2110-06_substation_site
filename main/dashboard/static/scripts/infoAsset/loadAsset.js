//Отображение выюраного оборудования
//Аргументы: targetAsset-выбранное оборудование
function loadAsset(targetAsset) {

    switch (targetAsset.infoType) {
        case "table":
            loadDataTableAsset(targetAsset)
            break;
        case "chart":
            loadChartAndAssetData(targetAsset)
            break;
    
        default:
            console.log("Lol :) нечего не загрузилось.");
            break;
    }

}

//Загрузить графики и информацию об оборудовании
function loadChartAndAssetData(titleAsset){
    modalWindow.displayPreLoader('Загрузка');
    GetData(`http://10.100.1.11:8000/asset/${targetAsset.title}`)
        .then(data => {
            modalWindow.hidePreLoader();
            $('.innerContiner').empty();

            console.log(data);

            let selectedAsset = new Asset(data);
            selectedAsset.createTabsComponent();
            selectedAsset.initialListTabs();
            selectedAsset.createComponentForChartAndDataTable();
            selectedAsset.createVertSplitterComponent();
            selectedAsset.createHorSplitterComponent();
            selectedAsset.createDataTableComponent();
            selectedAsset.initialDataTable();
            selectedAsset.paintChart();
            selectedAsset.createEventArchiveCompoinent();


            let vS = new VerticalSplitter('splitterVertical', 'leftBlock', 'rightBlock', 75, selectedAsset.paintChart, selectedAsset.dataForChart);
            vS.use();


            let hS = new HorizontalSplitter('horizontalSplitter', 'chartContent', 'archiveContent', 150, 'splitterVertical', selectedAsset.paintChart, selectedAsset.dataForChart);
            hS.use();

            window.onresize = function () {
                //selectedAsset.paintChart();
                vS.rePaint();
                hS.rePaint();
            }
        })
        .catch(err => console.log(err));
}

//Загрузить таблицу данных
function loadDataTableAsset(titleAsset){
    modalWindow.displayPreLoader('Сбор данных');
    GetData(`http://10.100.1.11:8000/asset/${targetAsset.title}`)
        .then(data => {
            modalWindow.hidePreLoader();
            modalWindow.displayData(data);
        })
        .catch(err => {
            modalWindow.hidePreLoader();
            console.log(err)
        });
}

//Запрос на сервер
async function GetData(url){
    let response = await fetch(url).then(response => response.json());
    return response;
}
