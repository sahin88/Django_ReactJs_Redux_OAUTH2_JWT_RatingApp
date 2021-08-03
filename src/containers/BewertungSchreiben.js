import React, { useState, Fragment } from 'react';
import Rate from '../components/Rate';
import Star from '../components/Star';
import '../css/bewertung.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
const BewertungSchreiben = ({ isAuthenticated, user }) => {

  const [rating, setRating] = useState(0);
  const [submission, setSubmission] = useState(false);
  const [maxChar, setMaxChar] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [first_name, setfirstName] = useState('');
  const [last_name, setsetlastName] = useState('');
  const [formData, setFormData] = useState({ message: '' });
  const [percentage, setPercentage] = useState(0)


  const onChange = (e) => {
    if (e.target.value.length > 280) {
      setMaxChar(true);
      setPercentage(100);
    }

    else {
      setMaxChar(false)

      setPercentage(e.target.value.length / 280 * 100)
    }
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  };
  const { message } = formData;
  const stars = [1, 2, 3, 4, 5];

  const onSubmit = (e) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        }
      };
      const body = JSON.stringify({ first_name: user.first_name, last_name: user.last_name, comments: message, author: user.id, ratings: rating })
      try {

        const res = axios.post(`${process.env.REACT_APP_API_URL}/api/comments/post`, body, config)
        setSubmission(true)
      } catch (err) {
        console.log("error from submission", err)
        alert(err)

      }

      e.preventDefault();
    }
  }
  var className = "container-bewertung-textarea"

  if (submission) {
    return <Redirect to="/bewertung" />
  }

  return (
    <Fragment>

      <div className="container-bewertung">
        <div className="container-bewertung-title" >
          <h2 >Bewertung Screiben</h2>

        </div>

        <div className="reviews-list">
          <div className="review-card">

            <div className="review-description">
              <form onSubmit={e => (onSubmit(e))} className="comment-form">
                {isAuthenticated ? <textarea name="message" placeholder="Geben Sie Ihre Bewertung ein!" onChange={e => onChange(e)} value={message} className={className}></textarea> : <Link className="container-bewertung-link" to="/login">Sie müsssen sich anmelden, um Bewertung zu schreiben.
                  Bitte auf die Link klicken!</Link>}





                <div className="review-details">
                  <div className="flex-container">
                    {stars.map((star, i) => (
                      <Rate
                        key={i}
                        starId={i}
                        rating={hoverRating || rating}
                        onMouseEnter={() => setHoverRating(i)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(i)}
                      />
                    ))}

                  </div>

                  <div className="progressbar">
                    <div className="progressbar-cover" style={{ width: `${percentage}%` }}>

                    </div>
                  </div>

                  <div className="share-group">
                    <button disabled={maxChar} style={maxChar ? { opacity: .4 } : {}} className="submit-btn" type="submit">Send</button>
                  </div>
                </div>

              </form>
            </div>


          </div>
        </div>
      </div>
    </Fragment>



  )
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, null)(BewertungSchreiben);