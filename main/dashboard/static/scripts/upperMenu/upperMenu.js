class UpperMenu{

    constructor(){
        let menuItems = [
            {
                title: 'File',
                translateMenuItem: 'Файл',
                subItems: [
                    {
                        to:'SettingConnect',
                        title:'Настройки подключения',
                        innerItems:[]
                    }, 
                    {
                        to: 'DataArchive',
                        title: 'Архивные данные',
                        innerItems: [
                            {
                                classTitle: 'deg',
                                title: 'Газы',
                                type: 'text'
                            },
                            {
                                classTitle: 'deg',
                                title: 'Рабочие параметры',
                                type: 'text'
                            },
                            {
                                classTitle: 'deg',
                                title: 'Мониторинг высоковольтных вводов',
                                type: 'text'
                            },
                            {
                                classTitle: 'deg',
                                title: 'Данные измерений и расчётов влажности масла и бумажной изоляции',
                                type: 'text'
                            },
                        ]
                    }, 
                    {
                        to: 'DataRefresh',
                        title: 'Обновить данные',
                        innerItems: []
                    }, 
                    {
                        to: 'SingInSystem',
                        title: 'Войти в систему',
                        innerItems: []
                    }
                ]
            },
            {
                title: 'Interface',
                translateMenuItem: 'Интерфейс',
                subItems: [
                    {
                        to: 'ByDefault',
                        title: 'Сбрость по умолчанию',
                        innerItems: []
                    },
                    {
                        to: 'Display',
                        title: 'Отображение',
                        innerItems: [
                            {
                                classTitle : 'deg',
                                title:'Дегазация',
                                type:'checkbox'
                            },
                            {
                                classTitle: 'offData',
                                title:'Оффлайн данные',
                                type: 'checkbox'
                            }
                        ]
                    },
                    {
                        to: 'StartData',
                        title: 'Начальная дата',
                        innerItems: [
                            {
                                classTitle: 'startDate',
                                title: '',
                                type: 'dateTimePicker'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Settings',
                translateMenuItem: 'Настройки',
                subItems: [
                    {
                        to: 'ForecastAnalyze',
                        title: 'Анализ прогноза',
                        innerItems: []
                    },
                    {
                        to: 'GestHumidity',
                        title: 'Гистерезис влажности',
                        innerItems: []
                    },
                    {
                        to: 'TimeRepair',
                        title: 'Время ремонтов',
                        innerItems: [
                            {
                                classTitle: 'timeRepair',
                                title: '',
                                type: 'inNumber'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'FAQ',
                translateMenuItem: 'Справка',
                subItems: [
                    {
                        to: 'About',
                        title: 'О программе',
                        innerItems: []
                    }
                ]
            }
        ];

        this.create = () =>{
            for (let i = 0; i < menuItems.length; i++) {
                $(`
                <div class="dropdown m-1">
                  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    ${menuItems[i].translateMenuItem}
                  </a>
                  <ul class="dropdown-menu ${menuItems[i].title}" aria-labelledby="dropdownMenuLink">
                  </ul>
                </div>
                `).appendTo('.upperMenu');

                if (menuItems[i].subItems.length == 0)
                    continue;

                factoryList(menuItems[i].subItems, menuItems[i].title);
                
            }
        }

        function factoryList(arrItems, toAddUl){
            for (let j = 0; j < arrItems.length; j++) {
                $(`<li class="item ${arrItems[j].to}"><a class="dropdown-item" id="${arrItems[j].to}" href="#">${arrItems[j].title}</a></li>`).appendTo(`.${toAddUl}`);
                if (arrItems[j].innerItems.length == 0)
                    continue;
                else{
                    $(`#${arrItems[j].to}`).text(`${arrItems[j].title} >`);
                    $(`<ul class="subMenu ${arrItems[j].to}_Sub "></ul>`).appendTo(`.${arrItems[j].to}`);
                    
                    for (let i = 0; i < arrItems[j].innerItems.length; i++) {
                        switch (arrItems[j].innerItems[i].type) {
                            case 'dateTimePicker': $(`<li><input type="date"></li>`).appendTo(`.${arrItems[j].to}_Sub`);
                                break;
                            case 'checkbox': 
                                $(`<li>
                                    <input id="${arrItems[j].innerItems[i].classTitle}" type="checkbox"></input>
                                    <lable id="menuLabel" for="${arrItems[j].innerItems[i].classTitle}">${arrItems[j].innerItems[i].title}</label>
                                </li>`)
                                .appendTo(`.${arrItems[j].to}_Sub`);
                                break;
                            case 'inNumber': $(`<li><input type="number"></li>`).appendTo(`.${arrItems[j].to}_Sub`);
                                break;
                            case 'text': $(`<li><a class="dropdown-item" href="#">${arrItems[j].innerItems[i].title}</a></li>`).appendTo(`.${arrItems[j].to}_Sub`);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
    }
}