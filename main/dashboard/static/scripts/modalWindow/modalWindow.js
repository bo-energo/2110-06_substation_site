//Модальное окно
//Стили настраиваютсяв методах, взависимости от выбраного окна.

class ModalWindow{
    constructor(){
        

        //Отображает таблицу с данными на начальном экране.
        //Принимает данные для отображения.
        this.displayData = (data) => {
            $(`
            <div class= "modalWindow">
                <div class="btnCloseModalWin">X</div>
            </div >
            `).appendTo('body');

            //============================================================
            $(`.modalWindow`).css({
                "height": "50vh",
                "width": "40vw"
            });

            $('.btnCloseModalWin').css({
                "bottom": "97%",
                "width": "30px",
                "height": "30px",
                "border": "2px solid black",
                "border-radius": "50%",
                "left": "98%",
                "position": "absolute",
                "background-color": "white",
                "display": "flex",
                "justify-content": "center",
                "align-items": "center",
                "font-weight": "bold",
                "font-size": "1.2em"
            });
            //============================================================

            this.blackOutScreen();

            $(`.btnCloseModalWin`).click(() => {
                this.lightingScreen();
                $('.modalWindow').remove();
            });



            if ($(`.containerForModalWindow`).length == 0) {
                $(`<div class="containerForModalWindow"></div>`).appendTo('.modalWindow');
            }
            else
                $('.containerForModalWindow').empty();

            //============================================================
            $('.containerForModalWindow').css({
                "width": "100%",
                "height": "100%",
                "overflow": "scroll"
            });
            //============================================================

            $(`
            <table id="dataTableInModalWindow">
                <tr>
                    <th>Название</th>
                    <th>Значение</th>
                </tr>
            </table>
            `).appendTo('.containerForModalWindow');

            //============================================================
            $('#dataTableInModalWindow').css({
                "width": "100%"
            });
            //============================================================

            let danger = "bg-danger";
            let warning = "bg-warning";
            let normal = "#fff";
            let v = "";
            for (let i = 0; i < data.tabsData.length; i++) {
                data.tabsData[i].values.forEach(element => {
                    if (element.lastValue >= element.pdz)
                        v = danger;
                    else if (element.lastValue >= element.dz && element.lastValue < element.pdz)
                        v = warning;
                    else
                        v = normal;

                    $(`
                    <tr>
                        <td>${element.legendName}</td>
                        <td class="${v}">${element.lastValue}</td>
                    </tr>
                    `).appendTo('#dataTableInModalWindow');
                });

            }

        }

        //Отображает прелоадер с указаным текстом
        this.displayPreLoader = (text) =>{
            $(`
            <div class= "modalWindow">
                <div class="textPreLoader">${text}...</div>
                <div class="spinner-border text-primary" role="status"></div>
            </div >
            `).appendTo('body');

            this.blackOutScreen();

            $(`.modalWindow`).css({
                "diplay" : "flex",
                "justify-content" : "center",
                "height": "5vh",
                "width": "20vw"
            });
        }

        //Скрывает прелоадер
        this.hidePreLoader = () => {
            this.lightingScreen();
            $('.modalWindow').remove();
        }


        //Затемнение экрана перед показом данных в модальном окне
        this.blackOutScreen = () =>{
            $(`.upperMenu`).css('opacity', '0.2');
            $(`.innerContiner`).css('opacity', '0.2');
            $(`.leftPnael`).css('opacity', '0.2');
            $(`body`).css("background-color", "rgb(44 44 44)");
            $(`.modalWindow`).css({
                'opacity': '1',
                'z-index': '2'
            });
            $('.innerContiner').css('pointer-events', 'none');
            $('.upperMenu').css('pointer-events', 'none');
            $('.leftPnael').css('pointer-events', 'none');
        }
        //Осветление экрана после показа данных модального окна
        this.lightingScreen = () => {
            $(`.upperMenu`).css('opacity', '1');
            $(`.innerContiner`).css('opacity', '1');
            $(`.leftPnael`).css('opacity', '1');
            $(`body`).css("background-color", "#fff");
            $(`.modalWindow`).css({
                'opacity': '0',
                'z-index': '-1'
            });
            $('.innerContiner').css('pointer-events', 'all');
            $('.upperMenu').css('pointer-events', 'all');
            $('.leftPnael').css('pointer-events', 'all');
        }
    }
}