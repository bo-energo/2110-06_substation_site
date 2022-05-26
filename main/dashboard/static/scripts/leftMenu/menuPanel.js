class LeftMenu{
    componentsInit;
    checkStateMenu;    
    display;
    hide;


    constructor(transforms){
        let _transforms = transforms;
        let _cancelationToke;
        let _isDisplay = false;
        //Создание панели под меню
        function createLeftMenu ()  {
            $(`<div class="leftMenu bg-primary text-white"></div>`).appendTo('.leftPnael');
        }
        //Менеджер меню
        function manageMenu () {
            $('.btnMenu').off('click');
            if (_isDisplay == true) {
                _cancelationToke = setInterval(moveToLeftMenu, 10);
            }
            else {
                _cancelationToke = setInterval(moveToRigthMenu, 10);
            }

        }

        //Логика движения меню в право
        function moveToRigthMenu() {
            let left = parseInt($('.leftMenu').css('margin-left'));
            left += 5;
            $('.leftMenu').css('margin-left', left);
            if (left == -15) {
                clearInterval(_cancelationToke);
                $('.btnMenu').click(() => manageMenu());
                _isDisplay = true;
            }
            console.log(_isDisplay);
        }
        //Логика движения меню в лево
        function moveToLeftMenu() {
            let left = parseInt($('.leftMenu').css('margin-left'));
            left -= 5;
            $('.leftMenu').css('margin-left', left);
            if (left <= -360) {
                clearInterval(_cancelationToke);
                $('.btnMenu').click(() => manageMenu());
                _isDisplay = false;
            }
            console.log(_isDisplay);
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
        function fillListMenu()  {
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
            console.log(_transforms);

            for (let i = 0; i < _transforms.length; i++) {
                $(`
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse " aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body">
                        <a class="listAssetInLeftMenu">${_transforms[i].title}</a>
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
                //manageMenu()
                this.display();
            });

        }
        //Првоерка состояния меню
        this.checkStateMenu = () => {
            return _isDisplay;
        }

        //Показать меню
        this.display = () => {
            $('.btnMenu').off('click');
            _cancelationToke = setInterval(moveToRigthMenu, 10);
        }
        //Скрыть меню
        this.hide = () => {
            $('.btnMenu').off('click');
            _cancelationToke = setInterval(moveToLeftMenu, 10);
        }

        //Получить выбраный трансформатор в левом меню
        this.getSelectedAsset = (titleAsset) => {
            return _transforms.filter(item => item.title == titleAsset);
        }
    }
}