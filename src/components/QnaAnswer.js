import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams, Link } from 'react-router-dom';

import styles from './asset/css/qnawrite.module.css'

function QnaAnswer(){
    const login = JSON.parse(localStorage.getItem("login"));

    const [qna, setQna] = useState({
        topic : "",
        writer : "",
        regdate : "",
        title : "",
        content : "",
    });
    const [answer, setAnswer] = useState({
        writer : "",
        regdate : "",
        title : "",
        content : "",
    });
    const [answerChange, setAnswerChange] = useState(false);

    const navigate = useNavigate();

    let params = useParams();
    console.log(params.subCode);

    // 문의글 뿌려주기
    const getQnaData = async(seq) => {
        const response = await axios.get("http://localhost:3000/getQna", {params:{"seq":seq}})
            console.log(response.data);
            setQna({
                topic : response.data.topic,
                writer : response.data.writer,
                regdate : response.data.regdate,
                title : response.data.title,
                content : response.data.content,
            });
    }
    // 답글 뿌려주기
    const getAnswerData = async(seq) => {
        const response = await axios.get("http://localhost:3000/getAnswer", {params:{"getQnaSeq":seq}})
            console.log(response.data);
            setAnswer({
                writer : response.data.writer,
                regdate : response.data.regdate,
                title : response.data.title,
                content : response.data.content,
            });
    }
    
    useEffect(()=>{
        getQnaData(params.seq);
        getAnswerData(params.seq);
    }, [params.seq]);

    function handleButtonClick() {
        setAnswerChange(true);
    }
    function handleResetClick() {
        window.location.reload();
        setAnswerChange(false);
    }


    function sendAnswer(){
        let answerData = null;
        if(answer.title === null || answer.title === "") {
            alert("답변제목을 입력해주세요");
            return;
        } else if (answer.content === null || answer.content === "") {
            alert("답변내용을 입력해주세요");
            return;
        } else {
            answerData = {
                getQnaSeq :params.seq, 
                topic :qna.topic, 
                title :answer.title, 
                content :encodeURIComponent(answer.content),
                writer: login.id,
            }
        }
        axios.post("http://localhost:3000/answerWrite", null, {params: answerData})
        .then(function(resp){
            if(resp.data !== null && resp.data !== "" && resp.data === "success"){
                alert("답변이 등록되었습니다");
                console.log(resp.data);
                window.location.reload();
            }else if(resp.data !== null && resp.data !== "" && resp.data === "fail"){
                alert("입력칸을 확인해주십시오")
            }
        })
        .catch(function(err){
            alert(err);
        })
    }

    function updateAnswer(){
        let answerData = null;
        if(answer.title === null || answer.title === "") {
            alert("답변제목을 입력해주세요");
            return;
        } else if (answer.content === null || answer.content === "") {
            alert("답변내용을 입력해주세요");
            return;
        }else{
            answerData = {
                getQnaSeq :params.seq,
                title :answer.title, 
                content :answer.content,
                writer: login.id,
            }
        }
        axios.post("http://localhost:3000/answerUpdate", null, {params: answerData})
        .then(function(resp){
            if(resp.data !== null && resp.data !== "" && resp.data === "success"){
                alert("답변이 수정되었습니다");
                setAnswerChange(false);
                window.location.reload();
            }else if(resp.data !== null && resp.data !== "" && resp.data === "fail"){
                alert("입력칸을 확인해주십시오")
            }
        })
        .catch(function(err){
            alert(err);
        })
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.qnaWrap}>
                <h2 className={styles.title}>문의글</h2>
                <div className={styles.InputBox}>
                    <span>작성자</span>
                    <span>{qna.writer}</span>
                </div>
                <div className={styles.InputBox}>
                    <span>문의시간</span>
                    <span>{qna.regdate}</span>
                </div>
                <div className={`${styles.InputBox} ${styles.bottmline}`}>
                    <span>문의제목</span>
                    <span>{qna.title}</span>
                </div>
                <div className={`${styles.InputBox} ${styles.flex}`}>
                    <span>문의내용</span>
                    <p className={styles.width}>{qna.content}</p>
                </div>
            </div>
            {answer.writer !== "admin" ? (
            <div>
                <h2 className={styles.title}>답변</h2>
                <input
                    type="text"
                    className={styles.titleInput}
                    onChange={(e) => setAnswer(prevState => ({...prevState, title: e.target.value}))}
                    placeholder='답변제목'/>
                <textarea
                    className={styles.textarea}
                    onChange={(e) => setAnswer(prevState => ({...prevState, content: e.target.value}))}
                    placeholder='답변내용'></textarea>
            </div>
            ) : 
            (
            !answerChange ? (
            <div className={`${styles.qnaWrap} ${styles.answerMargin}`}>
                <h2 className={styles.title}>답변</h2>
                <div className={styles.InputBox}>
                    <span>작성자</span>
                    <span>{answer.writer}</span>
                </div>
                <div className={styles.InputBox}>
                    <span>답변시간</span>
                    <span>{answer.regdate}</span>
                </div>
                <div className={`${styles.InputBox} ${styles.bottmline}`}>
                    <span>답변제목</span>
                    <span>{answer.title}</span>
                </div>
                <div className={`${styles.InputBox} ${styles.flex}`}>
                    <span>답변내용</span>
                    <p className={styles.width}>{answer.content}</p>
                </div>
            </div>
            ) : (<div>
                <h2 className={styles.title}>답변</h2>
                <input
                    type="text"
                    className={styles.titleInput}
                    defaultValue={answer.title}
                    onChange={(e) => setAnswer(prevState => ({...prevState, title: e.target.value}))}/>
                <textarea
                    className={styles.textarea}
                    onChange={(e) => setAnswer(prevState => ({...prevState, content: e.target.value}))}>{answer.content}</textarea>
            </div>)
            )}

            <div>
            {answer.writer !== "admin" ? (
                <button className={styles.answerBtn} onClick={sendAnswer}>답변하기</button>
            
            ) : (
                !answerChange ? (
                <button className={styles.answerBtn} onClick={handleButtonClick}>답변수정</button>
                ) : (
                    <>
                    <button className={styles.answerBtn} onClick={handleResetClick}>수정취소</button>
                    <button className={styles.answerBtn} onClick={updateAnswer}>수정완료</button>
                    </>

                ))
            }
            <Link to="/adminpage/qnamanage" className={`${styles.answerBtn} ${styles.linkBtn}`}>목록으로</Link>
            </div>
        </div>
    )
}
export default QnaAnswer