import React, { useState, Fragment, useEffect } from 'react';
import Rate from '../components/Rate';
import Star from '../components/Star';
import '../css/bewertung.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux';
import Pagination from '../components/Pagination'

const Bewertung = ({ user }) => {

  const stars = [1, 2, 3, 4, 5];
  const [listings, setListings] = useState([]);
  const [count, setCount] = useState(0);
  const [previous, setPrevious] = useState('');
  const [next, setNext] = useState('');
  const [active, setActive] = useState(1);



  const visitPage = (page) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/comments/?limit=3&offset=${(page - 1) * 3}&page=${page}`)
      .then(res => {
        setListings(res.data.results);


        if (res.data.previous) {
          setPrevious(res.data.previous);
        }


        if (res.data.next) {
          setNext(res.data.next);
        }


        setActive(page);
      })
      .catch(err => {

      });
  };

  const previous_number = () => {
    axios.get(previous)
      .then(res => {
        setListings(res.data.results);
        setPrevious(res.data.previous);
        setNext(res.data.next);
        if (previous)
          setActive(active - 1);
      })
      .catch(err => {

      });
  };

  const next_number = () => {
    axios.get(next)
      .then(res => {
        setListings(res.data.results);
        setPrevious(res.data.previous);
        setNext(res.data.next);
        if (next)
          setActive(active + 1);
      })
      .catch(err => {

      });
  };


  useEffect(() => {

    const updateList = async () => {

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/?page=1`);
        setListings(res.data.results);
        setCount(res.data.count);
        setPrevious(res.data.previous);
        setNext(res.data.next);
      }
      catch (err) {
        console.log("err", err)
      }
    }
    updateList();

  }, []);

  const Delete = (id) => {

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
      }
    }
    try {
      console.log('id', id)
      return axios.delete(`http://127.0.0.1:8000/api/comments/delete/${id}`, config).then((res) => { alert(res) }, (error) => { alert("error" + error) });

    } catch (error) {
      alert(error)

    }
  };
  return (
    <Fragment>

      <div className="container-bewertung">
        <div className="container-bewertung-title" >

          <h2 >Bewertungen</h2>
          <Link className="container-bewertung-link" to='bewertung-schreiben'>Geben Sie Ihre Bewertung ein!</Link>
        </div>

        <div className="reviews-list">
          {listings.map((item, index) => {
            return (
              <div key={index + 1} className="review-card-bewertung">
                <div className="review-header-bewertung">
                  <div className="name-group">

                    <p>{item.first_name} {item.last_name}</p>
                  </div>
                  <div className="flex-container">
                    {stars.map((star, i) => (<Star key={i} starId={i} rating={item.ratings} />))}
                  </div>
                </div>
                <div className="review-description-bewertung">
                  {item.comments}
                </div>
                <div className="review-details-bewertung">
                  <div className="review-date">{item.date_published}</div>
                  <div className="share-group">


                    {user && user.id == item.author ? (<form onSubmit={() => (Delete(item.id))} className="comment-form">

                      <button className="delete-btn" type="submit">Delete</button>
                    </form>) : null}

                  </div>
                </div>
              </div>)
          })}


          <div className='row'>

            <Pagination
              itemsPerPage={3}
              count={count}
              visitPage={visitPage}
              previous={previous_number}
              next={next_number}
              active={active}
              setActive={setActive}
            />

          </div>

        </div>



      </div>




    </Fragment>




  )
};

const mapsProspsToSTate = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

export default connect(mapsProspsToSTate, null)(Bewertung);