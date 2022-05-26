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
    GetData(`http://10.0.1.9:8000/asset/${targetAsset.title}`)
        .then(data => {
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
    GetData(`http://10.0.1.9:8000/asset/${targetAsset.title}`)
        .then(data => {

            $(`.upperMenu`).css('opacity', '0.2');
            $(`.innerContiner`).css('opacity', '0.2');
            $(`.leftPnael`).css('opacity', '0.2');
            $(`body`).css("background-color", "rgb(44 44 44)");
            $(`.modalWindow`).css('opacity', '1');
            console.log(data.tabsData);

            $(`.btnCloseModalWin`).click(() => {
                console.log("X");
                $(`.upperMenu`).css('opacity', '1');
                $(`.innerContiner`).css('opacity', '1');
                $(`.leftPnael`).css('opacity', '1');
                $(`body`).css("background-color", "#fff");
                $(`.modalWindow`).css('opacity', '0');
            });

            

            if ($(`.containerForModalWindow`).length == 0){
                $(`<div class="containerForModalWindow"></div>`).appendTo('.modalWindow');
            }
            else
                $('.containerForModalWindow').empty();

            $(`
            <table id="dataTableInModalWindow">
                <tr>
                    <th>Название</th>
                    <th>Значение</th>
                </tr>
            </table>
            `).appendTo('.containerForModalWindow');

            let danger = "bg-danger";
            let warning = "bg-warning";
            let normal = "#fff";
            let v = "";
            for (let i = 0; i < data.tabsData.length; i++) {
                data.tabsData[i].values.forEach(element => {
                    if (element.lastValue >= element.pdz)
                        v = danger;
                    else if (element.lastValue >= element.dz && element.lastValue < element.pdz)
                        v = warning;
                    else
                        v = normal;

                    $(`
                    <tr>
                        <td>${element.legendName}</td>
                        <td class="${v}">${element.lastValue}</td>
                    </tr>
                    `).appendTo('#dataTableInModalWindow');
                });
                
            }

        })
        .catch(err => console.log(err));
}

//Запрос на сервер
async function GetData(url){
    let response = await fetch(url).then(response => response.json());
    return response;
}
