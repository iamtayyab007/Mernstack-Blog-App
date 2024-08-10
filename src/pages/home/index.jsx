import { useContext, useEffect } from "react";
import { GlobalContext } from "../../Context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const fetchList = async () => {
    setPending(true);
    const response = await axios.get("http://localhost:3000/api/blogs/");
    const result = await response.data;
    console.log(result);
    if (result && result.message && result.message.length) {
      setBlogList(result.message);
      setPending(false);
    } else {
      setPending(false);
      setBlogList("");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleDelete = async (currentId) => {
    try {
      const id = currentId;
      console.log(`Attempting to delete blog post with ID: ${id}`);

      const response = await axios.delete(
        `http://localhost:3000/api/blogs/delete/${id}`
      );
      const result = response.data; // No need to await this as it's already the parsed data

      console.log(result);
      if (result?.message) {
        // navigate(0);
        console.log(`Blog post with ID: ${id} deleted successfully.`);
        fetchList(); // Refresh the list of blog posts
      } else {
        console.error("Deletion failed: No success message in the response");
      }
    } catch (error) {
      console.error("There was a problem deleting the blog post:", error);
    }
  };

  const handleEdit = async (currentId) => {
    navigate("/add-blog", { state: { currentId } });
  };

  return (
    <div>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading Blogs! Please Wait...</h1>
      ) : blogList && blogList.length > 0 ? (
        blogList.map((items) => (
          <ul key={items._id} className={classes.blogList}>
            <li>{items.title}</li>
            <li>{items.description}</li>
            <div>
              <FaEdit size={30} onClick={() => handleEdit(items)} />
              <FaTrash
                size={30}
                onClick={() => {
                  handleDelete(items._id);
                }}
              />
            </div>
          </ul>
        ))
      ) : (
        <h1>No blogs found!</h1>
      )}
    </div>
  );
}
