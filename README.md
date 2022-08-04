# Smart-Mirror-CN 更适合国内使用的信息屏
使用React框架

*注意：轮子刚开始造，功能不完全，稳定性未知，谨慎使用：）*

## 上手
    git clone https://github.com/qyx596/smartmirror-cn.git
    cd smartmirror-cn
    mv src/config.json.sample src/config.json
    npm install
    npm run start


## 配置文件说明
信息屏的配置文件为./src/config.json

| 字段名                    | 含义                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------|
| sentence.type          | 提示语类型(参考:https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0)       |
| weather.locationID     | 和风天气城市ID(参考:https://github.com/qwd/LocationList/blob/master/China-City-List-latest.csv)<br/> |
| weather.key            | 和风天气开发者key(注册链接:https://dev.qweather.com/)                                                   |                                                                   
| covid19status.province | 指定地区是否有现存确诊(参考:https://lab.isaaclin.cn/nCoV/zh)                                              |

## 运行截图
![image](https://github.com/qyx596/smartmirror-cn/blob/main/images/IMG_2829.JPG?raw=true)
