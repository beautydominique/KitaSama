const bcrypt = require("bcryptjs")


function getIDR(salary) {
    let idr = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(salary);
    return idr
}

module.exports = {
    hash: (password) => {
        return bcrypt.hashSync(password, 10)
    },
    compare: (password, hash) => {
        return bcrypt.compareSync(password, hash)
    },
    getIDR
}
