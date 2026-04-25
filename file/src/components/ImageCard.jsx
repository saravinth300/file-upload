import { useState } from "react";
import API from "../services/api";

const ImageCard = ({ img, fetchImages }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(img.title);
  const [file, setFile] = useState(null);

  
  const handleDelete = async () => {
    await API.delete(`/${img._id}`);
    fetchImages();
  };

  
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", title);

    if (file) {
      formData.append("image", file);
    }

    await API.put(`/${img._id}`, formData);

    setEditMode(false);
    fetchImages();
  };

  return (
    <div className="border p-2 rounded shadow">
      
      {/* IMAGE */}
      <img
        src={`http://localhost:5000/uploads/${img.image}`}
        className="w-full h-40 object-cover"
      />

      {/* EDIT MODE */}
      {editMode ? (
        <>
          <input
            type="text"
            className="border p-1 w-full mt-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="file"
            className="mt-2"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-2 py-1 mt-2 mr-2"
          >
            Save
          </button>

          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-500 text-white px-2 py-1 mt-2"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3 className="font-semibold mt-2">{img.title}</h3>

          <button
            onClick={() => setEditMode(true)}
            className="bg-yellow-500 text-white px-2 py-1 mt-2 mr-2"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-2 py-1 mt-2"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCard;