let ass = [
    { title: 'Номинальный', idAss: 'normal' },
    { title: 'Допустимый', idAss: 'warning' },
    { title: 'Критический', idAss: 'critical' },
    { title: 'Нет данных', idAss: 'empty' },
];

//Создание категорий аккардеона.
function createCategory(categories, assetsFromBD) {
    let assets = [];
    assets = assetsFromBD;
    for (let i = 0; i < categories.length; i++) {
        $(`<div class="accordion tr" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button ${categories[i].bg} ${categories[i].colorText}" type="button" data-bs-toggle="collapse"
                        data-bs-target="#${categories[i].id}" aria-expanded="false" aria-controls="${categories[i].id}"> 
                        ${categories[i].title} (${assets.filter(d => d.status == categories[i].title).length})
                    </button>
                </h2>
                <div id="${categories[i].id}" class="accordion-collapse collapse show" aria-labelledby="headingOne" >
                    
                </div>
            </div>
        </div>`).appendTo('.innerContiner');

    }
}


//Заполнение аккардеона элементами (оборудованием) по категориям.
function fillDispList(_categories, assets) {
    for (let i = 0; i < assets.length; i++) {
        var category = _categories.find(q => q.title == assets[i].status);
        let idForInsert = ass.find(p => p.title == assets[i].status);
        $(`
        <div class="card ${category.bg} ${category.colorText} mt-2 mb-2 disp">
                <div class="card-header d-flex justify-content-between fw-bold">
                    <span>${assets[i].title} - ${assets[i].type}</span>
                    <button type="button" class="btn btn-primary displayDataSelectedAsset" 
                        data-asset-name="${assets[i].title}" data-asset-type="${assets[i].type}">
                        Данные
                    </button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${assets[i].status}</h5>
                    <hr>
                    <p class="card-text lh-1" id="${assets[i].title}"></p>                    
                </div>
        </div>`
        ).appendTo(`#${idForInsert.idAss}`);
    }
}
//Заполнение диагностики у каждого оборудования.
function fillDiagnosticCode(assets) {
    for (let i = 0; i < assets.length; i++) {
        let code = assets[i].diagnotics;
        if (code == "")
            return;
        let diagnostics = code.eventsArchive;

        for (let j = 0; j < diagnostics.length; j++) {
            $(`
            <p>Код диагностики: ${diagnostics[j].diagnosticCode}</p>
            `).appendTo(`#${assets[i].title}`);
        }
    }
}
//Создание кнопки возврата на главный экран
function createBtnReturnToMain(){
    $(`<button class="btnReturn">
        <img src="../static/img/back.png">
    </button>`).appendTo('.leftPnael');
}

function initMainWindow(_categories, assets) {
    $('.innerContiner').empty();
    createBtnReturnToMain();

    createCategory(_categories, assets);
    fillDispList(_categories, assets);
    fillDiagnosticCode(assets);
}