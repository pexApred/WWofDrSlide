import React from "react";
import { Row, Col } from "react-bootstrap";
import { useQuery} from "@apollo/client";
import { QUERY_RIDDLES, QUERY_ME } from "../../utils/queries";
import "./EditProfile.css";

const EditProfile = () => {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(QUERY_ME);

  if (userLoading) return <p>'Loading...'</p>;
  if (userError) return <p>`Error! ${userError.message}`</p>;

  return (
    <Row className="edit-component-container justify-content-center">
      <Col sm={8}>
        <div className="profile-section">
          <h3 className="un-profile">
            username:{" "}
            <span className="data-un">
              {userData && userData.me ? userData.me.username : "Loading..."}{" "}
            </span>
          </h3>
          <h4>Score: {userData?.me?.points}</h4>
        </div>
      </Col>
    </Row>
  );
};

export default EditProfile;
