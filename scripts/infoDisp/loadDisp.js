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




function loadDisp(titleDisp) {

    console.log(dataForTable);
    $('.innerContiner').empty();

    createTab();
    createChart();

    $('<div id="testSplitter"></div>').appendTo('.tabsContiner');

    createVertSplitter();
    createDataForChart();
    createDemoChart($(`.chart`).css("height"));
    createEventArchiveCompoinent();
    

    let vS = new VerticalSplitter('splitterVertical', 'leftBlock', 'rightBlock', 58, createDemoChart);
    vS.use();

    let hS = new HorizontalSplitter('testSplitter', 'testChartContent', 'testArchiveContent', 100, 'splitterVertical', createDemoChart);
    hS.use();
    
}


//Создание компонентов архива событий
function createEventArchiveCompoinent() {
    $(`
    <div class="archiveContent" id="testArchiveContent">
        <div class="bg-secondary text-white p-3">Дигностика</div>
            <div class="d-flex justify-content-around mt-1">
                <div class="align-self-center">От: тут календарь</div>
                <div class="align-self-center">До: тут календарь</div>
                <div class="align-self-center">
                    <button type="button" class="btn btn-primary">Последний день</button>
                </div>
                <div class="align-self-center">
                    <button type="button" class="btn btn-primary">Применить</button>
                </div>
                <div class="align-self-center">
                    <input type="checkbox" id="diag" value="yes">
                    <label for="diag">Дигностические</label>

                    <input type="checkbox" id="tech" value="yes">
                    <label for="tech">Технические</label>

                    <input type="checkbox" id="req" value="yes">
                    <label for="req">Опрос</label>
                </div>
            </div>
        </div>

        <div></div>
    </div>
    `).appendTo('.tabsContiner');
}

//Демонстрационный график
function createDemoChart() {
    // let t1 = [];
    // let t2 = [];
    // let t3 = [];
    // let t4 = [];

    // for (let i = 0; i < 10; i++) {
    //     t1.push(getRandomArbitrary(0, 101));
    //     t2.push(getRandomArbitrary(0, 101));
    //     t3.push(getRandomArbitrary(0, 101));
    //     t4.push(getRandomArbitrary(0, 101));
    // }


    // var traceA = {
    //     x: [1, 2, 3, 4, 16, 17, 26],
    //     y: [1, 40, 9, 60, 4, 20, 10],
    //     type: 'scatter'
    // };

    var traceA = {
        x: t1.sort(comparer),
        y: t2.sort(),
        type: 'scatter',
        showlegend: false
    };

    var traceB = {
        x: t3.sort(comparer),
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

function comparer(one, two) {
    if (one < two)
        return -1;
    else if (one > two)
        return 1;
    else
        return 0;
}

//Создание контейнеров для вкладок, графиков и архива
function createTab() {
    $(`
    <div class="tabsContiner"></div>
    `).appendTo(".innerContiner");

    $(`
    <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab"
                aria-controls="nav-home" aria-selected="true">Газы</a>
            <a class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab"
                aria-controls="nav-profile" aria-selected="false">Влагосодержание</a>
        </div>
    </nav>
    <div class="chartContent d-flex" id="testChartContent"></div>
    
    `).appendTo('.tabsContiner');
}
//Создание компонента графика
function createChart() {
    $(`
    <div class="outterContainerChart" id='leftBlock'>
        <div class="bg-secondary text-white p-2 rounded">График</div>
        <div class="chart"></div>
    </div>
    `).appendTo(".chartContent");
}
//Создание компонента данных для графика(легенды, таблица данных)
function createDataForChart() {
    $(`
    <div class="groupLegends-dataTable" id='rightBlock'></div>
    `).appendTo(".chartContent");

    createLegends(_legends);
    createDataTable(dataForTable);
}
//Создание компонента легенд
function createLegends(_legends) {
    $(`
    <div class="legends">
        <div class="bg-secondary text-white p-2 rounded">Дегенды</div>
    </div>
    `).appendTo(".groupLegends-dataTable");

    for (let i = 0; i < _legends.length; i++) {
        $(`
        <div class="accordion-item" id="accItem${i}">
            <h2 class="accordion-header" id="panelsStayOpen-heading${i}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${i}" 
                aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                    ${_legends[i].title}
                </button>
            </h2>
        </div>
        `).appendTo('.legends');

        for (let j = 0; j < _legends[i].values.length; j++) {
            $(`
            <div id="panelsStayOpen-collapse${i}" class="accordion-collapse collapse " aria-labelledby="panelsStayOpen-heading${i}">
                <div class="accordion-body">
                    <input type="checkbox" id="happy" value="yes">
                    <label for="happy">${_legends[i].values[j].title}</label>
                </div>
            </div>
            `).appendTo(`#accItem${i}`);

        }

    }
}
//Создание компонента таблицы данных
function createDataTable(_dataForTable) {
    $(`
    <div class="dataTable p-2"></div>
    `).appendTo(".groupLegends-dataTable");


    $(`
    <div class="container m-0 p-0">
        
        <div class="row bg-secondary text-white p-2 rounded">
            <div>Данные</div>
        </div>
        <div class="row row-cols-5">
            <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark"></div>
            <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">ppm</div>
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
        if (_dataForTable[i].ppm >= _dataForTable[i].PDZ) {
            v = danger;
        }
        else if (_dataForTable[i].ppm >= _dataForTable[i].DZ && _dataForTable[i].ppm < _dataForTable[i].PDZ) {
            v = warning;
        }
        else {
            v = normal;
        }
        $(`
        <div class="row row-cols-5">
            <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].title}</div>
            <div class="col-2 p-1 text-center ${v} border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].ppm}</div>
            <div class="col-4 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].percent}</div>
            <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].DZ}</div>
            <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].PDZ}</div>
        </div>
        `).appendTo('.dataTable');
    }
}
//Создание вертикального сплитера
function createVertSplitter(){
    $(`
    <div id="splitterVertical"></div>
    `).appendTo('.chartContent');
}

