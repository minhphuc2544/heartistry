import { useRef, useState } from "react";
import "../styles/FlashCard.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function FlashCard() {
    // for API's purpose
    const navigate = useNavigate();
    const WORDSET_PAGE_SIZE = 3;
    const [wordSetPage, setWordSetPage] = useState(0); // page number of wordset
    const [wordSets, setWordSets] = useState([]); // list of response wordsets
    const [wsLastPage, setWsLastPage] = useState(0); // last page number (0-base index)
    const [learningWordSet, setLearningWordSet] = useState({});  // opening wordset (click "Learn" button)
    const [wsCreateSignal, setWsCreateSignal] = useState(false); // signal to create wordset
    const [updatePageSignal, setUpdatePageSignal] = useState(false); // signal to update current page
    // for UI's purpose
    const [isWordSetOpen, setWordSetOpen] = useState(false); //check if word set is opened
    const [isAddNewWord, setAddNewWord] = useState(false); //check if user is adding new word to word set
    const [isCreateSet, setCreateSet] = useState(false); // check if user is creating word set
    const [isPreviewRcmWS, setPreviewRcmWS] = useState(false); //check if user is preview recomment word set

    // check if the access token is expired, if so, force the user to login again
    useEffect(() => {
        const access_token = Cookies.get('access_token');
        if (!access_token) {
            navigate('/login');
        }
    }, []);

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
    }, [wordSetPage, updatePageSignal])

    return (
        <>
            <div className="flashcard" style={isWordSetOpen || isCreateSet ? { opacity: 0.1 } : {}}  >
                <div className="upper">

                    <div className="wordSets">
                        <div style={{ display: "flex" }}>
                            <h1 className="title">Word Sets</h1>
                            <div className="moveList"> {/*add type for button: move list of wordsets if there are more wordsets than the numbers of wordsets tha the area can show (currently: 4) */}
                            <input type="image" src="../disabled_leftArrow.svg" onClick={ () => wordSetPage > 0 && setWordSetPage(wordSetPage - 1) }></input>
                            <p style={{ display: "inline" }}>{ wordSetPage + 1 }</p>
                            <input type="image" src="../enabled_rightArrow.svg" onClick={ () => wordSetPage < wsLastPage && setWordSetPage(wordSetPage + 1) }></input>
                            </div>
                        </div>

                        <div style={{ display: "flex" }}>
                            <div className="createSet">
                                <input type="image" id="create" src="./add_wordset.svg" onClick={() => setCreateSet(true)}></input>
                            </div>
                            { wordSets.length ? wordSets.map((v, i) => <WordSetCard key={i} wordSetInfo={v} setWordSetOpen={setWordSetOpen} setLearningWordSet={setLearningWordSet} />) : <p>There's no wordsets</p> }
                        </div>
                    </div>



                    <div className="userInfo">
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

                <h1 className="rcmTitle">Our recommend word sets</h1>
                <div className="rcmWordSets">
                    <div style={{ display: "flex" }}>

                        <div className="rcmSet">
                            <p className="topic">Education</p>
                            <p className="wordNumbers">Number of words: $(NoW)</p>  {/*show number of words in this wordset*/}
                            <div style={{ display: "flex", justifyContent: "right", marginTop: 35, marginRight: 10 }}>
                                <input type="image" id="add" className="rcmButton" src="./preview.svg" style={{ padding: 10 }} onClick={() => { setPreviewRcmWS(true) }}></input>
                                <input type="image" id="preview" className="rcmButton" src="./add_wordset.svg" style={{ padding: 5 }}></input>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <WordSetPopUp learningWordSet={learningWordSet} isWordSetOpen={isWordSetOpen} setWordSetOpen={setWordSetOpen} setAddNewWord={setAddNewWord} />
            <CreateWordSet setUpdatePageSignal={setUpdatePageSignal} wsCreateSignal={wsCreateSignal} setWsCreateSignal={setWsCreateSignal} isCreateSet={isCreateSet} setCreateSet={setCreateSet} />
            <AddNewWord isAddNewWord={isAddNewWord} setAddNewWord={setAddNewWord} />
            <PreviewRcmWordSet isPreviewRcmWS={isPreviewRcmWS} setPreviewRcmWS={setPreviewRcmWS} />
        </>
    );
}

function WordSetPopUp({ learningWordSet, isWordSetOpen, setWordSetOpen, setAddNewWord }) {
    // for API's purpose
    const WORD_PAGE_SIZE = 10;
    const [wordPage, setWordPage] = useState(0); // word page number
    const [words, setWords] = useState([]); // list of words
    const [wLastPage, setWLastPage] = useState(0); // last word page number (0-base index)
    // for UI's purpose
    const [isEditWordSet, setWordSetEdit] = useState(false); // check if user is editing word set
    const [isVisible, setVisible] = useState(true); //show info and button before learn words in word set
    const [isTurn, setTurn] = useState(false); // to change the info on the card when user click (flip the card)

    // useEffect uses to get word page
    useEffect(() => {
        async function getWordPage() {
            // reset the words list for not caching
            setWords([]);

            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/words/${learningWordSet.id}/pagination?page=${wordPage}&pageSize=${WORD_PAGE_SIZE}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                }
            });

            const responseJson = await response.json();

            setWords(responseJson.response);
            setWLastPage(Math.ceil(responseJson.pagination.total / WORD_PAGE_SIZE) - 1);
        }

        // set words if the edit page is opened
        if (isEditWordSet) {
            getWordPage();
            return;
        }

        // set words to empty if the edit page is closed
        setWords([]);
    }, [isEditWordSet, wordPage])

    return (<>
        {
            isWordSetOpen &&
            <div className="pop_up">
                <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => { setWordSetOpen(false); setVisible(true); setTurn(false); setAddNewWord(false); setWordSetEdit(false); setWordPage(0) }}></input>
                {isVisible ? <>
                    <h1 className="wordSet_topic">{ learningWordSet.topic }</h1>
                    <p className="vcb_count">Vocabulary count: { learningWordSet.noWords }</p>
                    <button className="start" onClick={() => setVisible(false)}>Start</button>
                    <button className="editWordSet" onClick={() => setWordSetEdit(true)}>Edit word set</button>
                </> : <FlipCard learningWordSet={learningWordSet} setTurn={setTurn} />}
                {
                    isEditWordSet && <WordSetEdit learningWordSet={learningWordSet} words={words} wLastPage={wLastPage} wordPage={wordPage} setWordPage={setWordPage} setWordSetEdit={setWordSetEdit} setAddNewWord={setAddNewWord} />
                }
            </div>
        }
    </>)
}

function FlipCard({ learningWordSet, setTurn }) {
    return (
        <div className="card" onClick={() => setTurn(old => !old)}>
            {
                isTurn ? <>
                    <div className="back">
                        <div style={{ display: "flex", justifyContent: "center", fontSize: 40, marginBottom: 20 }}>
                            <p className="word">{  }</p>
                            <p className="wordType">(n)</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <p className="phonetic"><b>Phonetic:</b>{ }/ˈflæʃˌkɑɹd/</p>
                        </div>
                        <p className="meaning"><b>Meaning:</b>{ } Thẻ thông tin</p>
                        <p className="definition"><b>Definition:</b>{ } a card with a word or picture on it that is used to help students learn</p>
                        <p className="example"><b>Example:</b>{ } She is learning math with flash cards.</p>
                        <p className="note"><b>Note:</b>{ } Note những điều cần lưu ý về từ</p>
                    </div>
                </> :
                    <>
                        <div className="front">
                            <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 60, wordWrap: "break-word" }}>FlashCard</p>
                        </div>
                    </>
            }
        </div>
    );
}

function WordSetEdit({ learningWordSet, words, wLastPage, wordPage, setWordPage, setWordSetEdit, setAddNewWord }) {
    const [needUpdate, setNeedUpdate] = useState(false); // signal to update words and wordset's topic
    const [changedWords, setChangedWords] = useState([]); // list of changed words
    const changedTopic = useRef(learningWordSet.topic); // change if current wordset's topic changed
    
    // useEffect uses to update changed words
    useEffect(() => {
        async function updateWords(id, word, note) {
            const requestBody = {
                "word": word,
                "note": note,
            }

            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/words/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(requestBody),
            });
        }

        async function updateWordSet(topic) {
            const requestBody = {
                "topic": topic,
            }

            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/wordsets/${learningWordSet.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(requestBody),
            });
        }

        if (needUpdate) {
            for (let word of changedWords) {
                updateWords(word.id, word.word, word.note);
            }
            if (changedTopic.current !== learningWordSet.topic) {
                updateWordSet(changedTopic.current);
            }
            window.alert('Words changed successfully');
        }
        
        setNeedUpdate(false);
    }, [needUpdate])
    
    return (
        <div className="editWS">
            <input
                type="text"
                className="editTopic"
                defaultValue={learningWordSet.topic}
                onChange={(e) => { changedTopic.current = e.target.value }}
            ></input>
            <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
                <input type="image" src="./disabled_leftArrow.svg"  onClick={ () => wordPage > 0 && setWordPage(wordPage - 1) }></input>
                {/* <p style={{ display: "inline" }}>{ page + 1 }</p> */}
                <input type="image" src="./enabled_rightArrow.svg"  onClick={ () => wordPage < wLastPage && setWordPage(wordPage + 1) }></input>
                <p style={{ display: "inline" }}>{ wordPage + 1 }</p>
                <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => { setWordSetEdit(false); setAddNewWord(false) }}></input>
            </div>

            <div className="wordList">
                { words.length ? words.map((v, i) => <WordRow key={i} wordInfo={v} setChangedWords={setChangedWords} />) : <p>There's no word</p> }
            </div>
            <div style={{ display: "flex" }}>
                <button className="editBtn" style={{ backgroundColor: "#81C784" }} onClick={() => { setAddNewWord(true) }}>Add new word</button>
                <button className="editBtn" style={{ backgroundColor: "#FFEB3B" }} onClick={ () => setNeedUpdate(true) }>Apply change</button>
            </div>
        </div>
    );
}

function CreateWordSet({ setUpdatePageSignal, wsCreateSignal, setWsCreateSignal, isCreateSet, setCreateSet }) {
    const [wordSetTopic, setWordSetTopic] = useState(''); // listen to the wordset's topic input

    // useEffect uses to create new wordset
    useEffect(() => {
        async function createWordSet(topic) {
            const requestBody = {
                "topic": topic,
            }

            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/wordsets/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                setUpdatePageSignal(old => !old);
                window.alert("Create wordset successfully");
            }
        }

        if (wordSetTopic) {
            createWordSet(wordSetTopic);
        }
    }, [wsCreateSignal]);

    return (
        <>
            {isCreateSet &&
                <div className="createNewSet">
                    <div>
                        <h1 style={{ display: "flex", margin: 15, fontSize: 25, marginBottom: 30 }}>Create new word set</h1>
                        <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => { { setCreateSet(false) } }}></input>
                    </div>
                    <input type="text" id="createSet" required onChange={ (e) => setWordSetTopic(e.target.value) }></input>
                    <input type="button" id="setName" value={"Create"} onClick={ () => setWsCreateSignal(!wsCreateSignal) }></input>
                </div>
            }
        </>
    )
}

function AddNewWord({ isAddNewWord, setAddNewWord }) {
    return (
        <>
            {
                isAddNewWord &&
                <div className="addNewWord">
                    <div style={{ display: "flex" }}>
                        <input type="text" className="findWord" placeholder="Type the word you want to add"></input>
                        <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => setAddNewWord(false)}></input>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", fontSize: 40, marginTop: 20 }}>
                        <p className="word">Flash card</p>
                        <p className="wordType">(n)</p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <p className="info phonetic"><b>Phonetic:</b>{ }/ˈflæʃˌkɑɹd/</p>
                    </div>
                    <p className="info meaning"><b>Meaning:</b>{ } Thẻ thông tin</p>
                    <p className="info definition"><b>Definition:</b>{ } a card with a word or picture on it that is used to help students learn</p>
                    <p className="info example"><b>Example:</b>{ } She is learning math with flash cards.</p>
                    <div style={{ display: "flex" }}>
                        <p className="info note"><b>Note:</b></p>
                        <input type="text" className="addNote"></input>
                    </div>
                    <input type="button" value={"Add"} className="addWord"></input>
                </div>
            }
        </>
    )
}

function PreviewRcmWordSet({ isPreviewRcmWS, setPreviewRcmWS }) {
    return (
        <>
            {
                isPreviewRcmWS &&
                <div className="preview">
                    <div style={{ display: "flex" }}>
                        <input type="text" className="editTopic" value={"Education"} style={{ pointerEvents: "none" }}></input>
                        <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => setAddNewWord(false)}></input>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
                        <input type="image" src="./disabled_leftArrow.svg"></input>
                        {/* <p style={{ display: "inline" }}>{ page + 1 }</p> */}
                        <input type="image" src="./enabled_rightArrow.svg"></input>
                        <input type="image" className="unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => { setPreviewRcmWS(false) }}></input>
                    </div>
                    <div className="wordList">
                                <div style={{ display: "flex" }}> {/*add this div to add word in this list */}
                                    <input type="text" className="editInfo" defaultValue={"word1"}></input>
                                    <input type="text" className="editInfo" defaultValue={"note1"}></input>
                                    <input type="image" className="deleteWord" src="./unfocused_cancel.svg" style={{ padding: "1px" }}></input>
                                </div>

                            </div>
                            <div style={{ display: "flex" }}>
                                <button className="editBtn" style={{ backgroundColor: "#81C784" }}>Add to your word sets</button>
                            </div>
                </div>
            }
        </>
    )
}

function WordSetCard({ wordSetInfo, setWordSetOpen, setLearningWordSet }) {
    return (
        <div className="set">
            <p className="topic">{wordSetInfo.topic}</p>
            <p className="wordNumbers">Number of words: {wordSetInfo.noWords}</p>  {/*show number of words in this wordset*/}
            <button type="" id="learn" onClick={() => { setWordSetOpen(true); setLearningWordSet(wordSetInfo) }}>Learn</button>  {/*add type for button: begin to learn words in wordset*/}
        </div>
    );
}

function WordRow({ wordInfo, setChangedWords }) {
    const newWord = useRef(wordInfo); // temporary object to store changed word
    const isChanged = useRef(false); // true if onChange event happened, false if onBlur
    const [isDeleted, setDeleted] = useState(false); // true if word needs to be deleted, false if not

    useEffect(() => {
        async function deleteWord() {
            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/words/${wordInfo.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                },
            });

            console.log(await response.json());
        }

        if (isDeleted) {
            deleteWord();
        }
    }, [isDeleted])

    return (<>
        {!isDeleted && <div style={{ display: "flex" }}> {/*add this div to add word in this list */}
            <input
                type="text"
                className="editInfo"
                defaultValue={wordInfo.word}
                required
                onBlur={ (e) => setChangedWords(
                    (old) => {
                        if (isChanged.current) {
                            const exists = old.some(item => item.id === wordInfo.id);
                            newWord.current = {
                                ...newWord.current,
                                word: e.target.value,
                            }
                            isChanged.current = false;
                            if (exists) {
                                return old.map(item => item.id === newWord.current.id ? newWord.current : item);
                            } else {
                                return [...old, newWord.current];
                            }
                        }
                        return old;
                    } 
                )}
                onChange={ () => isChanged.current = true }
            ></input>
            <input
                type="text"
                className="editInfo"
                defaultValue={wordInfo.note}
                required
                onBlur={ (e) => setChangedWords(
                    (old) => {
                        if (isChanged.current) {
                            const exists = old.some(item => item.id === wordInfo.id);
                            newWord.current = {
                                ...newWord.current,
                                note: e.target.value,
                            }
                            isChanged.current = false;
                            if (exists) {
                                return old.map(item => item.id === newWord.current.id ? newWord.current : item);
                            } else {
                                return [...old, newWord.current];
                            }
                        }
                        return old;
                    } 
                )}
                onChange={ () => isChanged.current = true }
            ></input>
            <input type="image" className="deleteWord" src="./unfocused_cancel.svg" style={{ padding: "1px" }} onClick={ () => { setDeleted(true); } }></input>
        </div>}
    </>)
}