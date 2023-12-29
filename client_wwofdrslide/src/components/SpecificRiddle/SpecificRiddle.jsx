import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_RIDDLE, QUERY_ME } from "../../utils/queries";
import { START_RIDDLE, ATTEMPT_RIDDLE, USE_HINT } from "../../utils/mutations";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./SpecificRiddle.css";

const Notification = ({ message, hint, onClose }) => {
  useEffect(() => {
    if (message === "Incorrect Answer! Try Again!") {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [message, onClose]);

  let notificationStyle = "notification-container";

  if (message === "Correct!") {
    notificationStyle += " correct-style";
  } else if (message === "Incorrect, Try Again") {
    notificationStyle += " incorrect-style";
  }

  return <div className={notificationStyle}>{message}</div>;
};

const SpecificRiddle = ({ id }) => {
  const navigate = useNavigate();
  const [showHintConfirmation, setShowHintConfirmation] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [hintShown, setHintShown] = useState(false);
  const [givenUp, setGivenUp] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const { loading, error, data } = useQuery(QUERY_RIDDLE, {
    variables: { id: id },
  });
  const { data: userData } = useQuery(QUERY_ME);
  const [notification, setNotification] = useState(null);
  const [startRiddle] = useMutation(START_RIDDLE);
  const [attemptRiddle] = useMutation(ATTEMPT_RIDDLE);
  const [hintMutation] = useMutation(USE_HINT);

  const loggedInUserId = userData?.me?._id;

  const TOTAL_RIDDLES = 50;

  useEffect(() => {
    if (loggedInUserId && id) {
      startRiddle({
        variables: {
          userId: loggedInUserId,
          riddleId: id,
        },
      });
    }
  }, [loggedInUserId, startRiddle, id]);

  useEffect(() => {
    setGivenUp(false);
  }, [id]);

  if (loading) return <p>'Loading...'</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  const checkAnswer = (e) => {
    e.preventDefault();
    const isCorrect = data.getRiddle.solutions.includes(
      userAnswer.trim().toLowerCase()
    );

    if (isCorrect) {
      setNotification("Correct!");

      // Update the isSolved state to true
      setIsSolved(true);
    } else {
      setNotification("Incorrect, Try Again");
      setTimeout(() => {
        setNotification(null);
        if (hintShown) {
          setNotification(data.getRiddle.hint);
        } else {
          setNotification(null);
        }
      }, 3000);
    }
    attemptRiddle({
      variables: {
        userId: loggedInUserId,
        riddleId: id,
        isSolved: data.getRiddle.solutions.includes(
          userAnswer.trim().toLowerCase()
        ),
        incorrectAnswers: !data.getRiddle.solutions.includes(
          userAnswer.trim().toLowerCase()
        )
          ? [userAnswer]
          : [],
      },
    });
  };

  const resetRiddleState = () => {
    setUserAnswer("");
    setNotification(null);
    setHintShown(false);
  };

  const goToPreviousRiddle = () => {
    if (!data || !data.getRiddle) {
      return;
    }
    let prevRiddleId;
    if (parseInt(data.getRiddle.id, 10) === 1) {
      prevRiddleId = TOTAL_RIDDLES;
    } else {
      prevRiddleId = parseInt(data.getRiddle.id, 10) - 1;
    }
    resetRiddleState();
    setShowHintConfirmation(false);
    navigate(`/riddles/${prevRiddleId}`);
  };

  const goToNextRiddle = () => {
    if (!data || !data.getRiddle) {
      return;
    }
    let nextRiddleId;
    if (parseInt(data.getRiddle.id, 10) === TOTAL_RIDDLES) {
      nextRiddleId = 1;
    } else {
      nextRiddleId = parseInt(data.getRiddle.id, 10) + 1;
    }
    resetRiddleState();
    setShowHintConfirmation(false);
    navigate(`/riddles/${nextRiddleId}`);
  };

  const handleShowHintClick = () => {
    setShowHintConfirmation(true);
  };

  const handleGivenUpClick = () => {
    setGivenUp(true);
  };

  const displayHint = () => {
    setNotification(data.getRiddle.hint);
    setShowHintConfirmation(false);
    setHintShown(true);

    hintMutation({
      variables: {
        userId: loggedInUserId,
        riddleId: id,
        hintNumber: 1,
      },
    });
  };

  // const paragraphs = data.getRiddle.riddle.split('\\n\\n');
  // const formattedRiddle = paragraphs.map((paragraph, pIndex) => (
  //     <div key={pIndex} className='riddle-paragraph'>
  //         {paragraph.split('\\n').map((line, lIndex) => (
  //             <div key={lIndex} className='riddle-line'>
  //                 {line}
  //                 <br />
  //             </div>
  //         ))}
  //     </div>
  // ));

  return (
    <>
      <div className="id-diff">
        <h6 className="specific-riddle-id">Riddle: {data.getRiddle.id}</h6>
        <h6 className="specific-riddle-difficulty">
          Difficulty: {data.getRiddle.difficulty}
        </h6>
      </div>
      <Container className="specific-riddle-container">
        <Row>
          <Col xs={12} md={6}>
            <Image
              className="specific-riddle-image"
              src={data.getRiddle.background_image}
              fluid
            />
          </Col>
          <Col xs={12} md={6}>
            {/* <h1 className="specific-riddle-text">{formattedRiddle}</h1> */}
            <Form className="specific-riddle-form" onSubmit={checkAnswer}>
              <Form.Group
                controlId="formBasicEmail"
                className="answer-input-group"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  autoComplete="off"
                />
                {notification && (
                  <div className="notification-container">
                    <Notification
                      message={notification}
                      onClose={() => setNotification(null)}
                    />
                  </div>
                )}
                {!hintShown && (
                  <Button
                    className="hint-btn"
                    variant="success"
                    onClick={handleShowHintClick}
                  >
                    SHOW HINT
                  </Button>
                )}
              </Form.Group>
              {showHintConfirmation && (
                <div className="hint-confirmation">
                  Are you sure? Revealing may affect your score.
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={displayHint}
                  >
                    Yes
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => setShowHintConfirmation(false)}
                  >
                    No
                  </Button>
                </div>
              )}
              {hintShown && !givenUp && (
                <Button
                  className="give-up-btn"
                  variant="danger"
                  onClick={handleGivenUpClick}
                >
                  I GIVE UP
                </Button>
              )}
              {givenUp && (
                <div className="answer-display">
                  Answer: {data.getRiddle.solutions.join(", ")}
                </div>
              )}
              <Button className="btn-submit" type="submit" disabled={givenUp}>
                SUBMIT
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Row className="navigation-buttons">
        <Col xs={6} md={6} className="text-left">
          <Button className="btn-nav" onClick={goToPreviousRiddle}>
            PREVIOUS RIDDLE
          </Button>
        </Col>
        <Col xs={6} md={6} className="text-right">
          <Button className="btn-nav" onClick={goToNextRiddle}>
            NEXT RIDDLE
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SpecificRiddle;
