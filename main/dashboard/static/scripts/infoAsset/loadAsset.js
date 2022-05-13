//Отображение выюраного оборудования
//Аргументы: targetAsset-выбранное оборудование
function loadAsset(targetAsset) {

    //$('.innerContiner').empty();
    let disp = new AssetInfo();
    //console.log(targetAsset);

    GetData(`http://10.0.1.9:8000/asset/${targetAsset.title}`)
    .then(data => {
        $('.innerContiner').empty();
        //console.log(data);

        let listTabs = data.tabsData.map(item => item.title);
        let dataForChart = charDataGeneration(listTabs, data);
        //let dataForTable = data.tabsData.find(item => item.title == listTabs[0]).values.slice(0, 7);
        let dataForTable = data.tabsData.find(item => item.title == listTabs[0]).values;
        //console.log(dataForChart);

        console.log(dataForTable);

        disp.createTab(listTabs, data, dataForChart);
        disp.createChart(dataForChart);

        


        if ($('.groupLegends-dataTable').length == 0)
            disp.createDataForChart(dataForTable);

        disp.createEventArchiveCompoinent();

        let vS = new VerticalSplitter('splitterVertical', 'leftBlock', 'rightBlock', 75, disp.paintCharts, dataForChart);
        vS.use();

        let hS = new HorizontalSplitter('horizontalSplitter', 'chartContent', 'archiveContent', 100, 'splitterVertical', disp.paintCharts, dataForChart);
        hS.use();
    })
    .catch(err => console.log(err));
}

//Класс в процессе разработки и модернизации.
class AssetInfo {
    //Создание вкладок, в аргументы принимае список вкладок
    createTab = (_titleTabsArray, data, _totalDataForChart) => {
        $(`<div class="tabsContiner"></div>`).appendTo(".innerContiner");

        $(`
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist"></div>
        </nav>
        <div class="chartContent d-flex" id="chartContent"></div>    
        `).appendTo('.tabsContiner');

        for (let i = 0; i < _titleTabsArray.length; i++) {
            if (i == 0) {
                $(`<a class="nav-link active titleTabs" data-bs-toggle="tab" role="tab" 
                aria-selected="true">${_titleTabsArray[i]}</a>`).appendTo('#nav-tab');
            }
            else {
                $(`
                <a class="nav-link titleTabs"  data-bs-toggle="tab" role="tab"
                    aria-selected="false">${_titleTabsArray[i]}</a>`).appendTo('#nav-tab');
            }
        }

        $(`.titleTabs`).click((e) => {
            //let dataForTable = data.tabsData.find(item => item.title == e.target.innerText).values.slice(0, 7);
            let dataForTable = data.tabsData.find(item => item.title == e.target.innerText).values;
            this.createDataForChart(dataForTable);
            this.paintCharts(_totalDataForChart);
        });
    }
    //Создаёт компоненту для отрисовки графика
    createChart = (dataForCahrt) => {
        $(`
        <div class="outterContainerChart" id='leftBlock'>
            <div class="bg-secondary text-white p-2 rounded">График</div>
            <div class="chart"></div>
        </div>
        `).appendTo(".chartContent");

        this.paintCharts(dataForCahrt);
        this.createVertSplitter();
        this.createHorSplitter();
    }
    //Создание компоненты под легенды и таблицу данных
    createDataForChart(_dataForTable) {
        if ($('.groupLegends-dataTable').length == 0){
            $(`<div class="groupLegends-dataTable" id='rightBlock'></div>`).appendTo(".chartContent");
        }
        else
            $('.groupLegends-dataTable').empty();

        

        this.createDataTable(_dataForTable);
    }
    //Создание компонента легенд, заполнение списком легенд и параметрами в легендах(чекбоксами)
    createLegends(_legends) {
        $(`<div class="legends">
            <div class="bg-secondary text-white p-2 rounded">Легенды</div>
        </div>
        `).appendTo(".groupLegends-dataTable");

        for (let i = 0; i < _legends.length; i++) {
            $(`
            <p>                
                <input type="checkbox" id="${_legends[i]}">
                <label for="${_legends[i]}">${_legends[i]}</label>
            </p>
            `).appendTo('.legends');
        }

    }
    //Создание компоненты с таблицой данных, заполнение таблици
    createDataTable(_dataForTable) {
        console.log(_dataForTable);
        $(`<div class="dataTable">
            <div class="bg-secondary text-white p-2 rounded">Данные</div>
        </div>`).appendTo(".groupLegends-dataTable");

        $(`
        <div class="container m-0 p-0">
            <div class="row row-cols-5">
                <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark"></div>
                <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">Значение</div>
                <div class="col-4 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">Проецнт изм.</div>
                <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">ДЗ</div>
                <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">ПДЗ</div>
            </div>
        </div>
        `).appendTo('.dataTable');

        let danger = "bg-danger";
        let warning = "bg-warning";
        let normal = "bg-body";
        let v = "";
        for (let i = 0; i < _dataForTable.length; i++) {
            if (_dataForTable[i].ppm >= _dataForTable[i].pdz) {
                v = danger;
            }
            else if (_dataForTable[i].ppm >= _dataForTable[i].dz && _dataForTable[i].ppm < _dataForTable[i].pdz) {
                v = warning;
            }
            else {
                v = normal;
            }
            $(`
        <div class="row row-cols-5">
            <div class="col-2 px-3 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].legendName}</div>
            <div class="col-2 p-1 text-center ${v} border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].lastValue}</div>
            <div class="col-4 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark"> </div>
            <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].dz}</div>
            <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].pdz}</div>
        </div>
        `).appendTo('.dataTable');
        }
    }
    //Создание компоненты архива событий
    createEventArchiveCompoinent() {
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1;
        let dd = new Date().getDate() - 7 < 10 ? `0${new Date().getDate() - 7}` : new Date().getDate() - 7;
        let ddToday = new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate();

        $(`
        <div class="archiveContent" id="archiveContent">
            <div class="bg-secondary text-white p-3">Дигностика</div>
            <div class="d-flex align-items-center my-2 justify-content-around">
                <div class="d-flex">
                    <div class="mx-2">
                        <span>От:</span>
                        <input id="dateFrom" type="date">
                    </div>
                    <div class="mx-2">
                        <span>До:</span>
                        <input id="dateTo" type="date">
                    </div>
                </div>
                <div class="d-flex flex-wrap">
                    <button type="button" class=" mx-2 btn btn-primary">Последний день</button>
                    <button type="button" class=" mx-2 btn btn-primary">Применить</button>
                </div>
                <div class="d-flex  archiveControls">
                    <div class="mx-2">
                        <input type="checkbox" id="diag" value="yes">
                        <label for="diag">Дигностические</label>
                    </div>
                    <div class="mx-2">
                        <input type="checkbox" id="tech" value="yes">
                        <label for="tech">Технические</label>
                    </div>
                    <div class="mx-2">
                        <input type="checkbox" id="req" value="yes">
                        <label for="req">Опрос</label>
                    </div>
                </div>
            </div>
            <div></div>
            
        </div>
        `).appendTo('.tabsContiner');

        let lastWeek = yy + '-' + mm + '-' + dd;
        let today = yy + '-' + mm + '-' + ddToday;

        $('#dateFrom').val(lastWeek);
        $('#dateTo').val(today);
    }
    //Отрисовка графика
    paintCharts = (_dataForChart) => {

        /*var traceA = {

            x: t1.sort(this.comparer),
            y: t2.sort(),
            type: 'scatter',
            name: 'Lol',
            showlegend: true
        };

        var traceB = {
            x: t3.sort(this.comparer),
            y: t4.sort(),
            type: 'scatter',
            name: 'Kek',
            showlegend: true
        };

        var data = [traceA, traceB];*/

        var data = [];
        let tab = $(`.active.titleTabs`)[0];
        console.log(_dataForChart);
        let dataForSelectedTabs = _dataForChart.find(item => item.titleTab == tab.innerText);

        let test = dataForSelectedTabs.values.map(item => item);
        for (let j = 0; j < test.length; j++) {
            data.push({
                x: test[j].x,
                y: test[j].y,
                name: test[j].name,
                type: 'scatter',
                showlegend: true
            })
        }


        
        // for (let i = 0; i < _dataForChart.length; i++) {
        //     let test = _dataForChart[i].values.map(item => item);
            
        //     for (let j = 0; j < test.length; j++) {
        //         data.push({
        //             x: test[j].x,
        //             y: test[j].y,
        //             name: test[j].name,
        //             type: 'scatter',
        //             showlegend: true
        //         })
                
        //     }
        // }

        // console.log(_dataForChart);
        // console.log(dataForSelectedTabs.titleTab);
        // console.log(data);
        
        var layout = {
            autosize: true,
            margin: {
                pad: 2,
                l: 80,
                t: 50,
                r: 10,
                b: 50,
            },
            title: '',
            xaxis: {
            },
            yaxis: {
                title: 'PPM',
                //rangemode: 'tozero' выставляет начало осей ровно в 0. если убрать то будут небольшие полоски от 0
            }
        };
        var config = {
            responsive: true,
            displayModeBar: false,
            scrollZoom: true
        }


        Plotly.newPlot($('.chart').get(0), data, layout, config);
    }
    //Сравниватель
    comparer(one, two) {
        if (one < two)
            return -1;
        else if (one > two)
            return 1;
        else
            return 0;
    }
    //Создание вертикального сплиттера
    createVertSplitter=()=> {
        $(`<div id="splitterVertical"></div>`).appendTo('.chartContent');
    }
    //Создание горизонтального сплиттера
    createHorSplitter=()=> {
        $('<div id="horizontalSplitter"></div>').appendTo('.tabsContiner');
    }
}

//формирование данных для графика
//Возвращает массив данных сформированых для библиотеки plotly
function charDataGeneration(listTabs, data){
    let total = [];

    for (let i = 0; i < listTabs.length; i++) {
        let tabElement = data.tabsData.find(item => item.title == listTabs[i]);

        let objTab = {
            titleTab: tabElement.title,
            values: []
        };

        for (let j = 0; j < tabElement.values.length; j++) {

            let obj = {
                name: tabElement.values[j].legendName,
                x: tabElement.values[j].values.map(item => item.dateTime),
                y: tabElement.values[j].values.map(item => item.value)
            };
            objTab.values.push(obj);
        }
        total.push(objTab);
    }

    return total;
}