/** 
 * 封装HTTP请求 
 * @param {string} url 接口路径
 * @param {any} data 参数
 * @param {string} type get OR post 
 */
export const HTTP = (url, data, type) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: type || 'post',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: (data) => {
                resolve(data)
            },
            error: (err) => {
                console.log(err)
            }
        })
    })
}
// 调用方式
// async function queryintention(){
//     var data = {
//         'counselor':"aaaaa",
//     }
//     const res = await lib.HTTP(`${conf.server}${api.getBaseInfo}`, formData)
//     console.log(data)
// }




/** 
 * 封装线上线下域名 
 * ShanghaiHttp:            'https://osg-static.sgcc.com.cn',                  //生产1   上海 静态资源访问地址 -
 *ShanghaiSimulationHttp:  'https://osg-static-simu.sgcc.com.cn:28002',       // 生产2 上海仿真 -ShanghaiSimulationUrl
 *BeijingHttp:             'http://211.160.62.32:28620',                      //本地   北七家 - Beijing
 */
const getGlobalUri = () => {
    switch (process.env.NODE_ENV) {
      case 'development':
        return 'http://211.160.62.32:28620'
      default:
        return 'https://osg-static-simu.sgcc.com.cn:28002'
    }
}
export const server = getGlobalUri()