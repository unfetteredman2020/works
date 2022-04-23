var mobileReg = /^1[3456789]\d{9}$/; //验证规则

const RegMobile = m => mobileReg.test(m)

module.exports = {
    RegMobile
}