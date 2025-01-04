export default function Input({ name, url, handleChange, handleSubmit }) {
  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Add New Image</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          placeholder="Enter name for your image"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          placeholder="Enter image URL"
          type="text"
          name="url"
          value={url}
          onChange={handleChange}
        />
        <button style={styles.button} type="submit">
          Add Image
        </button>
      </form>
    </div>
  );
}

const styles = {
  main: {
    width: "50%",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "white",
    color: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    fontSize: "28px",
    color: "#61dafb",
    marginBottom: "20px",
    textShadow: "0 0 8px rgba(97, 218, 251, 0.8)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "2px solid #61dafb",
    backgroundColor: "white",
    color: "black",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  inputFocus: {
    borderColor: "#4caf50",
    boxShadow: "0 0 5px #4caf50",
  },
  button: {
    width: "50%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#61dafb",
    color: "#20232a",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
};
