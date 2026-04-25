import { useState } from "react";
import API from "../services/api";

const UploadForm = ({ fetchImages }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Select image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    await API.post("/", formData);

    setTitle("");
    setFile(null);
    fetchImages();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4">
      <h2 className="text-xl font-bold mb-2">Upload Image</h2>

      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        className="mb-2"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="bg-blue-500 text-white px-4 py-2">
        Upload
      </button>
    </form>
  );
};

export default UploadForm;