import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_RIDDLES, QUERY_ME } from "../../utils/queries";
import { UPDATE_PROFILE } from "../../utils/mutations";
import "./EditProfile.css";

const EditProfile = () => {
  const { loading: riddlesLoading } = useQuery(QUERY_RIDDLES);
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(QUERY_ME);
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: QUERY_ME }],
  });
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [editMode, setEditMode] = useState({
    username: false,
    password: false,
  });

  useEffect(() => {
    if (userData && userData.me) {
      setFormData({
        username: userData?.me?.username || "",
        password: "",
      });
    }
  }, [userData]);

  if (riddlesLoading || userLoading) return <p>'Loading...'</p>;
  if (userError) return <p>`Error! ${userError.message}`</p>;

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProfile({
        variables: { userId: userData.me._id, ...formData },
      });
      setEditMode({
        username: false,
        password: false,
      });
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <Row className="edit-component-container justify-content-center">
      <Col sm={8}>
        <div className="profile-section text-center">
          {/* <div className="profile-image">
            <img src="https://via.placeholder.com/150" alt="User Profile" />
          </div> */}
          {/* <h4>
                        Email:{' '}
                        {editMode.email ? (
                            <form className="sform" onSubmit={handleFormSubmit}>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete='email'
                            />
                            <button className="sbtn" type="submit">Update</button>
                            </form>
                        ) : (
                            <>
                                {userData.me.email}{' '}
                                <button className="sbtn" type='button' onClick={() => toggleEditMode('email')}>Edit</button>
                            </>
                        )}
                    </h4> */}
          <h4>
            Username:{" "}
            {editMode.username ? (
              <form className="sform" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  autoComplete="username"
                />
                <button className="sbtn" type="submit">
                  Update
                </button>
              </form>
            ) : (
              <>
                {userData && userData.me ? userData.me.username : "Loading..."}{" "}
                <button
                  className="sbtn"
                  type="button"
                  onClick={() => toggleEditMode("username")}
                >
                  Edit
                </button>
              </>
            )}
          </h4>
          <h4>
            Password:{" xxxxxxxx "}
            {editMode.password ? (
              <form className="sform" onSubmit={handleFormSubmit}>
                <input
                  type="password"
                  name="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                />
                <button className="sbtn" type="submit">
                  Update
                </button>
              </form>
            ) : (
              <>
                <button
                  className="sbtn"
                  type="button"
                  onClick={() => toggleEditMode("password")}
                >
                  Change
                </button>
              </>
            )}
          </h4>
        </div>
      </Col>
      {/* <Col>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter new username"
                        />
                    </label>
                    <button type="submit">Update</button>
                </form>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter new email"
                        />
                    </label>
                    <button type="submit">Update</button>
                </form>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                        />
                    </label>
                    <button type="submit">Update</button>
                </form>
            </Col> */}
    </Row>
  );
};

export default EditProfile;
