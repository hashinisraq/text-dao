import { Container } from "react-bootstrap";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TextDao from "./components/TextDao/TextDao";

function App() {
  return (
    <div className="bg-dark">
        <Header />
        <hr style={{ color:"white" }}/>
      <Container className="bg-white" style={{ borderRadius: "10px" }}>
        <TextDao/>
      </Container>
        <Footer />
    </div>
  );
}

export default App;
