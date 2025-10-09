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

exports.creteInvoiceId = async(orgId, invoiceCount) => {

    let sequenceNumber = 101 + invoiceCount
    let delimiter = '-'
    const lastIndex = orgId.lastIndexOf(delimiter);
    const uniqueNumber = Date.now();

    let partBefore = ''

    if (lastIndex === -1) {
        partBefore = orgId
    } else {
        partBefore = orgId.slice(0, lastIndex);
    }

    console.log(`INV-${currentYear}-${sequenceNumber}`)
        // const reqLen = 4
        // let tunc = ''
        // let sequenceNumber = 101 + clientCount
        // let prefix = orgName.toUpperCase();
        // const uniqueNumber = Date.now();

    // if (prefix.length >= reqLen) {
    //     prefix = prefix.slice(0, reqLen);
    // } else {
    //     prefix = prefix.padEnd(reqLen, 'X');
    // }

    // return `${prefix}-${sequenceNumber}-${uniqueNumber}`

}