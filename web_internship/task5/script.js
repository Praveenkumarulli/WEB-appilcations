document.addEventListener("DOMContentLoaded", loadPosts);

function savePost(){
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let editId = document.getElementById("editId").value;

    if(title === "" || content === ""){
        alert("Please fill all fields!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("blogs")) || [];

    if(editId){
        posts = posts.map(post =>
            post.id == editId ? {id:post.id, title:title, content:content} : post
        );
        document.getElementById("editId").value="";
    } else {
        let newPost = {
            id: Date.now(),
            title: title,
            content: content
        };
        posts.push(newPost);
    }

    localStorage.setItem("blogs", JSON.stringify(posts));

    document.getElementById("title").value="";
    document.getElementById("content").value="";

    loadPosts();
}

function loadPosts(){
    let posts = JSON.parse(localStorage.getItem("blogs")) || [];
    let postsDiv = document.getElementById("posts");
    postsDiv.innerHTML="";

    posts.reverse().forEach(post => {
        let postDiv = document.createElement("div");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="actions">
                <button onclick="editPost(${post.id})">Edit</button>
                <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
            </div>
        `;

        postsDiv.appendChild(postDiv);
    });
}

function deletePost(id){
    let posts = JSON.parse(localStorage.getItem("blogs")) || [];
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem("blogs", JSON.stringify(posts));
    loadPosts();
}

function editPost(id){
    let posts = JSON.parse(localStorage.getItem("blogs")) || [];
    let post = posts.find(post => post.id === id);

    document.getElementById("title").value = post.title;
    document.getElementById("content").value = post.content;
    document.getElementById("editId").value = post.id;
}