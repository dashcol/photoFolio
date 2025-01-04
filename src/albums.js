export default function Album({ handelClick, albums, showForm, handleImg }) {
  return (
    <div style={styles.main}>
      <div style={styles.headContainer}>
        <span style={styles.headSpan}>
          <h1 style={styles.head}>Albums</h1>
        </span>
        <span style={styles.albumButtonSpan}>
          <button onClick={handelClick} style={styles.albumButton}>
            {showForm ? "Cancel" : "Add Albums"}
          </button>
        </span>
      </div>
      <div style={styles.albums}>
        {albums.map((e, index) => (
          <div key={index} style={styles.albumCardContainer}>
            <div style={styles.albumCard}>
              <div style={styles.card}>
                <img
                  onClick={() => handleImg(index)}
                  style={styles.img}
                  alt="album"
                  src="https://cdn-icons-png.flaticon.com/128/1829/1829586.png"
                />
              </div>
              <span style={styles.span}>
                <h4 style={styles.albumName}>{e.name}</h4>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  main: {
    width: "70%",
    margin: "25px auto",
    padding: "20px",
    backgroundColor: "white",
    color: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif",
  },
  headContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #61dafb",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  headSpan: {
    display: "flex",
    alignItems: "center",
  },
  head: {
    fontSize: "32px",
    margin: 0,
    color: "#61dafb",
    textShadow:
      "0 0 5px rgba(97, 218, 251, 0.8), 0 0 10px rgba(97, 218, 251, 0.6)",
  },
  albumButtonSpan: {
    display: "flex",
    alignItems: "center",
  },
  albumButton: {
    padding: "10px 20px",
    backgroundColor: "#61dafb",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  albums: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    padding: "10px 0",
  },
  albumCardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  albumCard: {
    width: "150px",
    height: "150px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
    border: "2px solid #61dafb",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "5px",
    cursor: "pointer",
  },
  img: {
    height: "80px",
    width: "80px",
    filter: "drop-shadow(0 0 5px #61dafb)",
  },
  span: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
  },
  albumName: {
    fontSize: "16px",
    color: "black",
    textShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
    margin: 0,
  },
};
