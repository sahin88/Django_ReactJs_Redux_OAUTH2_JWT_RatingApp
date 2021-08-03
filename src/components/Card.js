import React from 'react'
import '../css/slider.css'
function Card(props) {
    console.log("kaca aldiysan ucuza almissin", props.resize_width)
    return (
        <div className="image_slider_card" style={{ ...styles.image_slider_card, width: `${props.resize_width}vw` }}>
            <img className="image" src={props.card_nr.src} style={styles.card_image}></img>

        </div >
    )
}

const styles = {

    image_slider_card: {

        height: ' 200px',
        boxSizing: ' border-box',
        fontSize: '2.5em',
        border: '3px solid yellow'
    },

    card_image: {
        width: "100%",
        height: "500px",
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        backgroundRepeat: 'no-repeat',
        objectFit: 'contain',
        objectPosition: 'center center'
    }

}

export default Card;