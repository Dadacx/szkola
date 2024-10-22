import config from '../config.json'

const SetName = (typ,data) => {
    let nazwa = config[typ].find(x => data == x.id)
    return nazwa == undefined ? data : nazwa.nazwa
};
export default SetName;