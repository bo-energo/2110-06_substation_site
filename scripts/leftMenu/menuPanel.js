class LeftMenu{
    componentsInit;
    checkStateMenu;


    constructor(transforms){
        let _transforms = transforms;
        let _cancelationToke = 0;
        let _isDisplay = false;
        //Создание панели под меню
        function createLeftMenu ()  {
            $(`<div class="leftMenu bg-primary text-white"></div>`).appendTo('.leftPnael');
        }
        //Менеджер меню
        function managerMenu () {
            $('.btnMenu').off('click');
            if (_isDisplay == true) {
                _cancelationToke = setInterval(moveToLeftMenu, 10);
            }
            else {
                _cancelationToke = setInterval(moveToRigthMenu, 10);
            }

        }
        //Показ меню
        function moveToRigthMenu() {
            let left = parseInt($('.leftMenu').css('margin-left'));
            left += 5;
            $('.leftMenu').css('margin-left', left);
            if (left == -15) {
                clearInterval(_cancelationToke);
                $('.btnMenu').click(() => managerMenu());
                _isDisplay = true;
            }
            console.log(left);
        }
        //Скрытие меню
        function moveToLeftMenu() {
            let left = parseInt($('.leftMenu').css('margin-left'));
            left -= 5;
            $('.leftMenu').css('margin-left', left);
            if (left == -360) {
                clearInterval(_cancelationToke);
                $('.btnMenu').click(() => managerMenu());
                _isDisplay = false;
            }
            console.log(left);
        }
        //Создание кнопки бокового меню
        function createBtnMenuLeft () {
            $(`
            <div class="btnMenu">
                <div class="b1"></div>
                <div class="b2"></div>
                <div class="b3"></div>
            </div>
            `).appendTo('.leftPnael');
        }
        //Создание компонента под список трансформаторов и наполнение списка.
        function fillListMenu(_disps)  {
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

            for (let i = 0; i < _transforms.length; i++) {
                $(`
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse " aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body">
                        <a>${_transforms[i].title}</a>
                    </div>
                </div>
                `)
                .appendTo('.listDisps');

            }
        }
        //Инициализация компонентов меню
        this.componentsInit = () => {

            createBtnMenuLeft();
            createLeftMenu();
            fillListMenu()

            $('.btnMenu').click(() => {
                managerMenu()
            });

        }
        //Првоерка состояния меню
        this.checkStateMenu = () => {
            managerMenu();
        }
    }
}