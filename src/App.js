import { useEffect, useState } from "react";
import Album from "./albums";
import Nav from "./nav";
import Form from "./albumInput";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firabseConfig/firebaseConfig";
import Images from "./albumImages";
import Input from "./imageInput";
import Notifications from "./notification";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [albumImage, setAlbumsImage] = useState([]);
  const [showInputForm, setInputForm] = useState(false);
  const [InputValue, setInputValue] = useState({ name: "", url: "" });
  const [updateData, setupdateData] = useState("");
  const [search, setSearch] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [notify, setNotify] = useState({
    show: false,
    success: false,
    message: "",
  });

  const handleAdd = async (albums) => {
    try {
      await addDoc(collection(db, "albums"), albums);
      setNotify({
        show: true,
        success: true,
        message: "Album added successfully!",
      });
    } catch (error) {
      setNotify({
        show: true,
        success: false,
        message: "Failed to add album.",
      });
    }

    setTimeout(() => {
      setNotify({ show: false, success: false, message: "" });
    }, 3000);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "albums"), (snapshot) => {
      const albums = snapshot.docs.map((ele) => ({
        id: ele.id,
        ...ele.data(),
      }));
      setAlbums(albums);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleImg = async (i) => {
    const album = albums[i];
    setSelectedAlbum(album);
    setShowForm(false);

    const q = query(collection(db, "images"), where("albumId", "==", album.id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const albumImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlbumsImage(albumImages);
      setFilteredImages(albumImages);
    });

    return () => unsubscribe();
  };
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = albumImage.filter(
      (image) =>
        image.name.toLowerCase().includes(value) ||
        image.url.toLowerCase().includes(value)
    );
    setFilteredImages(filtered);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setInputForm(false);
    setInputValue({ name: "", url: "" });
  };
  const handleAddImages = () => {
    setInputForm((prev) => !prev);
    setInputValue({ name: "", url: "" });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (updateData) {
        await updateDoc(doc(db, "images", updateData.id), InputValue);
        setNotify({
          show: true,
          success: true,
          message: "Image updated successfully!",
        });
      } else if (InputValue.name && InputValue.url) {
        const imageData = {
          ...InputValue,
          albumId: selectedAlbum.id,
        };
        await addDoc(collection(db, "images"), imageData);
        setNotify({
          show: true,
          success: true,
          message: "Image added successfully!",
        });
      }
    } catch (error) {
      setNotify({
        show: true,
        success: false,
        message: "Failed to add or update image.",
      });
    }

    setInputValue({ name: "", url: "" });
    setupdateData(null);
    setInputForm(false);

    setTimeout(() => {
      setNotify({ show: false, success: false, message: "" });
    }, 3000);
  };

  const handleEditImage = async (imageData) => {
    try {
      await updateDoc(doc(db, "images", imageData.id), imageData);
      setNotify({
        show: true,
        success: true,
        message: "Image updated successfully!",
      });
    } catch (error) {
      setNotify({
        show: true,
        success: false,
        message: "Failed to update image.",
      });
    }

    setTimeout(() => {
      setNotify({ show: false, success: false, message: "" });
    }, 3000);
  };
  const handleDeleteImage = async (id) => {
    try {
      await deleteDoc(doc(db, "images", id));
      setNotify({
        show: true,
        success: true,
        message: "Image deleted successfully!",
      });
    } catch (error) {
      setNotify({
        show: true,
        success: false,
        message: "Failed to delete image.",
      });
    }

    setTimeout(() => {
      setNotify({ show: false, success: false, message: "" });
    }, 3000);
  };

  useEffect(() => {
    if (updateData) {
      setInputValue({ name: updateData.name || "", url: updateData.url || "" });
    }
  }, [updateData]);

  return (
    <>
      <Nav />
      {showForm && <Form handleAdd={handleAdd} />}
      {showInputForm && (
        <Input
          name={InputValue.name}
          url={InputValue.url}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      )}
      {notify.show && (
        <Notifications success={notify.success} message={notify.message} />
      )}
      {!selectedAlbum ? (
        <Album
          handelClick={handleClick}
          showForm={showForm}
          albums={albums}
          handleImg={handleImg}
        />
      ) : (
        <Images
          album={selectedAlbum}
          handleBack={handleBackToAlbums}
          handleAddImages={handleAddImages}
          showInputForm={showInputForm}
          setInputForm={setInputForm}
          albumImage={filteredImages}
          handleDeleteImage={handleDeleteImage}
          handleEditImage={handleEditImage}
          setupdateData={setupdateData}
          handleSearch={handleSearch}
          search={search}
        />
      )}
    </>
  );
}
