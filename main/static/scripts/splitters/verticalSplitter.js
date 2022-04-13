/*
-Использовать только с JQuery
-Создаёться экземпляр класса, 
    конструктор принимает 4 аргумента
        (id сплиттера, id левого блока, 
        id правого блока, отступ по оси X,
        фун-ия обратного вызова необязательный параметр)
-У экземпляра вызываеться метод use
-Пример использования 
    let vS = new VerticalSplitter('splitterVertical', 'leftBlock', 'rightBlock', 58, createDemoChart);
    vS.use();
*/
class VerticalSplitter {
    verSplitter;
    startPos;
    endPos;
    idVerSplitter;
    idLeftBlock;
    idRightBlock;
    offsetX;
    callBack;

    constructor(_idVerSplitter, _idLleftBlock, _idRightBlock, _offsetX, _callBack = null) {
        this.idVerSplitter = _idVerSplitter;
        this.idLeftBlock = _idLleftBlock;
        this.idRightBlock = _idRightBlock;
        this.verSplitter = $(`#${_idVerSplitter}`)[0];
        this.startPos = 0;
        this.endPos = 0;
        this.offsetX = _offsetX;
        this.callBack = _callBack;
        $(`#${_idVerSplitter}`).css('width', '3');
        $(`#${_idVerSplitter}`).css('height', `${parseInt($(`#${_idLleftBlock}`).css('height'))}`);
        $(`#${_idVerSplitter}`).css('margin-left', `${parseInt($(`#${_idLleftBlock}`).css('width'))+5}px`);
        $(`#${_idVerSplitter}`).css('position', 'absolute');
        $(`#${_idVerSplitter}`).css('background-color', 'black');
        $(`#${_idVerSplitter}`).css('cursor', 'col-resize');
    }

    splitterMoveStart = (e) => {
        this.startPos = e.clientX;
        $(`#${this.idVerSplitter}`).off('mousedown');
        $(document).mousemove((e) => this.splitterMove(e))
        $(document).mouseup((e) => this.splitterMoveStop(e))
    }

    splitterMoveStop = (e) => {
        $(document).off('mousemove');
        $(document).off('mouseup');
        $(`#${this.idVerSplitter}`).mousedown(this.splitterMoveStart);

        let dif = this.startPos - this.endPos + parseInt($(`#${this.idVerSplitter}`).css("width"));
        let lb = parseInt($(`#${this.idLeftBlock}`).css("width"));
        let rb = parseInt($(`#${this.idRightBlock}`).css("width"));


        if (dif < 0) {
            $(`#${this.idLeftBlock}`).css("width", lb + Math.abs(dif));
            $(`#${this.idRightBlock}`).css("width", rb - Math.abs(dif));
            this.verSplitter.style.marginLeft = `${parseInt($(`#${this.idLeftBlock}`).css("width")) + 2}px`;
        }
        else if (dif > 0) {
            $(`#${this.idLeftBlock}`).css("width", lb - Math.abs(dif));
            $(`#${this.idRightBlock}`).css("width", rb + Math.abs(dif));
            this.verSplitter.style.marginLeft = `${parseInt($(`#${this.idLeftBlock}`).css("width")) + 2}px`;
        }
        else
            return;
        
        if(this.callBack != null)
            this.callBack();
    }

    splitterMove = (e) => {
        this.verSplitter.style.marginLeft = `${e.clientX - this.offsetX}px`;
        this.endPos = e.clientX;
    }

    use(){
        $(`#${this.idVerSplitter}`).mousedown((e) => this.splitterMoveStart(e));
    }
}
