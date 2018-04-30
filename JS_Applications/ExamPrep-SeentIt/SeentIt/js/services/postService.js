let posts = (() => {
    function getAllPosts() {
        let endpoint = 'posts?query={}&sort={"_kmd.ect": -1}';

        return remote.get('appdata', endpoint, 'kinvey');
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
        let data = {
            author,
            title,
            description,
            url,
            imageUrl
        };

        let endpoint = `posts/${postId}`;

        return remote.update('appdata', endpoint, 'kinvey', data);
    }

    function deletePost(postId) {
        let endpoint = `posts/${postId}`;

        return remote.remove('appdata', endpoint, 'kinvey');
    }

    function getMyPosts(username) {
        let endpoint = `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function postDetails(postId) {
        let endpoint = `posts/${postId}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    return {
        getAllPosts,
        createPost,
        editPost,
        deletePost,
        myPosts: getMyPosts,
        postDetails
    }
})();