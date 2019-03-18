/**
 * Created by shenlisha on 2019/1/14.
 */
import template from "./index.vdt";
import "./index.styl";
import Layout from "src/pages/layout";
export default class extends Layout {
    @Intact.template()
    static template = template;
    
    defaults() {
        return {
            ...super.defaults(),
            start: false,
            currentPresentDetail: {},
            currentPresent: '',
            luckyMen: [],
            currentPage: 'draw',
        }
    }
    
    async _init() {
        super._init();
        this.addEventListeners();
        this.getPresents();
    }
    
    addEventListeners() {
        //index 页面enter开始抽奖/暂停
        window.onkeyup = e => {
            this.changeStatus(e);
        };
        
        //切换奖项等级
        this.on('$changed:currentPresent', () => {
            const {currentPresent, presents} = this.get();
            this.set({
                currentPresentDetail: presents.find(item => item.value === currentPresent),
            })
        })
    }
    
    //切换抽奖按钮状态
    changeStatus(e) {
        if (e.type === 'keyup' && e.keyCode !== 13) return;
        const {start} = this.get();
        this.set('start', !start);
        this.get('start') ? this.startDraw() : this.stopPoll();
    }
    
    // 开始抽奖
    startDraw() {
        let currentPresentDetail = this.get('currentPresentDetail');
        let persons = utils.getPersons();
        let members = persons.filter(item => !item.winStatus);
        if (members.length <= currentPresentDetail.amount) {
            this.set('winners', members);
            return;
        }
        this.set('members', _.shuffle(members));
        this.poll();
    }
    
    poll() {
        this.timer = setTimeout(this.getRandom, 10);
    }
    
    /**
     * 随机抽取和奖品数量一致的人员
     */
    getRandom() {
        let {members, currentPresentDetail} = this.get(),
            presentAmount = currentPresentDetail.amount,
            winners = [],
            remaining = members.slice(0);
        
        for (let i = presentAmount; i > 0; i--) {
            let no = Math.round(Math.random() * remaining.length);
            if (no === remaining.length) {
                no--;
            }
            winners.push(members[no]);
        }
        
        this.set('winners', winners); //页面展示每次抽出的人员
        this.get('start') ? this.poll() : this.stopPoll();
    }
    
    /**
     * 清除定时器，并将当前数据更新奖池
     */
    stopPoll() {
        this.set('start', false);
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
        
    }
    
    rmWinners() {
        let employNoString = prompt();
        let employNoArray = employNoString.split().map(item => parseInt(item));
        let validWinners = this.get('winners').filter(item => !employNoArray.includes(item.employNumber));
        this.set('winners', validWinners);
    }
    
    // 确认获奖人员有效 更新奖池人员状态
    updatePersons() {
        let {winners, currentPresent} = this.get();
        let persons = JSON.parse(localStorage.persons);
        let winnersNo = _.pluck(winners, 'employNumber');
        persons.forEach(item => {
            if (_.includes(winnersNo, item.employNumber)) {
                item.winStatus = true;
                item.present = currentPresent;
            }
        });
        localStorage.persons = JSON.stringify(persons);
    }
    
    getWinners() {
        let persons = utils.getPersons();
        return persons.filter(item => item.winStatus);
    }
    
    getPresents() {
        let presents = utils.getPresents();
        this.set({
            presents,
            currentPresentDetail: presents[0],
            currentPresent: presents[0] && presents[0].value
        });
    }
    
    //导出
    downloadData() {
        let persons = this.getWinners();
        let contentString = ['奖品', '工号', '姓名', '一级部门', '二级部门', '三级部门', '员工类别'].join(',') + '\r\n';
        persons.forEach(item => {
            let info = [
                item.present, item.employNumber, item.name,
                item.departmentLevel1, item.departmentLevel2,
                item.departmentLevel3, item.employType
            ];
            contentString += info.join(',') + '\r\n';
        });
        utils.download(contentString, 'luckys');
    }
   
}