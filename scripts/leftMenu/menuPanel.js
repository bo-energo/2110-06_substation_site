//Создание панели левого меню
function createLeftMenu(){
    $(`
        <div class="leftMenu bg-primary text-white"></div>
    `).appendTo('.leftPnael');
}

//Логика обработки движения меню
let id=0;
function displayMenu(){
    $('.btnMenu button').off('click');
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
        $('.btnMenu button').click(() => {
            displayMenu();
        })
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
        $('.btnMenu button').click(() => {
            displayMenu();
        })
    }
    console.log(left);
}

//Создание кнопки леовго меню
function createBtnMenuLeft(){
    $(`
    <div class="btnMenu">
        <button type="button" class="btnMenu">
        </button>
    </div>
    `).appendTo('.leftPnael');
}

//Создание компонента левого меню 
function addLeftMenu(){

    createBtnMenuLeft();
    createLeftMenu();

    $('.btnMenu button').click(() => {
        displayMenu();
    })

}