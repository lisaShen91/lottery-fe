/**
 * 前端路由配置文件
 */
const routes = {
    // 抽奖
    '/': async () => {
        App.load((await import('../pages/layout')).default);
    },
    // 抽奖首页
    '/draw': async () => {
        App.load((await import('../pages/main')).default);
    },
    // 加奖
    '/add': async () => {
        App.load((await import('../pages/add')).default);
    },
    // 奖品展示
    '/presents': async () => {
        App.load((await import('../pages/present')).default);
    },
    // 参与人员
    '/persons': async () => {
        App.load((await import('../pages/persons')).default);
    },
    /*on: async () => {
        App.load((await import('../pages/main')).default);
    }*/
};
export default routes