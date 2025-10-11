const currentYear = new Date().getFullYear();

exports.createOrgId = async(orgName) => {

    const reqLen = 4
    let prefix = orgName.toUpperCase();

    if (prefix.length >= reqLen) {
        prefix = prefix.slice(0, reqLen);
    } else {
        prefix = prefix.padEnd(reqLen, 'X');
    }

    return prefix

}

exports.creteInvoiceId = async(orgId) => {

    const orgCode = orgId.split('-')[0];

    return orgCode


}