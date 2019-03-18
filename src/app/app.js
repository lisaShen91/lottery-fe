import {Router} from "director/build/director";
import routes from "./routes";
import {App} from "kpc/components/app";
import "../css/common.styl";
import Message from "kpc/components/message";

window.Message = Message;

window.App = new App({
	container: document.querySelector('body')
});

let router = new Router(routes);
router.init('/');

if (module.hot) {
	module.hot.accept('./routes', () => {
		const routes = require('./routes').default;
		router.destroy();
		router = new Router(routes);
		router.init('/');
	})
}