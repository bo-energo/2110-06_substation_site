//Отображение выюраного оборудования
//Аргументы: targetAsset-выбранное оборудование
function loadAsset(targetAsset) {

    GetData(`http://10.0.1.9:8000/asset/${targetAsset.title}`)
    .then(data => {
        $('.innerContiner').empty();

        let selectedAsset = new Asset(data);
        selectedAsset.createTabsComponent();
        selectedAsset.initialListTabs();
        selectedAsset.createComponentForChartAndDataTable();
        selectedAsset.createVertSplitterComponent();
        selectedAsset.createHorSplitterComponent();
        selectedAsset.createDataTableComponent();
        selectedAsset.paintChart();
        selectedAsset.createEventArchiveCompoinent();


        let vS = new VerticalSplitter('splitterVertical', 'leftBlock', 'rightBlock', 75, selectedAsset.paintChart, selectedAsset.dataForChart);
        vS.use();

        
        let hS = new HorizontalSplitter('horizontalSplitter', 'chartContent', 'archiveContent', 150, 'splitterVertical', selectedAsset.paintChart, selectedAsset.dataForChart);
        hS.use();

        window.onresize = function () {
            vS.rePaint();
            hS.rePaint();
        }
    })
    .catch(err => console.log(err));
}

//Запрос на сервер
async function GetData(url){
    let response = await fetch(url).then(response => response.json());
    return response;
}
