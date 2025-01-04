export default function Nav() {
  // Apply body styles
  document.body.style.margin = "0";
  document.body.style.fontFamily = "'Roboto', sans-serif";
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";

  return (
    <>
      <div style={styles.div}>
        <h1 style={styles.h1}>photoFolio</h1>

        <span style={styles.span} title="Settings">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
            alt="Settings"
            style={styles.icon}
          />
        </span>
      </div>
    </>
  );
}

const styles = {
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "white",
    color: "#ffffff",
    borderBottom: "2px solid #61dafb",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  h1: {
    fontSize: "28px",
    margin: 0,
    fontFamily: "'Roboto', sans-serif",
    color: "black",
    cursor: "pointer",
    textShadow:
      "0 0 5px rgba(97, 218, 251, 0.8), 0 0 10px rgba(97, 218, 251, 0.6)",
  },
  span: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.2s, opacity 0.2s",
  },
  icon: {
    width: "28px",
    height: "28px",
    filter: "drop-shadow(0 0 3px #61dafb)",
  },
};

// document.querySelectorAll("span").forEach((el) => {
//   el.addEventListener("mouseover", () => {
//     el.style.transform = "scale(1.1)";
//     el.style.opacity = "0.9";
//   });

//   el.addEventListener("mouseout", () => {
//     el.style.transform = "scale(1)";
//     el.style.opacity = "1";
//   });
// });
