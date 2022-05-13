//данные для демо
function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let gases = {
    title: "Концентрации",
    values: [
        { isSelect: true, title: "CO" },
        { isSelect: true, title: "CO2" },
        { isSelect: true, title: "C2H2" },
        { isSelect: true, title: "C2H4" },
        { isSelect: true, title: "C2H6" },
        { isSelect: true, title: "H" },
        { isSelect: true, title: "CH4" }
    ]
}

let workParams = {
    title: "Рабочие параметры",
    values: [
        { title: "Т ВСМ" },
        { title: "Температура наружняя" },
        { title: "Т НСМ" },
    ]
}

let _legends = [gases, workParams];

let dataForTable = [
    { title: "CO", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 100, PDZ: 150 },
    { title: "CO2", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 3000, PDZ: 7000 },
    { title: "C2H2", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 8, PDZ: 20 },
    { title: "C2H4", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 20, PDZ: 50 },
    { title: "C2H6", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 35, PDZ: 80 },
    { title: "H", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 80, PDZ: 100 },
    { title: "CH4", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 40, PDZ: 70 }
]

let t1 = [];
let t2 = [];
let t3 = [];
let t4 = [];

for (let i = 0; i < 10; i++) {
    t1.push(getRandomArbitrary(0, 101));
    t2.push(getRandomArbitrary(0, 101));
    t3.push(getRandomArbitrary(0, 101));
    t4.push(getRandomArbitrary(0, 101));
}

/*
//Вкладки оборудования трансформатор
let transforsTabs = ["Перенапряжения", "Влагосодержание", "Температура", "Износ изоляции", "Состояние охлаждения", "Мощность", "Состояние РПН",
"Состояние вводов", "Внутрение потери", "Активность ЧР", "Нагрузочная способность", "Оценка состояния", "Анализ газов"];
//Вкладки оборудования КРУЭ
let crueTabs = ["Перенапряжения", "Состояние вводов", "Сотсояние элегаза", "Активность ЧР", "Рабочие параметры"];
//Вкладки оборудования выключатели
let switchesTabs = ["Перенарпряжения", "Состояние вводов", "Состояние элегаза", "Активность ЧР", "Ресурс дугогасительного устройства",
"Рабочие параметры", "Ресурс гидропривода", "Параметры коммутации", "Вибродиагностика"];
//Вкладки оборудования кабельная линия
let cableLine = ["Термоконтроль", "Виброконтроль", "Токи в экранах", "Активность ЧР"];
//Вкладки оборудования трансформаторы тока
let currentTransforms = ["Изоляция", "Влажность масла", "Состояние элегаза"];
//Вкладки оборудования трансформаторы напряжения
let voltageTransforms = ["Влажность масла", "Межвитковые замыкания", "Ток утечки", "Состояние элегаза"];
//Вкладки оборудования ограничители перенапряжения
let limiterOvervoltage = ["Токи"];
//Вкладки оборудования конденсаторы связи
let communicationCondensers = ["Состояние"];
//Вкладки оборудования разъеденители
let disconnectors = ["Состояние"];
//Вкладки оборудования батареи статических конденсаторов
let batteryStaticCondensers = ["Состояние"];
*/


function loadAsset(targetAsset) {

    $('.innerContiner').empty();
    let disp = new AssetInfo();
    //console.log(targetAsset);

    GetData(`http://10.100.1.2:8000/asset/${targetAsset.title}`)
    .then(data => {
        console.log(data);

        let listTabs = data.tabsData.map(item => item.title);
        disp.createTab(listTabs, data.tabsData);
        disp.createChart(_legends, dataForTable);

        if ($('.groupLegends-dataTable').length == 0)
        {
            let dataCurrent = data.tabsData.find(item => item.title == listTabs[0]);
            let leg = dataCurrent.values.map(item => item.legendName);
            let _dataForTable = dataCurrent.values.slice(0, 7);
            console.log(_dataForTable);
            disp.createDataForChart(leg, _dataForTable);
        }

        disp.createEventArchiveCompoinent();

        let vS = new VerticalSplitter('splitterVertical', 'leftBlock', 'rightBlock', 75, disp.paintCharts);
        vS.use();

        let hS = new HorizontalSplitter('horizontalSplitter', 'chartContent', 'archiveContent', 100, 'splitterVertical', disp.paintCharts);
        hS.use();
    })
    .catch(err => console.log(err));
}

//Класс в процессе разработки и модернизации.
class AssetInfo {
    //Создание вкладок, в аргументы принимае список вкладок
    createTab = (titleTabsArray, tabsData) => {
        $(`<div class="tabsContiner"></div>`).appendTo(".innerContiner");

        $(`
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist"></div>
        </nav>
        <div class="chartContent d-flex" id="chartContent"></div>    
        `).appendTo('.tabsContiner');

        for (let i = 0; i < titleTabsArray.length; i++) {
            if (i == 0) {
                $(`<a class="nav-link active titleTabs" data-bs-toggle="tab" role="tab" 
                aria-selected="true">${titleTabsArray[i]}</a>`).appendTo('#nav-tab');
            }
            else {
                $(`
                <a class="nav-link titleTabs"  data-bs-toggle="tab" role="tab"
                    aria-selected="false">${titleTabsArray[i]}</a>`).appendTo('#nav-tab');
            }
        }

        $(`.titleTabs`).click((e) => {
            let dataCurrent = tabsData.find(item => item.title == e.target.innerText);
            let leg = dataCurrent.values.map(item => item.legendName);
            let _dataForTable = dataCurrent.values.slice(0, 7);
            this.createDataForChart(leg, _dataForTable);
        });
    }
    //Создаёт компоненту для отрисовки графика
    createChart = (_legends, dataForTable) => {
        $(`
        <div class="outterContainerChart" id='leftBlock'>
            <div class="bg-secondary text-white p-2 rounded">График</div>
            <div class="chart"></div>
        </div>
        `).appendTo(".chartContent");

        //this.createDataForChart(_legends, dataForTable);
        this.paintCharts();
        this.createVertSplitter();
        this.createHorSplitter();
    }
    //Создание компоненты под легенды и таблицу данных
    createDataForChart(_legends, dataForTable) {
        if ($('.groupLegends-dataTable').length == 0){
            $(`<div class="groupLegends-dataTable" id='rightBlock'></div>`).appendTo(".chartContent");
        }
        else
            $('.groupLegends-dataTable').empty();

        

        this.createLegends(_legends);
        this.createDataTable(dataForTable);
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
            <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].legendName}</div>
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
    paintCharts = () => {

        var traceA = {
            x: t1.sort(this.comparer),
            y: t2.sort(),
            type: 'scatter',
            showlegend: false
        };

        var traceB = {
            x: t3.sort(this.comparer),
            y: t4.sort(),
            type: 'scatter',
            showlegend: false
        };

        var data = [traceA, traceB];

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
