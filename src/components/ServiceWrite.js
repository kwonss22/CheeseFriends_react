import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './asset/css/LectureWrite.css'

export default function ServiceWrite() {

    const [topic, setTopic] = useState('');
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');

    const login = JSON.parse(localStorage.getItem("login"));
    const userName = login.name;

    const navigate = useNavigate();

    const resetBtn = () => {
        navigate('/cheesefriends/service/ServiceList');
    }

    const SelectBox = () => {
        return (
            <select onChange={changeSelectOptionHandler} value={topic} className='inputsubject'>
                <option key="frequently" value="frequently">자주묻는질문</option>
                <option key="userInfo" value="userInfo">개인정보</option>
                <option key="useLect" value="useLect">강의이용</option>
                <option key="player" value="player">학습플레이어</option>
                <option key="mobile" value="mobile">모바일/기타</option>
            </select>
        );
    };

    const changeSelectOptionHandler = (e) => {
        setTopic(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("topic", topic);
        formData.append("title", title);
        formData.append("writer", writer);
        formData.append("content", content);

        
        axios.post('http://localhost:3000/writeService', formData)

        .then(resp => {
            console.log(resp);
            alert('성공적으로 등록되었습니다');

            navigate('/cheesefriends/service/ServiceList');
        })
        .catch(function(error){
            alert('게시물 등록에 실패했습니다');
         });

         axios.post('http://localhost:3000/writeService', null, { params: {
            topic,
            title,
            writer:userName,
            content
    }})
        .then( resp => {
        console.log(resp);
        navigate('/cheesefriends/service/ServiceList');
        })
        .catch(err => console.log(err));


    
    }
    return (
        <div className='lecwritemain'>
            <h2 className='lecmainh2' >고객센터 문의하기</h2>
            <form name="frm" style={{marginTop:"13px"}} onSubmit={onSubmit} encType="multipart/form-data">
            <>
            제목
            <input type="text" id='title' className='inputtitle' name='title'
                value={title} style={{marginLeft:"99px"}} onChange={(e) => setTitle(e.target.value)} />
            </>
            <br/>
            <>
            카테고리
            <SelectBox />
            </>
            <br/>
            <>
            작성자
            <input type="text" id='writer' style={{marginLeft:"77px"}} className='inputwriter' name='writer'
                value={userName} onChange={(e) => setWriter(e.target.value)} />
            </>
            <br/>
            <textarea id='content' style={{marginLeft:"131px", width:"954px"}} className='lecontent' name='content'
                value={content} onChange={(e) => setContent(e.target.value)} />

            <div className='btnwrapper'>
                <button type='button' className='resetbtn' style={{borderRadius:"4px"}} onClick={resetBtn}>취소</button>
                <button type='submit' className='submitbtn' style={{marginLeft:"15px"}} value='file upload'>등록</button>
            </div>
            </form>
        </div>
    )
  }

