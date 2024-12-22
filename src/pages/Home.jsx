import { useNavigate } from "react-router-dom";
import "../styles/Home.css"
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Home() {
    // for API's purpose
    const navigate = useNavigate();
    const WORDSET_PAGE_SIZE = 4;
    const [wordSetPage, setWordSetPage] = useState(0); // page number of wordset
    const [wordSets, setWordSets] = useState([]); // list of response wordsets
    const [wsLastPage, setWsLastPage] = useState(0); // last page number (0-base index)
    const [learningWordSet, setLearningWordSet] = useState({}); // opening wordset (click "Learn" button)
    const [updateWsEditSignal, setUpdateWsEditSignal] = useState(false); // signal to update WordSetEdit after adding new word
    // for UI's purpose
    const [isWordSetOpen, setWordSetOpen] = useState(false); //check if word set is opened
    const [isAddNewWord, setAddNewWord] = useState(false); //check if user is adding new word to word set

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
    }, [wordSetPage])

    return (
        <div className="home_home">
            <div className="home_upper">

                <div className="home_wordSets">
                    <div style={{ display: "flex" }}>
                        <h1 className="home_title">Word Sets</h1>
                        <div className="home_moveList"> {/*add type for button: move list of wordsets if there are more wordsets than the numbers of wordsets tha the area can show (currently: 4) */}
                            <input type="image" src="../disabled_leftArrow.svg" onClick={() => wordSetPage > 0 && setWordSetPage(wordSetPage - 1)}></input>
                            <p style={{ display: "inline", margin: "auto" }}>{wordSetPage + 1}</p>
                            <input type="image" src="../enabled_rightArrow.svg" onClick={() => wordSetPage < wsLastPage && setWordSetPage(wordSetPage + 1)}></input>
                        </div>
                    </div>

                    <div style={{ display: "flex" }}>
                        {wordSets.length ? wordSets.map((v, i) => <WordSetCard key={i} wordSetInfo={v} setWordSetOpen={setWordSetOpen} setLearningWordSet={setLearningWordSet} />) : <p className="home_no-ws-text">There is no word set to display </p>}
                    </div>
                </div>
            </div>

            <MyLineChart />

            <WordSetPopUp updateWsEditSignal={updateWsEditSignal} learningWordSet={learningWordSet} isWordSetOpen={isWordSetOpen} setWordSetOpen={setWordSetOpen} setAddNewWord={setAddNewWord} />
            <AddNewWord setUpdateWsEditSignal={setUpdateWsEditSignal} learningWordSet={learningWordSet} isAddNewWord={isAddNewWord} setAddNewWord={setAddNewWord} />
        </div>

    );
}

function MyLineChart({ }) {
    const [data, setData] = useState([]); // data for chart

    // useEffect uses to get data for chart
    useEffect(() => {
        async function getData() {
            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/audit-logs/statistics`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                }
            });

            const responseJson = await response.json();
            // sort the data by date
            const sortedData = responseJson.sort((a, b) => new Date(a.key) - new Date(b.key));
            setData(sortedData);
        }

        getData();
    }, [])

    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart
                data={data}
                margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
            >
                {/* Background grid */}
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

                {/* Horizontal Axis */}
                <XAxis
                    dataKey="key"
                    tick={{ fill: "#333", fontSize: 12 }}
                    axisLine={{ stroke: "#ccc" }}
                    tickLine={{ stroke: "#ccc" }}
                    label={{
                        value: "Time",
                        position: "bottom",
                        offset: 10,
                        style: { fill: "#555", fontWeight: "bold" },
                    }}
                />

                {/* Vertical Axis */}
                <YAxis
                    tick={{ fill: "#333", fontSize: 12 }}
                    axisLine={{ stroke: "#ccc" }}
                    tickLine={{ stroke: "#ccc" }}
                    label={{
                        value: "Words Learned",
                        angle: -90,
                        position: "insideLeft",
                        style: { fill: "#555", fontWeight: "bold" },
                    }}
                />

                {/* Tooltip for interaction */}
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                    }}
                    itemStyle={{ color: "#555" }}
                />

                {/* Legend */}
                <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="square"
                    formatter={(value) => (
                        <span style={{ color: "#555", fontSize: "12px" }}>{value}</span>
                    )}
                />

                {/* Line for the chart */}
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8, stroke: "#8884d8", strokeWidth: 2 }}
                    dot={{ r: 4, fill: "#8884d8" }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

function WordSetPopUp({ updateWsEditSignal, learningWordSet, isWordSetOpen, setWordSetOpen, setAddNewWord }) {
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
    }, [isEditWordSet, wordPage, updateWsEditSignal])

    return (<>
        {
            isWordSetOpen &&
            <div className="home_pop_up">
                <input type="image" className="home_unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => { setWordSetOpen(false); setVisible(true); setTurn(false); setAddNewWord(false); setWordSetEdit(false); setWordPage(0) }}></input>
                {isVisible ? <>
                    <h1 className="home_wordSet_topic">{learningWordSet.topic}</h1>
                    <p className="home_vcb_count">Vocabulary count: {learningWordSet.noWords}</p>
                    <button className="home_start" onClick={() => setVisible(false)}>Start</button>
                    <button className="home_editWordSet" onClick={() => setWordSetEdit(true)}>Edit word set</button>
                </> : <FlipCard learningWordSet={learningWordSet} setTurn={setTurn} isTurn={isTurn} />}
                {
                    isEditWordSet && <WordSetEdit learningWordSet={learningWordSet} words={words} wLastPage={wLastPage} wordPage={wordPage} setWordPage={setWordPage} setWordSetEdit={setWordSetEdit} setAddNewWord={setAddNewWord} />
                }
            </div>
        }
    </>)
}

function FlipCard({ learningWordSet, setTurn, isTurn }) {
    const [foundWord, setFoundWord] = useState({ isFound: false });
    const [curWordIdx, setCurWordIdx] = useState(0);
    const [allWords, setAllWords] = useState([]);

    // useEffect to get all wordset's words
    useEffect(() => {
        async function getAllWords() {
            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/words/${learningWordSet.id}/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                }
            });

            const responseJson = await response.json();
            setAllWords(responseJson);
        }

        getAllWords();
    }, []);

    // useEffect to get word's info
    useEffect(() => {
        async function findWord(wordToFind) {
            // call api
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToFind}`, {
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

        if (allWords.length) {
            findWord(allWords[curWordIdx].word);
        }
    }, [curWordIdx, allWords]);

    // useEffect to make audit log
    useEffect(() => {
        async function makeAuditLog() {
            const requestBody = {
                action: "LEARN",
                entity: "Word",
                entityId: allWords[curWordIdx].id,
                userId: Cookies.get('user_id'),
                username: Cookies.get('username'),
                role: Cookies.get('role'),
                details: `Learned word: ${allWords[curWordIdx].word}`,
            }

            // call api
            const response = await fetch(`${import.meta.env.VITE_TASK_API_BASE_URL}/audit-logs/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('access_token')}`
                },
                body: JSON.stringify(requestBody),
            });
        }

        if (isTurn) {
            makeAuditLog();
        }
    }, [isTurn]);

    return (
        <div className="home_card" onClick={() => {
            isTurn && curWordIdx < allWords.length - 1 && setCurWordIdx(curWordIdx + 1);
            if (curWordIdx < allWords.length - 1) {
                setTurn(!isTurn);
            } else {
                !isTurn && setTurn(!isTurn);
            }
        }}>
            {
                allWords.length ?
                    isTurn ?
                        <div className="home_back">
                            <div style={{ display: "flex", justifyContent: "center", fontSize: 40, marginBottom: 20 }}>
                                <p className="home_word">{allWords[curWordIdx].word}</p>
                                {foundWord.isFound && <p className="home_wordType">({foundWord.partOfSpeech})</p>}
                            </div>
                            <div style={{ display: "flex" }}>
                                {foundWord.isFound && foundWord.phonetic && <p className="home_phonetic"><b>Phonetic:</b> {foundWord.phonetic}</p>}
                            </div>
                            {/* <p className="home_meaning"><b>Meaning:</b>{ } Thẻ thông tin</p> */}
                            {foundWord.isFound && <p className="home_definition"><b>Definition:</b> {foundWord.definition}</p>}
                            {foundWord.isFound && foundWord.example && <p className="home_example"><b>Example:</b> {foundWord.example}</p>}
                            {allWords[curWordIdx].note && <p className="home_note"><b>Note:</b> {allWords[curWordIdx].note}</p>}
                        </div> :
                        <div className="home_front">
                            <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 60, wordWrap: "break-word" }}>{allWords[curWordIdx].word}</p>
                        </div>
                    : <p style={{ textAlign: "center", marginTop: "50%", fontFamily: "cursive", fontSize: "35px" }}>This wordset has no word</p>
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
        <div className="home_editWS">
            <input
                type="home_text"
                className="home_editTopic"
                defaultValue={learningWordSet.topic}
                onChange={(e) => { changedTopic.current = e.target.value }}
            ></input>
            <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
                <input type="image" src="./disabled_leftArrow.svg" onClick={() => wordPage > 0 && setWordPage(wordPage - 1)}></input>
                <p style={{ display: "inline", marginTop: "auto", marginBottom: "auto" }}>{wordPage + 1}</p>
                <input type="image" src="./enabled_rightArrow.svg" onClick={() => wordPage < wLastPage && setWordPage(wordPage + 1)}></input>
                <input type="image" className="home_unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => { setWordSetEdit(false); setAddNewWord(false) }}></input>
            </div>

            <div className="home_wordList">
                {words.length ? words.map((v, i) => <WordRow key={i} wordInfo={v} setChangedWords={setChangedWords} />) : <p className="home_no-w-text">There is no word</p>}
            </div>
            <div style={{ display: "flex" }}>
                <button className="home_editBtn" style={{ backgroundColor: "#81C784" }} onClick={() => { setAddNewWord(true) }}>Add new word</button>
                <button className="home_editBtn" style={{ backgroundColor: "#FFEB3B" }} onClick={() => setNeedUpdate(true)}>Apply change</button>
            </div>
        </div>
    );
}

function AddNewWord({ setUpdateWsEditSignal, learningWordSet, isAddNewWord, setAddNewWord }) {
    const [wordToSearch, setWordToSearch] = useState('');
    const [foundWord, setFoundWord] = useState({ isFound: false }); // the word that'll be found using free dictionary api
    const [addSignal, setAddSignal] = useState(false); // signal to add ne word
    const [note, setNote] = useState(''); // note input of the word

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

        if (wordToSearch) {
            findWord();
            return;
        }

        setFoundWord({
            isFound: false,
        });
    }, [wordToSearch])

    // useEffect uses to add new word to database
    useEffect(() => {
        async function addWord() {
            const requestBody = {
                "idWordSet": learningWordSet.id,
                "word": wordToSearch,
                "note": note,
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
                setAddSignal(false);
                setFoundWord({ isFound: false });
                setAddNewWord(false);
                setUpdateWsEditSignal(old => !old);
            }
        }

        if (foundWord.isFound) {
            addWord();
        }
    }, [addSignal])

    return (
        <>
            {
                isAddNewWord &&
                <div className="home_addNewWord">
                    <div style={{ display: "flex" }}>
                        <input type="text" className="home_findWord" placeholder="Type the word you want to add" onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setWordToSearch(e.target.value);
                            }
                        }}></input>
                        <input type="image" className="home_unfocused_cancel" src="./unfocused_cancel.svg" onClick={() => setAddNewWord(false)}></input>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", fontSize: 40, marginTop: 20 }}>
                        {foundWord.isFound && <p className="home_word"> {foundWord.word}</p>}
                        {foundWord.isFound && <p className="home_wordType"> ({foundWord.partOfSpeech})</p>}
                    </div>
                    <div style={{ display: "flex" }}>
                        {foundWord.isFound && foundWord.phonetic && <p className="home_info home_phonetic"><b>Phonetic:</b> {foundWord.phonetic}</p>}
                    </div>
                    {/* <p className="home_info home_meaning"><b>Meaning:</b>{ foundWord.translatedText }</p> */}
                    {foundWord.isFound && <p className="home_info home_definition"><b>Definition:</b> {foundWord.definition}</p>}
                    {foundWord.isFound && foundWord.example && <p className="home_info home_example"><b>Example:</b> {foundWord.example}</p>}
                    <div style={{ display: "flex" }}>
                        <p className="home_info home_note"><b>Note:</b></p>
                        <input placeholder="Add your note" type="text" className="home_addNote" onChange={(e) => setNote(e.target.value)}></input>
                    </div>
                    <input type="button" value={"Add"} className={foundWord.isFound ? "home_addWord" : "home_addWord-disable"} onClick={() => setAddSignal(!addSignal)}></input>
                </div>
            }
        </>
    )
}

function WordSetCard({ wordSetInfo, setWordSetOpen, setLearningWordSet }) {
    return (
        <div className="home_set">
            <p className="home_topic">{wordSetInfo.topic}</p>
            <p className="home_wordNumbers">Number of words: {wordSetInfo.noWords}</p>  {/*show number of words in this wordset*/}
            <button type="" id="home_learn" onClick={() => { setWordSetOpen(true); setLearningWordSet(wordSetInfo) }}>Learn</button>  {/*add type for button: begin to learn words in wordset*/}
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
        }

        if (isDeleted) {
            deleteWord();
        }
    }, [isDeleted])

    return (<>
        {!isDeleted && <div style={{ display: "flex" }}> {/*add this div to add word in this list */}
            <input
                type="text"
                className="home_editInfo"
                defaultValue={wordInfo.word}
                required
                onBlur={(e) => setChangedWords(
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
                onChange={() => isChanged.current = true}
            ></input>
            <input
                type="text"
                className="home_editInfo"
                defaultValue={wordInfo.note}
                required
                onBlur={(e) => setChangedWords(
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
                onChange={() => isChanged.current = true}
            ></input>
            <input type="image" className="home_deleteWord" src="./unfocused_cancel.svg" style={{ padding: "1px" }} onClick={() => { setDeleted(true); }}></input>
        </div>}
    </>)
}