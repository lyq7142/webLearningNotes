// webpack入口文件

import data from './data.json';
import './index.css';
import './index.less';

console.log(data);

function add(x,y){
    return x+y;
}
console.log(add(1,2));
