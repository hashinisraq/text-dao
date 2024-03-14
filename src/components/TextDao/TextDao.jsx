import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const TextDao = () => {
  const textRef = useRef();
  const [questionHistory, setQuestionHistory] = useState([]);
  const [answerHistory, setAnswerHistory] = useState([]);

  const handleOnSubmit = async () => {
    let text = textRef?.current.value;

    if (text === "") {
      alert("Please write something...");
    } else {
      const updatedQuestions = [...questionHistory, "↪ " + text];
      setQuestionHistory(updatedQuestions);
      textRef.current.value = ''; // Clearing input field
      try {
        // const response = await fetch('/your-backend-endpoint', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ question: text }),
        // });
        // if (!response.ok) {
        //   throw new Error('Failed to fetch answer');
        // }
        // const data = await response.json();
        // const updatedAnswers = [...answerHistory, data.answer];
        // setAnswerHistory(updatedAnswers);

        const data = "working";
        const updatedAnswers = [...answerHistory, "↩ " + data];
        setAnswerHistory(updatedAnswers);
      } catch (error) {
        console.error('Error fetching answer:', error.message);
        const updatedAnswers = [...answerHistory, 'Error fetching answer. Please try again later.'];
        setAnswerHistory(updatedAnswers);
      }
    }
  };

  return (
    <div className="p-2 m-2">
      <p>↪ Hey, How can I help you?</p>
      {questionHistory.map((question, index) => (
        <div key={index}>
          <p className="question">{question}</p>
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
              Answer Me!
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TextDao;
