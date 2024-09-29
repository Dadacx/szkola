import config from '../config.json'

const SetName = (typ,data) => {
    return config[typ].find(x => data == x.id).nazwa
};
export default SetName;