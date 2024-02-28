import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_RIDDLE, QUERY_ME, QUERY_RIDDLES } from "../../utils/queries";
import { START_RIDDLE, ATTEMPT_RIDDLE, USE_HINT } from "../../utils/mutations";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./SpecificRiddle.css";

const Notification = ({ message, hint, onClose }) => {
  useEffect(() => {
    if (message === "Incorrect Answer, Try Again") {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
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
  const [showGivenUpConfirmation, setShowGivenUpConfirmation] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [hintShown, setHintShown] = useState(false);
  const [userGivenUp, setGivenUp] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [notification, setNotification] = useState(null);
  const [uiHintShown, setUIHintShown] = useState(false);
  const [uiGivenUp, setUIGivenUp] = useState(false);
  const [uiIsSolved, setUIIsSolved] = useState(false);
  const [nextRiddleId, setNextRiddleId] = useState("");
  const [prevRiddleId, setPrevRiddleId] = useState("");
  const [showScoringRules, setShowScoringRules] = useState(false);

  const { loading, error, data } = useQuery(QUERY_RIDDLE, {
    variables: { id: id },
  });
  const { data: userData } = useQuery(QUERY_ME);

  const [startRiddle] = useMutation(START_RIDDLE, {
    refetchQueries: [{ query: QUERY_RIDDLES }, { query: QUERY_ME }],
  });
  const [attemptRiddle] = useMutation(ATTEMPT_RIDDLE, {
    refetchQueries: [{ query: QUERY_RIDDLES }, { query: QUERY_ME }],
  });
  const [hintMutation] = useMutation(USE_HINT, {
    refetchQueries: [{ query: QUERY_RIDDLES }, { query: QUERY_ME }],
  });

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

  useEffect(() => {
    if (data && data.getRiddle && data.getRiddle.interactions) {
      // Find the interaction for the current user
      const interaction = data.getRiddle.interactions.find(
        (interaction) => interaction.userId === loggedInUserId
      );
      if (interaction) {
        setIsSolved(interaction.isSolved);
        setHintShown(interaction.usedHint);
        setGivenUp(interaction.givenUp);
      }
    }
  }, [data, loggedInUserId, id]);

  useEffect(() => {
    const currentId = parseInt(id, 10);
    setNextRiddleId((currentId % TOTAL_RIDDLES) + 1);
    setPrevRiddleId(((currentId - 2 + TOTAL_RIDDLES) % TOTAL_RIDDLES) + 1);
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
      setIsSolved(true);
      setUIIsSolved(true);
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
        isSolved: isCorrect,
        incorrectAnswers: isCorrect ? [] : [userAnswer],
        attempted: true,
        givenUp: false,
        usedHint: hintShown,
      },
    });
  };

  const resetRiddleState = () => {
    setUserAnswer("");
    setNotification(null);
    setHintShown(false);
    setGivenUp(false);
    setIsSolved(false);
    setUIGivenUp(false);
    setUIHintShown(false);
    setUIIsSolved(false);
  };

  // const goToPreviousRiddle = () => {
  //   if (!data || !data.getRiddle) {
  //     return;
  //   }
  //   let prevRiddleId;
  //   if (parseInt(data.getRiddle.id, 10) === 1) {
  //     prevRiddleId = TOTAL_RIDDLES;
  //   } else {
  //     prevRiddleId = parseInt(data.getRiddle.id, 10) - 1;
  //   }
  //   resetRiddleState();
  //   setShowHintConfirmation(false);
  //   navigate(`/riddles/${prevRiddleId}`);
  // };

  // const goToNextRiddle = () => {
  //   if (!data || !data.getRiddle) {
  //     return;
  //   }
  //   let nextRiddleId;
  //   if (parseInt(data.getRiddle.id, 10) === TOTAL_RIDDLES) {
  //     nextRiddleId = 1;
  //   } else {
  //     nextRiddleId = parseInt(data.getRiddle.id, 10) + 1;
  //   }
  //   resetRiddleState();
  //   setShowHintConfirmation(false);
  //   navigate(`/riddles/${nextRiddleId}`);
  // };

  const goToPreviousRiddle = () => {
    resetRiddleState();
    setShowHintConfirmation(false);
    navigate(`/riddles/${prevRiddleId}`);
  };

  const goToNextRiddle = () => {
    resetRiddleState();
    setShowHintConfirmation(false);
    navigate(`/riddles/${nextRiddleId}`);
  };

  const handleShowHintClick = () => {
    setShowHintConfirmation(true);
  };

  const displayHint = () => {
    setNotification(data.getRiddle.hint);
    setShowHintConfirmation(false);
    setUIHintShown(true);
    if (!hintShown) {
      hintMutation({
        variables: {
          userId: loggedInUserId,
          riddleId: id,
          hintNumber: 1,
        },
      });
    }
  };

  const handleGivenUpConfirmation = () => {
    setShowGivenUpConfirmation(true);
  };

  const handleGivenUpClick = () => {
    setShowGivenUpConfirmation(false);
    setUIGivenUp(true);
    if (!userGivenUp) {
      attemptRiddle({
        variables: {
          userId: loggedInUserId,
          riddleId: id,
          isSolved: false,
          incorrectAnswers: [],
          attempted: true,
          givenUp: true,
          usedHint: hintShown,
        },
      });
    }
  };

  const toggleScoringRules = () => {
    setShowScoringRules(!showScoringRules);
  };

  const currentRiddlePoints = () => {
    const interaction = data.getRiddle.interactions.find(
      (interaction) => interaction.userId === loggedInUserId
    );
    if (interaction) {
      if (interaction.isSolved) {
        return 2;
      } else if (interaction.usedHint) {
        return 1;
      }
    }
    return 0;
  };

  const points = currentRiddlePoints();

  return (
    <>
      <Col className="text-center">
        <button className="rules-btn" onClick={toggleScoringRules}>
          Scoring Rules
        </button>
      </Col>
      <div className="id-diff">
        <h6 className="specific-riddle-id">Riddle: {data.getRiddle.id}</h6>
        <h6 className="specific-riddle-points">Points: {points}</h6>
        <h6 className="specific-riddle-difficulty">
          Difficulty: {data.getRiddle.difficulty}
        </h6>
      </div>

      {showScoringRules && (
        <div
          className={`rules-container ${
            showScoringRules ? "rules-visible" : ""
          }`}
        >
          {/* <h6 className="rules-title">Scoring Rules:</h6> */}
          <div className="rules-p">
            <p>Solve: 2 points</p>
            <p>Solve using Hint: 1 point</p>
            <p>Give Up: 0 points</p>
          </div>
          <p className="ast">
            <span>&#42;</span> Incorrect answers do not affect score
          </p>
        </div>
      )}
      <Container className="specific-riddle-container">
        <Row>
          <Col>
            <Image
              className="specific-riddle-image"
              src={data.getRiddle.background_image}
              fluid
            />
          </Col>
          <Col xs={12} md={6} className="answer-form">
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
                  disabled={uiGivenUp || uiIsSolved}
                />
                {notification && (
                  <div>
                    <Notification
                      message={notification}
                      onClose={() => setNotification(null)}
                    />
                  </div>
                )}
                {!uiHintShown && (
                  <Button
                    className="hint-btn"
                    variant="success"
                    onClick={handleShowHintClick}
                    disabled={uiGivenUp || uiIsSolved}
                  >
                    HINT
                  </Button>
                )}
              </Form.Group>
              {showHintConfirmation && (
                <div className="hint-confirmation">
                  Are you sure? Revealing will reduce your score.
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
              {uiHintShown && !uiIsSolved && (
                <Button
                  className="give-up-btn"
                  variant="danger"
                  onClick={handleGivenUpConfirmation}
                  disabled={uiIsSolved || uiGivenUp}
                >
                  I GIVE UP
                </Button>
              )}
              {showGivenUpConfirmation && (
                <div className="hint-confirmation">
                  Are you sure? Giving up will give you a score of 0.
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={handleGivenUpClick}
                  >
                    Yes
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => setShowGivenUpConfirmation(false)}
                  >
                    No
                  </Button>
                </div>
              )}
              {uiGivenUp && (
                <div className="answer-display">
                  Answer: {data.getRiddle.solutions[0]}
                </div>
              )}
              <Button
                className="btn-submit"
                type="submit"
                disabled={uiGivenUp || uiIsSolved || userAnswer.length === 0}
              >
                SUBMIT
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Row className="navigation-buttons">
        <Col className="text-left">
          <button className="btn-nav" onClick={goToPreviousRiddle}>
            <span className="arrow-icons prev-arrow-icons"></span> Previous
          </button>
        </Col>

        <Col className="text-right">
          <button className="btn-nav" onClick={goToNextRiddle}>
            Next <span className="arrow-icons next-arrow-icons"></span>
          </button>
        </Col>
      </Row>
    </>
  );
};

export default SpecificRiddle;
