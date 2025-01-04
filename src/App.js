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

  const handleAdd = async (albums) => {
    await addDoc(collection(db, "albums"), albums);
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

    if (updateData) {
      await updateDoc(doc(db, "images", updateData.id), InputValue);
    } else if (InputValue.name && InputValue.url) {
      const imageData = {
        ...InputValue,
        albumId: selectedAlbum.id,
      };
      await addDoc(collection(db, "images"), imageData);
    }

    setInputValue({ name: "", url: "" });
    setupdateData(null);
    setInputForm(false);
  };

  const handleEditImage = async () => {
    await updateDoc(doc(db, "images"));
  };

  const handleDeleteImage = async (id) => {
    await deleteDoc(doc(db, "images", id));
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
