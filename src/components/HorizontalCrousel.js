import React, { Component } from 'react'

import Card from './Card';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { FiArrowRightCircle } from 'react-icons/fi';
class HorizontalCrousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current_card: 1,
            images: [{ 'src': '/images/house_17.jpeg', 'title': 'image title', 'description': 'image description' },
            { 'src': '/images/house_18.jpeg', 'title': 'image title', 'description': 'image description' },],
            image_width: 700,
            image_size_width_percentage: 100

        }
    }

    componentWillMount() {

        const image_size_width_percentage = (styles.media.max_image_size / window.screen.availWidth) * 100;

        this.setState({ image_size_width_percentage: image_size_width_percentage })

    }

    componentDidMount() {

        this.view_port.style.width = `${this.state.image_size_width_percentage}%`

        const image_width_in_pixel = this.card_container.children[0].getBoundingClientRect().width;

        let first_card_clone = this.card_container.children[0].cloneNode(true);
        let last_card_clone = this.card_container.children[this.card_container.children.length - 1].cloneNode(true);
        this.card_container.insertBefore(last_card_clone, this.card_container.children[0]);
        this.card_container.append(first_card_clone)
        this.card_container.style.transitionDuration = '0.0s';
        this.card_container.style.transform = `translate(-${image_width_in_pixel}px)`;


        window.addEventListener('resize', () => {
            const image_width_in_pixel = this.card_container.children[0].getBoundingClientRect().width;
            this.card_container.style.transitionDuration = '0.0s';
            this.card_container.style.transform = `translate(-${image_width_in_pixel * this.state.current_card}px)`;

        })
    }

    handle_previous = () => {
        if (this.state.current_card > 0) {

            let new_card_nr = this.state.current_card - 1;
            const image_width_in_pixel = this.card_container.children[0].getBoundingClientRect().width;


            this.setState({
                current_card: new_card_nr

                ,
            }, () => {
                this.card_container.style.transitionDuration = '.5s';
                this.card_container.style.transform = `translate(${-image_width_in_pixel * this.state.current_card}px)`;
                if (this.state.current_card === 0) {
                    setTimeout(() => {
                        this.card_container.style.transitionDuration = '0.0s';
                        this.card_container.style.transform = `translate(${-image_width_in_pixel * (this.card_container.children.length - 2)}px)`;
                        this.setState({ current_card: this.card_container.children.length - 2 })
                    }, 502)
                }
            })
        }
        else {
            return;
        }
    }
    handle_next = () => {
        if (this.state.current_card < this.card_container.children.length - 1) {
            const vw_convert_to_pixel = (this.state.image_size_width_percentage * window.screen.availWidth) / 100;
            const image_width_in_pixel = this.card_container.children[0].getBoundingClientRect().width;
            let new_card_nr = this.state.current_card + 1
            this.setState({ current_card: new_card_nr }, () => {
                this.card_container.style.transitionDuration = '.5s';
                this.card_container.style.transform = `translate(${-vw_convert_to_pixel * this.state.current_card}px)`;
                if (this.state.current_card === this.card_container.children.length - 1) {
                    setTimeout(() => {
                        this.card_container.style.transitionDuration = '1s';
                        this.card_container.style.transform = `translate(-${image_width_in_pixel})`;
                        this.setState({ current_card: 1 })
                    }, 502)


                }

            })
        }
        else {
            return;

        }
    }

    render() {
        return (
            <div ref={ref_id => this.view_port = ref_id} className="view-port" style={styles.view_port}>
                <div className=" right-left-button" style={styles.button_division}>
                    <button onClick={this.handle_previous} style={styles.button_division_button} ><  FiArrowLeftCircle style={styles.button_division_button_icon} /></button>
                    <button onClick={this.handle_next} style={styles.button_division_button} ><FiArrowRightCircle style={styles.button_division_button_icon} /></button>
                </div>
                <div ref={ref_id => this.card_container = ref_id} className="card-container" style={styles.card_container}>
                    {this.state.images.map((photo, index) => {

                        return (<Card card_nr={photo} resize_width={this.state.image_size_width_percentage} />)
                    })}
                </div>

            </div>
        )
    }


}
const styles = {
    view_port: {
        position: 'absolute',
        top: '30%',
        left: '50%',

        height: '200px',
        backgroundColor: 'red',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
        boder: '5px solid red'
    },
    card_container: {
        display: 'flex',
        flexDirection: 'row',
        width: 'fit-content'

    },
    button_division: {
        position: 'absolute',
        width: '100%',
        height: "100%",

        zIndex: "200",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    button_division_button: {
        border: 'none',
        padding: '10px',
        outline: 'none',
        width: '50px',
        height: '50px',
        color: 'white',
        backgroundColor: 'rgba(255,255,255,0)'

    },
    button_division_button_icon: {
        width: "100%",
        height: "100%"
    },
    media: {
        max_image_size: 1489,
    }

}

export default HorizontalCrousel;
