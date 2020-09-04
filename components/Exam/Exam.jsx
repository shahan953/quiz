import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import {
  FlagOutlined,
  LockOutlined,
} from "@ant-design/icons";
import {
  Question,
  CardExtra,
} from "./exam.style";

import AnswerPanel from "./AnswerPanel";
import QuestionButtons from "./QuestionButtons";

import { questions } from "./data.json";

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [answeredQues, setAnsweredQues] = useState([]);
  const [markedQues, setMarkedQues] = useState([]);
  const [mood, setMood] = useState(0);
  const [isCrntMarked, setMarked] = useState(false);

  useEffect(() => {
    const data = markedQues.find((item) => item === currentQuestion.item_order);
    if (data === undefined) setMarked(false);
    else setMarked(true);
  }, [markedQues, currentQuestion]);

  const handleNatigation = (item_order) => {
    const cnt = questions.find((item) => item.item_order === item_order);
    setCurrentQuestion(cnt);
  };
  return (
    <Row style={{ padding: "20px" }}>
      <Col span={14} style={{ paddingRight: "20px" }}>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={`Question no ${currentQuestion.item_order + 1}`}
          extra={
            <CardExtra>
              {!!mood && <LockOutlined style={{ marginRight: "10px" }} />}
              {isCrntMarked && <FlagOutlined style={{ color: "#FF1575" }} />}
            </CardExtra>
          }
        >
          <Question>{currentQuestion.question_text}</Question>
          <AnswerPanel
            question={currentQuestion}
            answeredQues={answeredQues}
            setAnsweredQues={setAnsweredQues}
            handleNatigation={handleNatigation}
            mood={mood}
            setMood={setMood}
            markedQues={markedQues}
            setMarkedQues={setMarkedQues}
            isMarked={isCrntMarked}
          />
        </Card>
      </Col>
      <QuestionButtons
        questions={questions}
        handleNatigation={handleNatigation}
        markedQues={markedQues}
        answeredQues={answeredQues}
        currentQuestion={currentQuestion}
      />
    </Row>
  );
};

export default Exam;
