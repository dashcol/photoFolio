import { useState } from "react";

export default function Form({ handleAdd }) {
  const [InputValue, setInputValue] = useState("");

  const handleClick = () => {
    const albums = {
      name: InputValue,
    };
    handleAdd(albums);
    setInputValue(" ");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Your Album</h1>
      <input
        style={styles.input}
        placeholder="Name of your album"
        type="text"
        value={InputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button onClick={handleClick} style={styles.button}>
        Create
      </button>
    </div>
  );
}

const styles = {
  container: {
    margin: "20px auto",
    padding: "20px",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    border: "2px solid #61dafb",
    color: "#ffffff",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
    color: "#61dafb",
    fontFamily: "'Roboto', sans-serif",
    textShadow:
      "0 0 5px rgba(97, 218, 251, 0.8), 0 0 10px rgba(97, 218, 251, 0.6)",
  },
  input: {
    width: "80%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #61dafb",
    borderRadius: "4px",
    fontSize: "16px",
    color: "black",
    backgroundColor: "white",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#61dafb",
    color: "#20232a",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
};
