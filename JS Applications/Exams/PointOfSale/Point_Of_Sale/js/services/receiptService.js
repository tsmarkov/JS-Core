let receipts = (() => {
    function getActiveReceipt() {
        let userId = sessionStorage.getItem('userId');
        
        let endpoint = `receipts?query={"_acl.creator":"${userId}","active":"true"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function createReceipt() {
        let data = {
            "active": true,
            "productCount": 0,
            "total": 0
        };

        return remote.post('appdata', 'receipts', 'kinvey', data);
    }

    function getMyReceipts(userId) {
        let endpoint = `receipts?query={"_acl.creator":"${userId}","active":"false"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function getReceiptById(receiptId) {
        let endpoint = 'receipts/receipt_id';

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function commitReceipt(receiptId, productCount, total) {
        let endpoint = `receipts/${receiptId}`;
        let data = {
            "active": false,
            productCount,
            total
        };

        return remote.update('appdata', endpoint, data);
    }

    return {
        getActiveReceipt,
        createReceipt,
        getMyReceipts,
        getReceiptById,
        commitReceipt
    }
})();