import { useRef, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { GoogleGenerativeAI } from "@google/generative-ai";

const TextDao = () => {
  const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GOOGLE_API_KEY}`);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const textRef = useRef();
  const [questionHistory, setQuestionHistory] = useState([]);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async () => {
    let text = textRef?.current.value;

    if (text === "") {
      alert("Please write something...");
    } else {
      setLoading(true);
      const updatedQuestions = [...questionHistory, text + " ↩"];
      setQuestionHistory(updatedQuestions);
      textRef.current.value = "";

      const result = await model.generateContent(text);
      const response = await result.response;
      const answer = response.text();
      const updatedAnswers = [...answerHistory, "↪ " + answer];
      setAnswerHistory(updatedAnswers);
      setLoading(false);
    }
  };

  return (
    <div className="p-2 m-2">
      <p>↪ Hey, How can I help you?</p>
      {questionHistory.map((question, index) => (
        <div key={index}>
          <p className="question" style={{textAlign:"end"}}>{question}</p>
          <p className="answer">{answerHistory[index]}</p>
        </div>
      ))}
      <Form>
        <Row>
          <Col sm={10}>
            <textarea
              ref={textRef}
              style={{ border: "none", borderBottom: "1px solid black" }}
              placeholder="Text likho..."
              type="text"
              className="form-control"
              id="text"
              required
            />
          </Col>
          <Col sm={2}>
            <Button
              className="m-1"
              variant="dark"
              onClick={(e) => {
                e.preventDefault();
                handleOnSubmit();
              }}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Answer Me!"
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TextDao;
