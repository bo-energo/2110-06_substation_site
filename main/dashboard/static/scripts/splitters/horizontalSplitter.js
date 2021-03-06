/*
-Использовать только с JQuery
-Создаёться экземпляр класса, 
    конструктор принимает 4 аргумента
        (id сплиттера, id верхнего блока, 
        id нижнего блока, отступ по оси Y, 
        если есть вертикальный сплитер передаём id необязательный параметр,
        фун-ия обратного вызова необязательный параметр)
-У экземпляра вызываеться метод use
-Пример использования 
    let hS = new HorizontalSplitter('testSplitter', 'testChartContent', 'testArchiveContent', 100, 'splitterVertical', createDemoChart);
    hS.use();
*/

class HorizontalSplitter{
    horSplitter;
    startHorPos;
    endHorPos;
    idHorSplitter;
    idUpperBlock;
    idBottomBlock;
    offsetY;
    idVerticalSplitter;
    callBack;
    dataForCallBack;


    constructor(_idHorSplitter, _idUpperBlock, _idBottomBlock, _offsetY, _idVerticalSplitter = "", _callBack = null, _dataForCallBack = null){
        this.idHorSplitter = _idHorSplitter;
        this.idUpperBlock = _idUpperBlock;
        this.idBottomBlock = _idBottomBlock;
        this.offsetY = _offsetY;
        this.horSplitter = $(`#${_idHorSplitter}`)[0];
        this.startHorPos = 0;
        this.endHorPos = 0;
        this.idVerticalSplitter=_idVerticalSplitter;
        this.callBack = _callBack;
        this.dataForCallBack = _dataForCallBack;
        let t = parseInt($(`#${_idUpperBlock}`).css('width'));
        $(`#${_idHorSplitter}`).css('position', 'absolute');
        $(`#${_idHorSplitter}`).css('cursor', 'row-resize');
        $(`#${_idHorSplitter}`).css('background-color', 'gray');
        $(`#${_idHorSplitter}`).css('width', `${t}`);
        $(`#${_idHorSplitter}`).css('height', '3');

    }

    splitterMoveStop = (e) => {
        $(document).off('mousemove');
        $(document).off('mouseup');
        $(`#${this.idHorSplitter}`).mousedown(this.splitterMoveStart);

        let dif = this.endHorPos - parseInt($(`#${this.idUpperBlock}`).css("height")) - this.offsetY;
        let tb = parseInt($(`#${this.idUpperBlock}`).css("height"));
        let bb = parseInt($(`#${this.idBottomBlock}`).css("height"));


        if (dif < 0) {
            $(`#${this.idUpperBlock}`).css("height", tb - Math.abs(dif));
            $(`#${this.idBottomBlock}`).css("height", bb + Math.abs(dif));

            $(`#${this.idVerticalSplitter}`).css("height", tb - Math.abs(dif));
            this.horSplitter.style.marginTop = `${0}px`;
        }
        else if (dif > 0) {
            $(`#${this.idUpperBlock}`).css("height", tb + Math.abs(dif));
            $(`#${this.idBottomBlock}`).css("height", bb - Math.abs(dif));

            $(`#${this.idVerticalSplitter}`).css("height", tb + Math.abs(dif));
            this.horSplitter.style.marginTop = `${0}px`;
        }
        else
            return;

        if(this.callBack != null)
            this.callBack(this.dataForCallBack);
    }

    splitterMove = (e) => {
        this.horSplitter.style.marginTop = `${e.clientY - parseInt($(`#${this.idUpperBlock}`).css("height")) - this.offsetY}px`;
        this.endHorPos = e.clientY;
    }

    splitterMoveStart = () => {
        this.startHorPos = 0;
        $(`#${this.idHorSplitter}`).off('mousedown');
        $(document).mousemove((e) => this.splitterMove(e));
        $(document).mouseup((e) => this.splitterMoveStop(e));
    }

    rePaint = () => {
        $(`#${this.idHorSplitter}`).css('width', `${parseInt($(`#${this.idUpperBlock}`).css('width'))}`);
    }

    use(){
        $(`#${this.idHorSplitter}`).mousedown(() => this.splitterMoveStart());
    }

    createSplitter(classToAdd){
        $(`<div id="${this.idHorSplitter}"></div>`).appendTo(`.${classToAdd}`);
    }
}

