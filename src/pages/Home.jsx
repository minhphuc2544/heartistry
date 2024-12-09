import "../styles/Home.css"

export default function Home() {
    return (
        <div className="home">
            <div className="upper">

                <div className="wordSets">
                    <div style={{ display: "flex"}}>
                        <h1 className="title">Word Sets</h1> 
                        <div className="moveList"> {/*add type for button: move list of wordsets if there are more wordsets than the numbers of wordsets tha the area can show (currently: 3) */}
                            <input type="image" src="../focused_leftArrow.svg"></input>
                            <input type="image" src="../focused_rightArrow.svg"></input>
                        </div>
                    </div>

                    <div style={{ display: "flex" }}>
                        <div className="set">
                            <p className="topic">Education</p>
                            <p className="wordNumbers">Number of words: $(NoW)</p>  {/*show number of words in this wordset*/}
                            <button type="" id="learn">Learn</button>  {/*add type for button: begin to learn words in wordset*/}
                        </div>


                        <div className="set">

                        </div>

                        <div className="set">

                        </div>


                    </div>
                </div>



                <div className="userInfo">

                </div>
            </div>

            <div className="statistic">

            </div>
        </div>
    );
}