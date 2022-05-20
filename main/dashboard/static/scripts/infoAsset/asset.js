class Asset {

    data; //Данные с сервера
    listTabs; //Список вкладок
    dataForChart; //Данные для отрисовки графика
    dataForTable; //Данные для инициализации таблиц данных

    constructor(_data) {
        this.data = _data;
        this.listTabs = _data.tabsData.map(item => item.title);
        this.dataForChart = charDataGeneration(this.listTabs, _data);
        this.dataForTable = _data.tabsData.find(item => item.title == this.listTabs[0]).values;
    }

    //Создание компоненты вкладок
    createTabsComponent = () => {
        $(`<div class="tabsContiner"></div>`).appendTo(".innerContiner");
        $(`<nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist"></div>
            </nav>
            <div class="chartContent d-flex" id="chartContent"></div>`).appendTo('.tabsContiner');

        //this.initialListTabs();
    }

    //Инициализация списка вкладок
    initialListTabs = () => {
        for (let i = 0; i < this.listTabs.length; i++) {
            if (i == 0) {
                $(`<a class="nav-link active titleTabs" data-bs-toggle="tab" role="tab" 
                aria-selected="true">${this.listTabs[i]}</a>`).appendTo('#nav-tab');
            }
            else {
                $(`
                <a class="nav-link titleTabs"  data-bs-toggle="tab" role="tab"
                    aria-selected="false">${this.listTabs[i]}</a>`).appendTo('#nav-tab');
            }
        }

        $(`.titleTabs`).click((e) => {
            this.dataForTable = this.data.tabsData.find(item => item.title == e.target.innerText).values;
            // this.createDataForChart(dataForTable);
            // this.paintCharts(_totalDataForChart);
            this.createDataTableComponent();
            this.initialDataTable();
            this.paintChart();
        });
    }

    //Создание компоненты для графика и таблицы данных
    createComponentForChartAndDataTable = () => {
        $(`
            <div class="outterContainerChart" id='leftBlock'>
                <div class="bg-secondary text-white p-2 rounded">График</div>
                <div class="chart"></div>
            </div>
        `).appendTo(".chartContent");
    }

    //Отрисовка графика
    paintChart = () => {
        var data = [];//Данные которые будут отображаться
        let tab = $(`.active.titleTabs`)[0];//Поиск активной вкладки

        //Из набора данных для графика, выбираем данные по названию активной вкладки
        let dataForSelectedTabs = this.dataForChart.find(item => item.titleTab == tab.innerText);

        //Из данных выбраной вкладки, делаем массив, для перебора и добавления данных в массив для отображения
        let selectedTabsData = dataForSelectedTabs.values.map(item => item);

        for (let i = 0; i < selectedTabsData.length; i++) {
            let obj = selectedTabsData[i].x.map(item => (new Date(`${item}`)));
            data.push({
                x: obj,
                y: selectedTabsData[i].y,
                name: selectedTabsData[i].name,
                type: 'scatter',
                showlegend: true
            })

        }

        //Временное решение нахождения в чём измеряются выбранные показатели
        let titleValues = [];
        let set = new Set(this.dataForTable.map(item => item.unit));
        for(let elem of set){
            titleValues.push(elem);
        }
        console.log(this.dataForTable);


        var layout = {
            autosize: true,
            margin: {
                pad: 2,
                l: 80,
                t: 10,
                r: 10,
                b: 10,
            },
            title: '',
            xaxis: {
                rangeslider: {},
                autorange: false,
                type: 'time',
                range: [getLastWeek().lastWeek, getLastWeek().today],
                //tickformat: '%d.%m.%yy'
                tickformat: '%d.%m.%y\n%H:%M'
            },
            yaxis: {
                title: titleValues[0],
                autorange: true
            }
        };
        var config = {
            responsive: true,
            displayModeBar: false,
            scrollZoom: true,
            scale: 1
        }


        Plotly.newPlot($('.chart').get(0), data, layout, config);
    }

    //Создание вертикального сплиттера
    createVertSplitterComponent = () => {
        $(`<div id="splitterVertical"></div>`).appendTo('.chartContent');
    }
    //Создание горизонтального сплиттера
    createHorSplitterComponent = () => {
        $('<div id="horizontalSplitter"></div>').appendTo('.tabsContiner');
    }

    //Создание компоненты таблиц данных
    createDataTableComponent = () => {
        if ($('.dataTable').length == 0) {
            $(`<div class="dataTable" id='rightBlock'>
                <div class="bg-secondary text-white p-2 rounded" id="labelDataTable">Данные</div>
            </div>`).appendTo(".chartContent");
        }
        else
            $('.dataTable').empty();
    }

    //Инициализация табл. данными
    initialDataTable = () => {
        // $(`
        // <div class="bg-secondary text-white p-2 rounded">Данные</div>
        // <div class="container m-0 p-0 table">
        //     <div class="row row-cols-5">
        //         <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark"></div>
        //         <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">Значение</div>
        //         <div class="col-4 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">Проецнт изм.</div>
        //         <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">ДЗ</div>
        //         <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">ПДЗ</div>
        //     </div>
        // </div>
        // `).appendTo('.dataTable');

        // let danger = "bg-danger";
        // let warning = "bg-warning";
        // let normal = "bg-body";
        // let v = "";
        // for (let i = 0; i < this.dataForTable.length; i++) {
        //     if (this.dataForTable[i].ppm >= this.dataForTable[i].pdz) {
        //         v = danger;
        //     }
        //     else if (this.dataForTable[i].ppm >= this.dataForTable[i].dz && this.dataForTable[i].ppm < this.dataForTable[i].pdz) {
        //         v = warning;
        //     }
        //     else {
        //         v = normal;
        //     }
        //     $(`
        // <div class="row row-cols-5">
        //     <div class="col-2 px-3 text-center border border-top-0 border-end-0 border-start-0 border-dark">${this.dataForTable[i].legendName}</div>
        //     <div class="col-2 p-1 text-center ${v} border border-top-0 border-end-0 border-start-0 border-dark">${this.dataForTable[i].lastValue}</div>
        //     <div class="col-4 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark"> </div>
        //     <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${this.dataForTable[i].dz}</div>
        //     <div class="col-2 p-1 text-center border border-top-0 border-end-0 border-start-0 border-dark">${this.dataForTable[i].pdz}</div>
        // </div>
        // `).appendTo('.table');
        // }

        let titleValues = this.dataForTable.map(item => item.unit);
        //console.log(titleValues);

        //console.log(valuesTab);
        // let tab = $(`.active.titleTabs`)[0];
        // let dataForSelectedTabs = this.dataForChart.find(item => item.titleTab == tab.innerText).titleTab;
        // let values = this.data.tabsData.values; 
        // console.log(values);

        // $(`<div class="bg-secondary text-white p-2 rounded">Данные</div>`).appendTo('.dataTable');
        //console.log(this.dataForTable);
        //id="labelDataTable"

        if ($('#labelDataTable').length == 0){
            $(`<div class="bg-secondary text-white p-2 rounded" id="labelDataTable">Данные</div>`).appendTo('.dataTable');
        }

        $(`<div class="example">
            <table id="tableF" style="width: 100%;">
                <tr>
                    <th></th>
                    <th id="valueTable">${titleValues[0]}</th>
                    <th>% изм.</th>
                    <th id="dz">ДЗ</th>
                    <th id="pdz">ПДЗ</th>
                </tr>
            </table>
        </div>`).appendTo('.dataTable');

        let danger = "bg-danger";
        let warning = "bg-warning";
        let normal = "bg-body";
        let v = "";

        for (let i = 0; i < this.dataForTable.length; i++) {
            if (this.dataForTable[i].lastValue >= this.dataForTable[i].pdz)
                v = danger;
            else if (this.dataForTable[i].lastValue >= this.dataForTable[i].dz && this.dataForTable[i].lastValue < this.dataForTable[i].pdz)
                v = warning;
            else
                v = normal;

            $(`<tr>
                <td>${this.dataForTable[i].legendName}</td>
                <td class="${v}">${this.dataForTable[i].lastValue}</td>
                <td>-</td>
                <td>${this.dataForTable[i].dz}</td>
                <td>${this.dataForTable[i].pdz}</td>
            </tr>`).appendTo('#tableF');
        }
    }

    //Создание компоненты архива событий
    createEventArchiveCompoinent() {
        
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

        $('#dateFrom').val(getLastWeek().lastWeek);
        $('#dateTo').val(getLastWeek().today);
    }

}

//формирование данных для графика
//Возвращает массив данных сформированых для библиотеки plotly
function charDataGeneration(listTabs, data) {
    let total = [];

    for (let i = 0; i < listTabs.length; i++) {
        let tabElement = data.tabsData.find(item => item.title == listTabs[i]);

        let objTab = {
            titleTab: tabElement.title,
            values: []
        };

        for (let j = 0; j < tabElement.values.length; j++) {

            let obj = {                
                unit: tabElement.values[j].unit,
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

//Формирует дату на сегодня и дату -7 дней от сегодня 
function getLastWeek(){
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1;
    let dd = new Date().getDate() - 7 < 10 ? `0${new Date().getDate() - 7}` : new Date().getDate() - 7;
    let ddToday = new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate();

    let lastWeek = yy + '-' + mm + '-' + dd;
    let today = yy + '-' + mm + '-' + ddToday;

    return {lastWeek, today};
}
