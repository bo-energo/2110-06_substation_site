//#region
//Создание панели левого меню
function createLeftMenu(){
    $(`
        <div class="leftMenu bg-primary text-white"></div>
    `).appendTo('.leftPnael');
}

//Логика обработки движения меню
let id=0;
function managerMenu(){
    $('.btnMenu button').off('click');
    console.log($('.btnMenu button').off('click'));
    if (parseInt($('.leftMenu').css('margin-left')) == -15){
        id = setInterval(moveToLeftMenu, 10);
    }
    else{
        id = setInterval(moveToRigthMenu, 10);
    }

}

//Движение меню в право
function moveToRigthMenu(){
    let left = parseInt($('.leftMenu').css('margin-left'));
    left+=5;
    $('.leftMenu').css('margin-left', left);
    if (left == -15) {
        clearInterval(id);
        $('.btnMenu button').click(() => managerMenu());
    }
    console.log(left);
}
//Движение меню в лево
function moveToLeftMenu() {
    let left = parseInt($('.leftMenu').css('margin-left'));
    left -= 5;
    $('.leftMenu').css('margin-left', left);
    if (left == -360) {
        clearInterval(id);
        $('.btnMenu button').click(() => managerMenu());
    }
    console.log(left);
}

//Создание кнопки леовго меню
function createBtnMenuLeft(){
    $(`
    <div class="btnMenu">
        <div class="b1"></div>
        <div class="b2"></div>
        <div class="b3"></div>
    </div>
    `).appendTo('.leftPnael');
}

//Создаёт компоненты для заполнения списка меню
function fillListMenu(_disps){
    $(`
    <div class="accordion listDisps" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" 
                aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                Title database
              </button>
        </h2>
        </div>
    </div>
    `).appendTo('.leftMenu');

    for (let i = 0; i < _disps.length; i++) {
        $(`
        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse " aria-labelledby="panelsStayOpen-headingOne">
            <div class="accordion-body">
                <a>${_disps[i].title}</a>
            </div>
        </div>
        `)
            .appendTo('.listDisps');

    }
}

//Создание компонента левого меню 
function addLeftMenu(disps){

    createBtnMenuLeft();
    createLeftMenu();
    fillListMenu(disps)

    $('.btnMenu').click(() => managerMenu());

}
//#endregion
