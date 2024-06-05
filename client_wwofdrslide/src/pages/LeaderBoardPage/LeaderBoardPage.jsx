import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LEADERBOARD } from "../../utils/queries";
import "./LeaderBoardPage.css";
import Banner from "../../components/Banner/Banner";

const LeaderboardPage = () => {
  const { loading, error, data } = useQuery(QUERY_LEADERBOARD);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className="leaderboard-container">
        <div className="cta-button">
          <a
            className="lb-review-link"
            href="https://www.goodreads.com/book/show/205433385-the-wonderful-world-of-dr-slide?from_search=true&from_srp=true"
          >
            Review on Goodreads
          </a>
        </div>
        <h1 className="lb-title">Leaderboard</h1>
        <table className="lb-table">
          <thead className="lb-head">
            <tr className="tr-content">
              <th>Rank</th>
              <th>Username</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody className="lb-body">
            {data.leaderboard.map((user, index) => (
              <tr key={user._id} className="lb-tr">
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaderboardPage;
