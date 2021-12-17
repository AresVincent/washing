let baseUrl="";
let env=process.env.NODE_ENV;
console.log(process.env)
switch(env){
    case "dev":
        baseUrl='https://192.168.100.104:8777';
        break;
    case "test":
        baseUrl='https://47.243.201.58:8777';
        break;
    case "product":
        baseUrl="https://washing.kings-hk.com:8888";
        break;
    default:break;
}

export default  baseUrl;