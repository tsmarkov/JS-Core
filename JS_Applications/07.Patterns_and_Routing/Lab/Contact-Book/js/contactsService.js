let contacts = (() => {
    function getAllContacts() {
        return remote.get('appdata', 'contacts', 'kinvey');
    }

    return {
        getAllContacts
    }
})();