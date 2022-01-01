/* eslint-disable spaced-comment */
/* eslint-disable eol-last */
/* eslint-disable indent */
const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token, //建立token的快捷訪問
    name: state => state.user.userInfo.username, // 建立對於用戶名的快捷訪問
    userId: state => state.user.userInfo.userId, // 建立對於用戶ID的快捷訪問
    staffPhoto: state => state.user.userInfo.staffPhoto, //建立頭像的快捷訪問
    companyId: state => state.user.userInfo.companyId // 建立对于user模块的companyId的快捷访问
}
export default getters