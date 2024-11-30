// src/components/favouriteBooksjsx
import React, {useState} from 'react';

// Setting the values to blank
function FavouriteBooksPage(){

const [bookOne, setBookOne] = useState("");
const [bookTwo, setBookTwo] = useState("");
const [bookThree, setBookThree] = useState("");

  // These Functions set the new values to each of the above const
function bookOneChoice(event){
    setBookOne(event.target.value); 
}

function bookTwoChoice(event){
    setBookTwo(event.target.value); 
}

function bookThreeChoice(event){
    setBookThree(event.target.value); 
}

function finished(event){}

  // Basic HTML, creating buttons etc
    return (<div>
            {/* Lydia / Emma - mini logo image to be inserted here */}
            <img src="MINI LOGO IMG NAME" alt="This is the mini Bound logo" width="500" height="600"></img>

            <p> WELCOME, {/*insert code for user's name*/}! </p>

            <p> Search for your favourite books and add them to your library.</p>

           {/* Jenni / Jeveria - code to create a changing number to be added here */}

            {/* Jenni / Jeveria - code to add books one, two and three needs to be corrected */}

            <label>
                <input 
                type="text" 
                value={bookOne} 
                placeholder={"Select your first book"}
                onChange={bookOneChoice}
                />
            </label>

            <br />

            <label>
                <input 
                type="text" 
                value={bookTwo} 
                placeholder={"Select your first book"}
                onChange={bookTwoChoice}
                />
            </label>

            <br />

            <label>
                <input 
                type="text" 
                value={bookThree} 
                placeholder={"Select your first book"}
                onChange={bookThreeChoice}
                />
            </label>

            <br />

            <label>
            <input
                name="finished"
                type="button"
                value="I'M FINISHED"
                onClick={finished}
            />
            </label>

        </div>
        );
}

export default favouriteBooks;