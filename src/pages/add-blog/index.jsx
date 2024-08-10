import { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../Context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddNewBlog() {
  const { formData, setFormData, edit, setEdit } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSaveData = async () => {
    try {
      const response = edit
        ? await axios.put(
            `http://localhost:3000/api/blogs/update/${location.state.currentId._id}`,
            {
              title: formData.title,
              description: formData.description,
            }
          )
        : await axios.post("http://localhost:3000/api/blogs/add", {
            title: formData.title,
            description: formData.description,
          });

      const result = response.data;
      console.log("Data is saved", result);
      if (result) {
        setFormData({ title: "", description: "" });
        navigate("/");
        setEdit(false);
      }
    } catch (error) {
      console.error("There was a problem in saving the data", error);
    }
  };
  useEffect(() => {
    if (location.state) {
      const { currentId } = location.state;
      setFormData({
        title: currentId.title,
        description: currentId.description,
      });
      setEdit(true);
    }
  }, [location]);
  return (
    <div className={classes.wrapper}>
      {edit ? <h1>Update a Blog</h1> : <h1>Add New Blog</h1>}
      <div className={classes.formWrapper}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter Blog Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          name="description"
          id="description"
          placeholder="Enter Blog Description"
          value={formData.description}
          onChange={(event) =>
            setFormData({ ...formData, description: event.target.value })
          }
        ></textarea>
        <button onClick={handleSaveData}>
          {edit ? "Update a Blog" : "Add New Blog"}
        </button>
      </div>
      <div className></div>
    </div>
  );
}
