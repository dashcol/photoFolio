export default function Notifications({ success, message }) {
  const styles = {
    container: {
      marginTop: "25px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    main: {
      width: "300px",
      height: "50px",
      backgroundColor: "white",
      boxShadow: "0 4px 9px rgba(0, 0, 0, 0.2)",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
    },
    span: {
      height: "40px",
      width: "5px",
      backgroundColor: success ? "green" : "red", // Dynamic color
      marginRight: "10px",
    },
    text: {
      fontSize: "14px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <div style={styles.span}></div>
        <span style={styles.text}>{message}</span>
      </div>
    </div>
  );
}
