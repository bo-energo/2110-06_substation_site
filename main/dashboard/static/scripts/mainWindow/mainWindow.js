
function createCategory(categories, assetsFromBD) {
    let assets = [];
    assets = assetsFromBD;
    for (let i = 0; i < categories.length; i++) {
        $(`<div class="accordion tr" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button ${categories[i].bg} ${categories[i].colorText}" type="button" data-bs-toggle="collapse"
                        data-bs-target="#${categories[i].title}" aria-expanded="false" aria-controls="${categories[i].title}"> 
                        ${categories[i].title} (${assets.filter(d => d.status == categories[i].title).length})
                    </button>
                </h2>
                <div id="${categories[i].title}" class="accordion-collapse collapse show" aria-labelledby="headingOne" >
                    
                </div>
            </div>
        </div>`).appendTo('.innerContiner');

    }
}

function fillDispList(_categories, assets) {
    for (let i = 0; i < assets.length; i++) {
        var category = _categories.find(q => q.title == assets[i].status);
        $(`
        <div class="card ${category.bg} ${category.colorText} mt-2 mb-2 disp">
                <div class="card-header d-flex justify-content-between">
                    ${assets[i].title}
                    <button type="button" class="btn btn-primary">Данные</button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${assets[i].status}</h5>
                    <p class="card-text">{assets[i].discriptionProblem}</p>                    
                </div>
        </div>`
        ).appendTo(`#${assets[i].status}`);
    }
}

function initMainWindow(_categories, assets){
    $('.innerContiner').empty();

    createCategory(_categories, assets);
    fillDispList(_categories, assets)
}