function createLeftMenu(){
    $(`
        <div class="leftMenu bg-primary text-white"></div>
    `).appendTo('.innerContiner');
}

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

function moveToLeftMenu() {
    let left = parseInt($('.leftMenu').css('margin-left'));
    left -= 5;
    $('.leftMenu').css('margin-left', left);
    if (left == -300) {
        clearInterval(id);
        $('.btnMenu button').click(() => {
            displayMenu();
        })
    }
    console.log(left);
}

function addLeftMenu(){

    createLeftMenu();

    $('.btnMenu button').click(() => {
        displayMenu();
    })

}