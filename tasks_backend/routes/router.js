import API from './index';

class Router {
    constructor(server){
        new API(server);
    }
}
export default Router;