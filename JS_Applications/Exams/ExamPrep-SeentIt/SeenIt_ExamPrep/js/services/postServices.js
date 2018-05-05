let posts = (() => {
    function getAllPosts() {
        return remote.get('appdata', 'posts', 'kinvey');
    }

    function createPost(author, title, description, url, imageUrl) {
        let data = {
            author,
            title,
            description,
            url,
            imageUrl
        };

        return remote.post('appdata', 'posts', 'kinvey', data);
    }

    function editPost(author, title, description, url, imageUrl, postId) {
        let endpoint = `posts/${postId}`;

        let data = {
            author,
            title,
            description,
            url,
            imageUrl
        };

        return remote.update('appdata', endpoint, 'kinvey', data);
    }

    function deletePost(postId) {
        let endpoint = `posts/${postId}`;

        return remote.remove('appdata', endpoint, 'kinvey');
    }

    function getAllMyPosts(author) {
        let endpoint = `posts?query={"author":"${author}"}&sort={"_kmd.ect": -1}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function getPostById(postId) {
        let endpoint = `posts/${postId}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    return {
        getAllPosts,
        createPost,
        editPost,
        deletePost,
        getAllMyPosts,
        getPostById
    };
})();