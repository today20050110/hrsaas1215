/* eslint-disable spaced-comment */
/* eslint-disable eol-last */
/* eslint-disable indent */
const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token //建立token的快捷訪問
}
export default getters