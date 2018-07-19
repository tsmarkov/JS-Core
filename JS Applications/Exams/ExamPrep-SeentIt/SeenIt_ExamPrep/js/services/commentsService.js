let comments = (() => {
    function getAllCommentsByPostId(postId) {
        let endpoint = `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function createComment(author, content, postId) {
        let data = {
            author, content, postId
        };

        return remote.post('appdata', 'comments', 'kinvey', data);
    }

    function deleteComment(commentId) {
        let endpoint = `comments/${commentId}`;

        return remote.remove('appdata', endpoint, 'kinvey');
    }

    return {
        getAllCommentsByPostId,
        createComment,
        deleteComment
    };
})();