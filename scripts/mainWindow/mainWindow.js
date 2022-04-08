
function createCategory(categories) {
    $('.innerContiner').empty();
    $(`
    <div class="btnMenu">
        <button type="button" class="btnMenu">
        </button>
    </div>
    `).appendTo('.innerContiner');

    for (let i = 0; i < categories.length; i++) {
        $(`<div class="accordion tr" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button ${categories[i].bg} ${categories[i].colorText}" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#${categories[i].title}" aria-expanded="true" aria-controls="${categories[i].title}"> 
                        ${categories[i].title} (${disps.filter(d => d.state == categories[i].title).length})
                    </button>
                </h2>
                <div id="${categories[i].title}" class="accordion-collapse collapse show" aria-labelledby="headingOne" >
                    
                </div>
            </div>
        </div>`).appendTo('.innerContiner');

    }
}

function fillDispList(disps) {
    for (let i = 0; i < disps.length; i++) {
        var categpry = categories.find(q => q.title == disps[i].state);
        $(`
        <div class="card ${categpry.bg} ${categpry.colorText} mt-2 mb-2 disp">
                <div class="card-header d-flex justify-content-between">
                    ${disps[i].title}
                    <button type="button" class="btn btn-primary">Данные</button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${disps[i].state}</h5>
                    <p class="card-text">${disps[i].discriptionProblem}</p>                    
                </div>
        </div>`
        ).appendTo(`#${disps[i].state}`);
    }
}

