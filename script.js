
function fetchData(area="太平區") {
    const surface = {
        '宜蘭縣': 'F-D0047-001',
        '桃園市': 'F-D0047-005',
        '新竹縣': 'F-D0047-009',
        '苗栗縣': 'F-D0047-013',
        '彰化縣': 'F-D0047-017',
        '南投縣': 'F-D0047-021',
        '雲林縣': 'F-D0047-025',
        '嘉義縣': 'F-D0047-029',
        '屏東縣': 'F-D0047-033',
        '臺東縣': 'F-D0047-037',
        '花蓮縣': 'F-D0047-041',
        '澎湖縣': 'F-D0047-045',
        '基隆市': 'F-D0047-049',
        '新竹市': 'F-D0047-053',
        '嘉義市': 'F-D0047-057',
        '臺北市': 'F-D0047-061',
        '高雄市': 'F-D0047-065',
        '新北市': 'F-D0047-069',
        '臺中市': 'F-D0047-073',
        '臺南市': 'F-D0047-077',
        '連江縣': 'F-D0047-081',
        '金門縣': 'F-D0047-085',
    };
    //const location = area_to_location(area)
    //console.log("|||", area,"|||");
    
    const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/'+'F-D0047-073';
    var API_KEY = "CWB-E88DB850-6029-4CA2-87BE-DB46867CAE5B"
    const params = {
    "Authorization": API_KEY
    };
    
    fetch(url, { headers: params })
    .then(response => response.json())
    .then(data => {
        for (const a of data['records']['locations'][0]['location']) {
            if (a['locationName'].includes(area)) {
                console.log("|||", a['locationName'],"|||");
                data = a;
                break;
            }
        }       
        data= data['records']['locations'][0]['location'][0]
        const locationName = data["locationName"];
        document.getElementById('locationName').textContent = "地區 : "+locationName;
        data = data["weatherElement"]
        const startTime = data[0]["time"][0]["startTime"];
        const PoP = data[0]["time"][0]["elementValue"][0]["value"];
        const PoP_measures = data[0]["time"][0]["elementValue"][0]["measures"];
        const Wx = data[1]["time"][0]["elementValue"][0]["value"];
        const AT = data[2]["time"][0]["elementValue"][0]["value"];
        const AT_measures = data[2]["time"][0]["elementValue"][0]["measures"];
        const T = data[3]["time"][0]["elementValue"][0]["value"];
        const T_measures = data[3]["time"][0]["elementValue"][0]["measures"];
        const RH = data[4]["time"][0]["elementValue"][0]["value"];
        const RH_measures = data[4]["time"][0]["elementValue"][0]["measures"];
        const CI = data[5]["time"][0]["elementValue"][0]["value"];
        const WeatherDescription = data[6]["time"][0]["elementValue"][0]["value"];
        const WS = data[7]["time"][8]["elementValue"][0]["value"];
        const WS_measures = data[7]["time"][8]["elementValue"][0]["measures"];
        const WD = data[8]["time"][9]["elementValue"][0]["value"];
        const WD_measures = data[8]["time"][9]["elementValue"][0]["measures"];
        const Td = data[8]["time"][10]["elementValue"][0]["value"];
        const Td_measures = data[8]["time"][10]["elementValue"][0]["measures"];
        document.getElementById('startTime').textContent = startTime;

        document.getElementById('locationName').textContent = "地區 : "+locationName;
        document.getElementById('PoP').textContent = "降雨機率 : "+PoP+" "+PoP_measures;
        document.getElementById('Wx').textContent = "天氣現象 : "+Wx;
        document.getElementById('AT').textContent = "體感溫度 : "+AT+" "+AT_measures;
        document.getElementById('T').textContent = "溫度 : "+T+" "+T_measures;
        document.getElementById('RH').textContent = "濕度 : "+RH+" "+RH_measures;
        document.getElementById('CI').textContent = "舒適度 : "+CI;
        document.getElementById('WeatherDescription').textContent = "綜合 : "+WeatherDescription;
        document.getElementById('WS').textContent = "風速 : "+WS+" "+WS_measures;
        document.getElementById('WD').textContent = "風向 : "+WD+" "+WD_measures;
        document.getElementById('Td').textContent = "露點溫度 : "+Td+" "+Td_measures;
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        document.getElementById('Time1').textContent = '最後更新時間:'+`${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
        // 獲取 <canvas> 元素
        var canvas = document.getElementById("barChart");
        var context = canvas.getContext("2d");

        // 定義資料
        var data = {
            "體感溫度": AT,
            "溫度": T,
            "舒適度": CI,
            "風速": WS
        };

        // 設定繪圖參數
        var barWidth = 50;
        var barSpacing = 20;
        var startX = 50;
        var startY = canvas.height - 50;
        var maxValue = Math.max(...Object.values(data));

        // 繪製長條圖
        var i = 0;
        for (var key in data) {
            var value = data[key];
            var barHeight = (value / maxValue) * (canvas.height - 100);
            var x = startX + (i * (barWidth + barSpacing));
            var y = startY - barHeight;
            
            context.fillStyle = "#0099ff";
            context.fillRect(x, y, barWidth, barHeight);
            
            context.fillStyle = "#000000";
            context.font = "12px Arial";
            context.fillText(key, x, startY + 20);
            
            i++;
        }
        // 使用取得的資料進行後續處理或顯示
})
.catch(error => console.log(error));
}
function area_to_location(area) {
 // JSON 檔案的路徑
    const jsonFilePath = 'TaiwanAddressCityAreaRoadChineseEnglish.json';

    // 使用 fetch 函式讀取 JSON 檔案
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
        // 解析 JSON 資料
        for (const City of data) {
            for (const a of City.AreaList) {
            if (a.AreaName.includes(area)) {
                console.log('type(City)', City.CityName);
                return City.CityName;
            }
            }
        }
        console.log(area, '找不到');
        return null;
        })
        .catch(error => console.error('發生錯誤：', error));
}

// 在 DOMContentLoaded 事件觸發時執行 fetchData()
document.addEventListener("DOMContentLoaded", fetchData);
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    document.getElementById('time').textContent = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;


    
}
function printText() {
    const inputElement = document.getElementById('textInput');
    const text = inputElement.value;
    var s = area_to_location(text)
    console.log(s);
}
updateTime();
setInterval(updateTime, 1000);