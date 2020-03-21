//数据模型
class baseModel {
    constructor(data,type) {
        if(typeof data === 'string') {
            type = data;
            data = null;
        }
        if(data) {
            this.data = data;
        }
        if(type) {
            this.message = type;
        }
    }
}
class successModel extends baseModel {
    constructor(data,type) {
        super(data,type);
        this.errno = 0;
    }
}
class failModel extends baseModel {
    constructor(data,type) {
        super(data,type);
        this.errno = 1;
    }
}
module.exports = {
    successModel,
    failModel
}