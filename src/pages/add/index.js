import template from "./index.vdt";
import Layout from "src/pages/layout";
import "./index.styl";

export default class extends Layout {
    @Intact.template()
    static template = template;
    
    defaults() {
        return {
            ...super.defaults(),
            type: 'person',
            model: {
                level: 'T-1',
                name: 'test',
                value: 'test',
                amount: 1,
                imagePath: '/static/images/default.png',
                employNumber: '',
                departmentLevel1: '',
                departmentLevel2: '',
                departmentLevel3: '',
                employType: '',
                status: 1
            },
            employTypes: [
                {
                    name: '正式员工',
                    value: 1
                }, {
                    name: '实习生',
                    value: 0
                }
            ],
            currentPage: 'add'
        }
    }
    
    _init() {
        super._init();
        return this.getPersons();
    }
    
    submit() {
        const {type} = this.get();
        const isAddPerson = type === 'person';
        let ref = this.refs[isAddPerson ? 'addPerson' : 'addPresent'];
        ref.validate().then(valid => {
            if (valid) {
                return isAddPerson ? this.addPerson() : this.addPresent();
            } else {
                ref.getFirstInvalidFormItem();
            }
        });
    }
    
    reset() {
        const {type} = this.get();
        const isAddPerson = type === 'person';
        this.refs[isAddPerson ? 'addPerson' : 'addPresent'].reset()
    }
    
    addPresent() {
        const {model} = this.get();
        let options = {
            "level": model.level,
            "name": model.name,
            "value": model.value,
            "imagePath": model.imagePath,
            "amount": model.amount,
            "status": parseInt(model.status || 0)
        };
        utils.setPresents([...utils.getPresents(), options]);
        alert('添加成功');
    }
    
    addPerson() {
        const {model} = this.get();
        let persons = utils.getPersons();
        if (_.include(_.pluck(persons, 'employNumber'), model.employNumber)) {
            Message.warning('当前员工已存在');
            return;
        }
        let newPerson = {
            employNumber: model.employNumber,
            name: model.name,
            departmentLevel1: model.departmentLevel1,
            departmentLevel2: model.departmentLevel2,
            departmentLevel3: model.departmentLevel3,
            employType: model.employType === 1 ? '正式员工' : '实习生',
            status: model.employType,
            type: model.employType,
            winStatus: false
        };
        utils.setPersons([...utils.getPersons(), newPerson]);
        alert('添加成功');
    }
}