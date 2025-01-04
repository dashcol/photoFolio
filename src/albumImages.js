import React, { useState } from "react";

export default function Images({
  album,
  handleBack,
  handleAddImages,
  showInputForm,
  setInputForm,
  albumImage,
  handleDeleteImage,
  handleEditImage,
  setupdateData,
  handleSearch,
  search
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredIndices, setHoveredIndices] = useState({});

  const handleMouseEnter = (index) => {
    setHoveredIndices((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index) => {
    setHoveredIndices((prev) => ({ ...prev, [index]: false }));
  };

  const handelClick = (img) => {
    setInputForm(true);
    setupdateData(img);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonsContainer}>
        <button style={styles.backButton} onClick={handleBack}>
          <img
            style={styles.img}
            alt="back"
            src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png"
          />
        </button>

        <div style={styles.searchBox}>
          <input
            placeholder="Search..."
            value={search}
            style={styles.searchInput}
            onFocus={(e) => (e.target.style.boxShadow = "0 0 10px #007BFF")}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          <img
            alt="search"
            src="https://cdn-icons-png.flaticon.com/128/149/149852.png"
            style={styles.searchIcon}
          />
        </div>
        <button style={styles.addButton} onClick={handleAddImages}>
          {showInputForm ? "cancel" : "add"}
        </button>
      </div>
      <h2 style={styles.title}>{album.name}</h2>
      <div style={styles.images}>
        {albumImage.map((img, index) => (
          <div
            key={index}
            id="imageContainer"
            style={{
              ...styles.ImgCont,
              backgroundColor: hoveredIndices[index] ? "lightblue" : "white",
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div>
              <img
                src={img.url}
                alt={`${img.name}`}
                style={styles.image}
                onClick={() => openModal(img.url)}
              />
              {hoveredIndices[index] && (
                <>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9790/9790368.png"
                    alt="delete"
                    style={styles.deleteIcon}
                    onClick={() => handleDeleteImage(img.id)}
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                    alt="edit"
                    style={styles.editIcon}
                    onClick={() => handelClick(img)}
                  />
                </>
              )}
            </div>
            <h2 style={styles.head}>{img.name}</h2>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div style={styles.modal}>
          <img
            onClick={closeModal}
            src="https://cdn-icons-png.flaticon.com/128/748/748122.png"
            alt="cancel"
            style={styles.cancel}
          />
          <img
            src={selectedImage}
            alt="Fullscreen"
            style={styles.fullscreenImage}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "white",
    color: "#ffffff",
    margin: "10px",
    borderRadius: "8px",
    fontFamily: "'Roboto', sans-serif",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
  },
  buttonsContainer: {
    display: "flex",
  },
  backButton: {
    marginBottom: "20px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "50%",
    cursor: "pointer",
    border: "none",
    width: "40px",
    height: "40px",
    position: "relative",
    left: "400px",
    top: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  addButton: {
    padding: "12px 24px",
    marginBottom: "20px",
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer",
    border: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    position: "relative",
    right: "400px",
    top: "10px",
  },
  title: {
    fontSize: "24px",
    color: "#61dafb",
    marginBottom: "20px",
  },
  images: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  image: {
    marginTop: "20px",
    height: "150px",
    width: "150px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  img: {
    width: "20px",
    height: "20px",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  fullscreenImage: {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "8px",
  },
  cancel: {
    width: "25px",
    height: "25px",
    position: "absolute",
    right: "400px",
    top: "150px",
    cursor: "pointer",
  },
  ImgCont: {
    position: "relative",
    height: "220px",
    width: "220px",
    borderRadius: "25px",
    transition: "background-color 0.3s ease",
  },
  head: {
    position: "relative",
    bottom: "15px",
    color: "black",
  },
  deleteIcon: {
    height: "30px",
    width: "30px",
    position: "absolute",
    top: "10px", // Position from the top of the container
    right: "10px",
    cursor: "pointer",
  },
  editIcon: {
    height: "30px",
    width: "30px",
    position: "absolute",
    top: "10px",
    right: "50px",
    cursor: "pointer",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "8px",
    width: "300px",
    margin: "0 auto",
    position: "relative",
  },

  searchInput: {
    flex: 1,
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    outline: "none",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },

  searchIcon: {
    position: "absolute",
    right: "15px",
    width: "20px",
    height: "20px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },

  searchIconHover: {
    transform: "scale(1.2)",
  },
};
