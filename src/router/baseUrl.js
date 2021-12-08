let baseUrl="";
let env=process.env.NODE_ENV;
switch(env){
    case "dev":
        baseUrl='http://192.168.100.103:8083';
        break;
    case "test":
        baseUrl='http://192.168.100.104:8777';
        break;
    case "product":
        baseUrl="https://121.199.54.43:8888";
        break;
    default:break;
}

export default  baseUrl;