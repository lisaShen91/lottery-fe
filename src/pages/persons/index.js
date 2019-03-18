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
            currentPage: 'persons',
        }
    }
    
    async _init() {
        super._init();
        let persons = await utils.getPersons();
        this.set({persons})
    }
    
}