import "./App.css";
import ImageAnnotationLine from "./ImageAnnotationLine";
import ImageAnnotationSquare from "./ImageAnnotationSquare";

function App() {
  return (
    <>
      <header>
        <h2>Image Annotation App</h2>
      </header>
      <main>
        {/* <ImageAnnotationLine /> */}
        <ImageAnnotationSquare />
      </main>
    </>
  );
}

export default App;
