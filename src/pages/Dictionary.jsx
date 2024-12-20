import { useState, useEffect } from "react";
import "../styles/Dictionary.css"
import Cookies from "js-cookie";

export default function Dictionary() {
    // for UI's purpose
    const [isAddToWordSet, setAddToWordSet] = useState(false); //check if user add word to word set
    // for API's calling purpose
    const [wordToSearch, setWordToSearch] = useState('');
    const [foundWord, setFoundWord] = useState({ isFound: false }); // the word that'll be found using free dictionary api

    // useEffects use to display info of the searched word
    useEffect(() => {
        async function findWord() {
            // call api
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`, {
                method: 'GET'
            });

            // check if word is valid
            if (response.ok) {
                const responseJson = await response.json();
                const firstWord = responseJson[0];
                const firstMeaning = firstWord.meanings[0];
                const firstDefinition = firstMeaning.definitions[0];

                setFoundWord({
                    word: firstWord.word,
                    phonetic: firstWord.phonetic,
                    partOfSpeech: firstMeaning.partOfSpeech,
                    definition: firstDefinition.definition,
                    example: firstDefinition.example,
                    isFound: true,
                });

                return;
            }

            // handle if word is invalid
            setFoundWord({
                isFound: false,
            });
        }

        // if wordToSearch is not empty
        if (wordToSearch) {
            findWord();
            return;
        }

        // if wordToSearch is empty
        setFoundWord({
            isFound: false,
        });
    }, [wordToSearch])

    return (
        <div className="dictionary">

            <div style={{ display: "flex" }}>
                <input type="text" className="searchBar" placeholder="Search" onChange={ (e) => setWordToSearch(e.target.value) }></input>
                <div className="dictionaryUserInfo">
                    <img className="userPicture" src="./logo.svg"></img> {/*user avatar*/}
                    <p className="username">Heartistry</p> {/*username*/}
                    <div className="duration">
                        <div style={{ display: "block", margin: 20 }}>
                            <p>Words</p>
                            <p>100</p>
                        </div>
                        <div className="dashboard_separator"></div>
                        <div style={{ display: "block", margin: 20 }}>
                            <p>Days</p>
                            <p>90</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="searchResult">
                { foundWord.isFound &&
                    <>
                        <div style={{ display: "flex", width: "940px", justifyContent: "center", fontSize: "45px" }} >
                            <p className="word">{ foundWord.word }</p>
                            <p style={{ whiteSpace: "pre" }}> (</p>
                            <p className="partOfSpeech">{ foundWord.partOfSpeech }</p>
                            <p>)</p>
                        </div>
                        <br></br>
                    </>
                }
                { foundWord.isFound && foundWord.phonetic &&
                    <>
                        <div style={{ display: "flex" }}>
                            <p style={{ whiteSpace: "pre", fontSize: "40px", color: "" }}>Phontetic: </p>
                            <p className="phonetics part">{ foundWord.phonetic }</p>
                        </div>
                        <br></br>
                    </>
                }
                { foundWord.isFound &&
                    <>
                        <div style={{ display: "flex" }}>
                            <p style={{ whiteSpace: "pre", fontSize: "40px", color: "" }}>Definition: </p>
                            <p className="definition part">{ foundWord.definition }</p>
                        </div>
                        <br></br>
                    </>
                }
                { foundWord.isFound && foundWord.example &&
                    <div style={{ display: "flex" }}>
                        <p style={{ whiteSpace: "pre", fontSize: "40px", color: "" }}>Example: </p>
                        <p className="example part">{ foundWord.example }</p>
                    </div>
                }
                <button className={ foundWord.isFound ? "addToWordSet" : "addToWordSet-disable"} onClick={() => setAddToWordSet(true)}>Add to word set</button>
            </div>
            <AddWordToWortSet wordToSearch={wordToSearch} isAddToWordSet={isAddToWordSet} setAddToWordSet={setAddToWordSet} />
        </div>
    );
}

function AddWordToWortSet({ wordToSearch, isAddToWordSet, setAddToWordSet }) {
    const WORDSET_PAGE_SIZE = 5;
    const [wordSetPage, setWordSetPage] = useState(0); // page number of wordset
    const [wordSets, setWordSets] = useState([]); // list of response wordsets
    const [wsLastPage, setWsLastPage] = useState(0); // last page number (0-base index)
    const [updateWsListSignal, setUpdateWsListSignal] = useState(false); // signal to update Word Set list after adding new word

    // useEffect uses to get a page of wordset
    useEffect(() => {
        async function getWordSetPage() {

            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/wordsets/me/pagination?page=${wordSetPage}&pageSize=${WORDSET_PAGE_SIZE}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                }
            });

            const responseJson = await response.json();

            setWordSets(responseJson.response);
            setWsLastPage(Math.ceil(responseJson.pagination.total / WORDSET_PAGE_SIZE) - 1);
        }

        getWordSetPage()
    }, [wordSetPage, updateWsListSignal])

    return (
        <>
            {
                isAddToWordSet &&
                <div className="chooseWordSet">
                    <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => { setAddToWordSet(false) }}></input>
                    <h1 style={{ textAlign: "center", fontSize: "45px", fontFamily: "cursive" }}>Add word to word set</h1>
                    <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
                        <input type="image" src="./disabled_leftArrow.svg" onClick={() => wordSetPage > 0 && setWordSetPage(wordSetPage - 1)}></input>
                        <p style={{ display: "inline", marginTop: "auto", marginBottom: "auto" }}>{wordSetPage + 1}</p>
                        <input type="image" src="./enabled_rightArrow.svg" onClick={() => wordSetPage < wsLastPage && setWordSetPage(wordSetPage + 1)}></input>
                    </div>
                    { wordSets.length ? wordSets.map((v, i) => <WordSetRow key={i} setUpdateWsListSignal={setUpdateWsListSignal} wordToSearch={wordToSearch} wordSetInfo={v} />) : <p className="no-ws-text">There's no wordsets</p> }
                </div>
            }
        </>
    );
}

function WordSetRow({ setUpdateWsListSignal, wordToSearch, wordSetInfo }) {
    const [needAdd, setNeedAdd] = useState(false);
    const [isAdded, setAdded] = useState(false);

    // useEffect uses to add new word to database
    useEffect(() => {
        async function addWord() {
            const requestBody = {
                "idWordSet": wordSetInfo.id,
                "word": wordToSearch,
                "note": "",
            }

            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/words/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                setAdded(true);
                setUpdateWsListSignal(old => !old);
            }
        }

        if (needAdd) {
            addWord();
        }
    }, [needAdd])

    return (
        <div className="wordsetList"> {/*  add this one to add more word sets, 5 word sets per pages */}
            <div className="wordsetInfo">
                <p className="wordsetName" style={{ fontSize: "35px" }}>{ wordSetInfo.topic }</p>
                <p className="wordsetWordNumber">Number of Words: { wordSetInfo.noWords }</p>
            </div>
            <button className={ isAdded ? "added" : "add" } onClick={ () => setNeedAdd(true) }>{ isAdded ? "Added" : "Add" }</button>
        </div>
    );
}