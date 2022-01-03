let stripeToken=""
const YauLei=["九龍城區","觀塘區","深水埗區","黃大仙區","油尖旺區","離島區","葵青區","西貢區"];
const HengFa=["港島南區","灣仔區","港島東區","中西區"];
const YuenLong=["北區","沙田區","屯門區","大埔區","荃灣區","元朗區"];
  // 选项列表，children 代表子选项，支持多级嵌套
const options=[
    {
      text: "香港島",
      value: "1",
      children: [
        {
          text: "灣仔",
          value: "101",
          children: [
            { text: "灣仔駱克道313號6樓", value: "HKG-P209" },
          ]
        },
        {
          text: "東區",
          value: "102",
          children: [
            { text: "柴灣吉勝街12號達藝工業中心15樓09室(祥利街21-27號達藝工業中心停車場門口可入)", value: "HKG-P030" },
            { text: "北角道8號隆運大廈1樓C,D室", value: "HKG-P031" },
            { text: "太古鰂魚涌英皇道1065號東達中心4樓405B室(近太古地鐵站A1出口)", value: "HKG-P035" },
            { text: "筲箕灣道57-87號太安樓地下A24B舖", value: "HKG-P280" },
          ]
        },
        {
          text: "南區",
          value: "103",
          children: [
            { text: "香港仔大道234號富嘉工業大廈9樓10室", value: "HKG-P021" },
          ]
        },
        {
          text: "中西區",
          value: "104",
          children: [
            { text: "上環皇后大道西2-12號聯發商業中心12樓03室", value: "HKG-P245" },
            { text: "堅尼地城卑路乍街28號金寶商場J鋪", value: "HKG-P024" },
          ]
        },
      ],
    },
    {
      text: "九龍",
      value: "2",
      children: [
        {
          text: "九龍城區",
          value: "201",
          children: [
            { text: "紅磡民裕街41號凱旋工商中心第一期1樓B1(B)室「佛光街天橋香港賽馬會 旁邊扶手電梯上一層就到」", value: "HKG-P032" },
          ]
        },
        {
          text: "觀塘區",
          value: "202",
          children: [
            { text: "觀塘道448-458號觀塘工業中心3期地庫A3室（觀塘工業中心第二及第三期牌坊右邊）", value: "HKG-P002" },
            { text: "九龍灣宏開道15號九龍灣工業中心4樓03室", value: "HKG-P029" },
            { text: "九龍灣宏光道80號麗晶花園商場1樓113號鋪", value: "HKG-P243" },
            { text: "藍田匯景道8號藍田匯景廣場5樓26號鋪", value: "HKG-P244" },
            { text: "油塘茶果嶺道610號生利工業中心908室", value: "HKG-P048" },
          ]
        },
        {
          text: "油尖旺區",
          value: "203",
          children: [
            { text: "旺角上海街438-444號同珍商業中心19樓1902-03室", value: "HKG-P006" },
            { text: "旺角西洋菜南街74-84號旺角城市中心10樓02室（旺角地鐵站D3出口百老匯樓上）", value: "HKG-P254" },
            { text: "大角咀福全街66-68號福全工廠大廈7樓A1室", value: "HKG-P041" }
          ]
        },
        {
          text: "深水埗區",
          value: "204",
          children: [
            { text: "荔枝角香港工業中心C座1樓19B室（荔枝角地鐵站C出口）", value: "HKG-P038" },
            { text: "長沙灣元洲街312-314號秉暉工業大廈2樓4室", value: "HKG-P040" },
            { text: "深水埗石硤尾街22-28號偉業樓地下26號鋪", value: "HKG-P046" },
          ]
        },
        {
          text: "黃大仙區",
          value: "205",
          children: [
            { text: "新蒲崗爵祿街39-41號啟德工廠大廈二期4字樓E2室", value: "HKG-P037" },
            { text: "黃大仙蒲崗村道61-87號富祐商場27-28號地舖", value: "HKG-P043" },
          ]
        },
      ],
    },
    {
      text: "新界",
      value: "3",
      children: [
        {
          text: "大埔區",
          value: "301",
          children: [
            { text: "大埔靖遠街19號地下", value: "HKG-P022" },
            { text: "大埔舊墟直街30號美利大廈地下1號地舖（天后宮旁直入）", value: "HKG-P026" },
          ]
        },
        {
          text: "元朗區",
          value: "302",
          children: [
            { text: "天水圍天湖路1號嘉湖山莊樂湖居嘉湖新北江商場2樓38號舖", value: "HKG-P034" },
            { text: "天水圍天秀路8號天一商場3樓3005號鋪", value: "HKG-P246" },
            { text: "元朗鳳群街2號年發大廈地下11號鋪", value: "HKG-P036" },
            { text: "元朗媽橫路15-19號良材大樓2期地下5號舖（郎屏地鐵站B2出口）", value: "HKG-P025" },
            // { text: "元朗裕榮徑11號好旺洋樓地下17號鋪（教育路沿大坑渠經舊B仔凉粉直入天橋位）", value: "HKG-P264" },
          ]
        },
        {
          text: "屯門區",
          value: "303",
          children: [
            { text: "屯門震寰路三號德榮工業大廈9樓D室", value: "HKG-P001" },
            { text: "屯門新墟好運洋樓地舖16G（近何福堂及馬會）", value: "HKG-P044" },
            { text: "屯門富健花園商場G67鋪位", value: "HKG-P247" },
          ]
        },
        {
          text: "北區",
          value: "304",
          children: [
            { text: "上水石湖墟龍琛路48號 上水匯10樓1007室", value: "HKG-P004" },
            { text: "粉嶺聯和墟聯旺樓聯發街34號B鋪（馬錦燦中學對面 近教堂交界地鋪）", value: "HKG-P240" },
          ]
        },
        {
          text: "西貢區",
          value: "305",
          children: [
            { text: "將軍澳寶琳北路18號寶林邨寶林商場2樓203舖", value: "HKG-P033" },
            { text: "西貢德隆後街23B地下(順豐後面 利記五金鋪對面）", value: "HKG-P253" },
          ]
        },
        {
          text: "沙田區",
          value: "306",
          children: [
            { text: "火炭坳背灣街14-24號金豪工業大廈第二座地下B2舖", value: "HKG-P005" },
            { text: "火炭穗禾路1號豐利工業中心4樓7B室（火炭麥當勞斜對面）", value: "HKG-P255" },
            { text: "沙田石門安心街19號匯貿中心8樓807室（近石門地鐵站C出口）", value: "HKG-P042" },
          ]
        },
        {
          text: "荃灣區",
          value: "307",
          children: [
            { text: "荃灣沙咀道362號全發商業大廈17樓10-11室", value: "HKG-P027" },
            { text: "荃灣沙咀道26-38號匯力工業中心4樓28室", value: "HKG-P039" },
          ]
        },
        {
          text: "葵青區",
          value: "308",
          children: [
            { text: "葵涌大連排道35-41號金基工業大廈21樓D6室(葵興港鐵站A出口,步行過天橋3分鐘就到)", value: "HKG-P028" },
            { text: "葵涌和宜合道202號誼發大廈1樓13號鋪", value: "HKG-P047" },
            { text: "葵涌葵富路7-11號葵涌廣場3樓3012號舖", value: "HKG-P241" },
          ]
        },
      ],
    },
  ];
  //香港地區選項
  const districtOpt={
    province_list: {
      810000: '香港特別行政區',
    },
    city_list: {
      810100: '港島',
      810200: '九龍',
      810300: '新界'
    },
    county_list: {
      810101: '中西區',
      810102: '灣仔區',
      810103: '港島東區',
      810104: '港島南區',
      810201: '九龍城區',
      810202: '油尖旺區',
      810203: '深水埗區',
      810204: '黃大仙區',
      810205: '觀塘區',
      810301: '北區',
      810302: '大埔區',
      810303: '沙田區',
      810304: '西貢區',
      810305: '元朗區',
      810306: '屯門區',
      810307: '荃灣區',
      810308: '葵青區',
      810309: '離島區',
    }
  };

const ReturnPickUp=(point)=>{
  if(YuenLong.includes(point)){
    return "SUN-FC";
  }
  if(YauLei.includes(point)){
    return "SUN-YL";
  }
  if(HengFa.includes(point)){
    return "SUN-HF";
  }
}


export {stripeToken,options,districtOpt,ReturnPickUp}