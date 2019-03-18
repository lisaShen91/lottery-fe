import template from "./index.vdt";
import "./index.styl";

export default class extends Intact {
    @Intact.template()
    static template = template;
    
    defaults() {
        return {
            pages: [
                {
                    name: '首页',
                    value: ''
                }, {
                    name: '参与抽奖人员',
                    value: 'persons'
                }, {
                    name: '奖品信息',
                    value: 'presents'
                }, {
                    name: '抽奖页面',
                    value: 'draw'
                }, {
                    name: '添加人员/奖项',
                    value: 'add'
                }
            ],
            currentPage: 'index'
        }
    }
    
    _init() {
        this.on('$change:currentPage', () => {
            location.href = '/#/' + this.get('currentPage');
        })
    }
    
    //初始化奖池人员状态和奖品信息
    jackpotInit() {
        this.getPersons();
        this.getPresents();
    }
    
    async getPersons() {
        let persons = (await import('src/data/persons')).default;
        persons.forEach(item => {
            item.winStatus = false;
            item.present = null;
        });
        utils.setPersons(persons);
        return persons;
    }
    
    async getPresents() {
        let presents = (await import('src/data/presents')).default;
        utils.setPresents(presents);
        return presents;
    }
    
    onChangePage() {
        const {currentPage} = this.get();
        switch (currentPage) {
            case 'presents':
                location.href = '/#/presents';
                break;
            case 'luckys':
                location.href = '/#/presents';
                break;
        }
    }
}