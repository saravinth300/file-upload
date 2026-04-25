import { useEffect, useState } from "react";
import API from "./services/api";
import UploadForm from "./components/UploadFrom";
import ImageCard from "./components/ImageCard";

const App = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const res = await API.get("/");
    setImages(res.data);
  };
  useEffect(() => {
  const fetchImages = async () => {
    const res = await API.get("/");
    setImages(res.data);
  };

  fetchImages();
}, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        MERN Image Upload
      </h1>

      <UploadForm fetchImages={fetchImages} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <ImageCard
            key={img._id}
            img={img}
            fetchImages={fetchImages}
          />
        ))}
      </div>
    </div>
  )
}

export default App
