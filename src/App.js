import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
//import "./App.css";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function Home({ postList, deletePost }) {
  return (
    <>
      <main>
        <h2>Post List</h2>
        {postList.map((post) => {
          return (
            <div key={post.id}>
              <p>Title: {post.title}</p>
              <p>Author: {post.author}</p>
              <p>Description: {post.description}</p>
              <Link to={`/post/${post.id}/edit`}>
                <button>Edit</button>
              </Link>
              <button onClick={(e) => deletePost(post)}>Delete</button>
              <hr />
            </div>
          );
        })}
      </main>
      <nav>
        <Link to="/post/add">
          <button>Add Post</button>
        </Link>
      </nav>
    </>
  );
}

function AddPostPage({ addPost }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <main>
        <h2>Have something to say?</h2>
        <p>Go ahead and create a new post!</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPost(title, author, description);
            navigate("/");
          }}
        >
          <label>Title</label>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label>Author</label>
          <input
            required
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <label>Post</label>
          <input
            required
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button>Post!</button>
        </form>
      </main>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
      </nav>
    </>
  );
}

function EditPage({ postList, editPost }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const post = postList.find((post) => {
    if (id === post.id) {
      return true;
    } else {
      return false;
    }
  });

  const [title, setTitle] = useState(post.title);
  const [author, setAuthor] = useState(post.author);
  const [description, setDescription] = useState(post.description);
  return (
    <>
      <main>
        <h2>Noticed a mistake?</h2>
        <p>Fix it here!</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editPost(id, title, author, description);
            navigate("/");
          }}
        >
          <label>Title</label>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Author</label>
          <input
            required
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label>Post</label>
          <input
            required
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button>Save Post</button>
        </form>
      </main>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
      </nav>
    </>
  );
}

function App() {
  const [postList, setPostList] = useState([
    {
      id: uuidv4(),
      title: "The useful post",
      author: "Good Guy",
      description:
        "This post will help you fix everything but you social life.",
    },
    {
      id: uuidv4(),
      title: "The complicated post",
      author: "Know-All-Guy",
      description:
        "This over complicated post should be about a sauce's recipe, but the author decided it was best to take it to a molecular level.",
    },
    {
      id: uuidv4(),
      title: "The rant post",
      author: "Angry Guy",
      description:
        "This post is a five pages long rant about how this page sucks, and how Angry Guy could do it better. Too bad he's not interested.",
    },
  ]);

  const addPost = (title, author, description) => {
    const newItem = {
      id: uuidv4(),
      title,
      author,
      description,
    };
    setPostList([...postList, newItem]);
  };

  const editPost = (id, title, author, description) => {
    const newArray = postList.map((post) => {
      if (post.id === id) {
        const copy = { ...post };
        copy.id = uuidv4();
        copy.title = title;
        copy.author = author;
        copy.description = description;
        return copy;
      } else {
        return post;
      }
    });
    setPostList(newArray);
  };

  const deletePost = (post) => {
    const newArray = postList.filter((p) => {
      if (post.id === p.id) {
        return false;
      } else {
        return true;
      }
    });
    setPostList(newArray);
  };

  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route
          path="/"
          element={<Home postList={postList} deletePost={deletePost} />}
        />
        <Route path="/post/add" element={<AddPostPage addPost={addPost} />} />
        <Route
          path="/post/:id/edit"
          element={<EditPage postList={postList} editPost={editPost} />}
        />
      </Routes>
    </div>
  );
}

export default App;
