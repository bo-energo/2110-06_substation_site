//данные для демо
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

let data = [gases, workParams];

let dataForTable =[
    { title: "CO", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ:100, PDZ:150},
    { title: "CO2", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 3000, PDZ: 7000 },
    { title: "C2H2", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 8, PDZ: 20 },
    { title: "C2H4", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 20, PDZ: 50 },
    { title: "C2H6", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 35, PDZ: 80 },
    { title: "H", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 80, PDZ: 100 },
    { title: "CH4", ppm: getRandomArbitrary(0, 300), percent: getRandomArbitrary(0, 300), DZ: 40, PDZ: 70 }
]




function loadDisp(titleDisp) {

    console.log(dataForTable);
    $('.innerContiner').empty();
    createBtnCallLeftMenu();
    createTabsComponents();
    createDemoChart();
}

//Создание компонентов вкладок
function createTabsComponents(){
    $(`
    <div class="tabsContainer"></div>
    `).appendTo('.innerContiner');

    $(`
    <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab"
                aria-controls="nav-home" aria-selected="true">Газы</a>
            <a class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab"
                aria-controls="nav-profile" aria-selected="false">Влагосодержание</a>
        </div>
    </nav>
    `).appendTo('.tabsContainer');

    createChartComponent();
    createEventArchiveCompoinent();
}

//Создание компонента кнопки вызывающей боковое меню
function createBtnCallLeftMenu() {
    $(`
    <div class="btnMenu flex-fill bd-highlight">
        <button type="button" class="btnMenu"></button>
      </div>
    `).appendTo('.innerContiner');
}

//Создание компонентов графика, легенд, таблицы данных под легендами
function createChartComponent(){
    $(`
    <div class="d-flex chart-blockLegends">
        <div class="chartW">
            <div class="bg-secondary text-white p-2 rounded-start">График</div>
            <div class="chart"></div>
        </div>
        <div class="legend-tableData">
            <div class="legends">
                <div class="bg-secondary text-white p-2">Легенды</div>
            </div>
            <div class="dataTable"></div>
        </div>
    </div>
    `).appendTo('.tabsContainer');
    
    createLegends(data);
    createDataTable(dataForTable);
}

//Создание компонентов архива событий
function createEventArchiveCompoinent(){
    $(`
    <div id="eventArchive">
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
    `).appendTo('.tabsContainer');
}

//Демонстрационный график
function createDemoChart(){
    let t1 =[];
    let t2 =[];
    let t3 =[];
    let t4 =[];

    for (let i = 0; i < 10; i++) {
        t1.push(getRandomArbitrary(0, 101));
        t2.push(getRandomArbitrary(0, 101));
        t3.push(getRandomArbitrary(0, 101));
        t4.push(getRandomArbitrary(0, 101));
    }


    // var traceA = {
    //     x: [1, 2, 3, 4, 16, 17, 26],
    //     y: [1, 40, 9, 60, 4, 20, 10],
    //     type: 'scatter'
    // };

    var traceA = {
        x: t1.sort(comparer),
        y: t2.sort(),
        type: 'scatter',
        showlegend:false
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
        height:500,
        margin:{
            pad:2,
            l:80,
            t:50,
            r:10,
            b:20,
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
        displayModeBar: false
    }

    
    Plotly.newPlot($('.chart').get(0), data, layout, config);
}

function comparer(one, two){
    if(one < two)
        return -1;
    else if (one > two)
        return 1;
    else
        return 0;
}

//Создание легенд
function createLegends(data){
    $(`
    <div class="accordion" id="accordionPanelsStayOpenExample"></div>
    `).appendTo('.legends');

    for (let i = 0; i < data.length; i++) {
        $(`
        <div class="accordion-item" id="accItem${i}">
            <h2 class="accordion-header" id="panelsStayOpen-heading${i}">
                <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${i}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    ${data[i].title}
                </button>
            </h2>
        </div>
        `).appendTo('.accordion');

        for (let j = 0; j < data[i].values.length; j++) {
            $(`
            <div id="panelsStayOpen-collapse${i}" class="accordion-collapse collapse " aria-labelledby="panelsStayOpen-heading${i}">
                <div class="accordion-body">
                    <input type="checkbox" id="happy" value="yes">
                    <label for="happy">${data[i].values[j].title}</label>
                </div>
            </div>
            `).appendTo(`#accItem${i}`);
            
        }
        
    }
}

//Создание таблицы данных под легендами
function createDataTable(_dataForTable){
    $(`
    <div class="container m-0 p-0">
        <div class="bg-secondary text-white p-2">Данные</div>
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
    let v= "";
    for (let i = 0; i < _dataForTable.length; i++) {
        if (_dataForTable[i].ppm >= _dataForTable[i].PDZ){
            v = danger;
        }
        else if (_dataForTable[i].ppm >= _dataForTable[i].DZ && _dataForTable[i].ppm < _dataForTable[i].PDZ){
            v = warning;
        }
        else{
            v=normal;
        }
        $(`
        <div class="row row-cols-5">
            <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].title}</div>
            <div class="col-2 p-1 text-center ${v} border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].ppm}</div>
            <div class="col-4 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].percent}</div>
            <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].DZ}</div>
            <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${_dataForTable[i].PDZ}</div>
        </div>
        `).appendTo('.container');
        
    }
}

