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
            presents: [],
            currentPage: 'presents',
            presentTotalAmount: ''
        }
    }
    
    async _init() {
        super._init();
        let presents = await utils.getPresents();
        let presentTotalAmount = presents.map(item => item.amount).reduce((total, current) => total + current, 0);
        this.set({presents, presentTotalAmount});
    }
}