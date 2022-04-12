/*
-Использовать только с JQuery
-Создаёться экземпляр класса, конструктор принимает 4 аргумента(id сплиттера, id верхнего блока, id нижнего блока, отступ по оси Y)
-У экземпляра вызываеться метод use
-Пример использования 
    let hS = new HorizontalSplitter('horizontalVertical', 'top', 'bot', 10);
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


    constructor(_idHorSplitter, _idUpperBlock, _idBottomBlock, _offsetY, _idVerticalSplitter="", _callBack){
        this.idHorSplitter = _idHorSplitter;
        this.idUpperBlock = _idUpperBlock;
        this.idBottomBlock = _idBottomBlock;
        this.offsetY = _offsetY;
        this.horSplitter = $(`#${_idHorSplitter}`)[0];
        this.startHorPos = 0;
        this.endHorPos = 0;
        this.idVerticalSplitter=_idVerticalSplitter;
        this.callBack = _callBack;
        let t = parseInt($(`#${_idUpperBlock}`).css('width'));
        $(`#${_idHorSplitter}`).css('position', 'absolute');
        $(`#${_idHorSplitter}`).css('cursor', 'row-resize');
        $(`#${_idHorSplitter}`).css('background-color', 'black');
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

        this.callBack();
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

    use(){
        $(`#${this.idHorSplitter}`).mousedown(() => this.splitterMoveStart());
    }
}

