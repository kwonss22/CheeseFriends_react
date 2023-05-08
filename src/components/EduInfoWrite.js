import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './asset/css/LectureWrite.css';

import axios from "axios";


export default function EduInfoWrite() {

    const [subject, setSubject] = useState('');
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const login = JSON.parse(localStorage.getItem("login"));
    const userName = login.name;

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(URL.createObjectURL(file));
      };

    const navigate = useNavigate();

   
    const resetBtn = () => {
        navigate('/cheesefriends/learning/EduInfoList');
    }

      // download
    const download = async () => {
    let filename = "zoom.txt";

    const url = "http://localhost:3000/fileDownload?filename=" + filename;

    // react에서 window를 붙여줘야 한다
    window.location.href = url;
  }

    const SelectBox = () => {
        return (
            <select onChange={changeSelectOptionHandler} value={subject} style={{marginLeft:"60px", width:"190px", border:"none", borderBottom:"2px solid lightgray"}}>
                <option key="kor" value="국어">국어</option>
                <option key="math" value="수학">수학</option>
                <option key="eng" value="영어">영어</option>
                <option key="social" value="사회">사회</option>
                <option key="sci" value="과학">과학</option>
            </select>
        );
    };

    const changeSelectOptionHandler = (e) => {
        setSubject(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("subject", subject);
        formData.append("title", title);
        formData.append("writer", writer);
        formData.append("content", content);

        
        axios.post('http://localhost:3000/writeEduInfo', formData)

        .then( resp => {
            console.log(resp);
            alert('성공적으로 등록되었습니다');

            navigate('/cheesefriends/learning/EduInfoList');
            })
        .catch(err => console.log(err));
        

        axios.post('http://localhost:3000/writeEduInfo', null, { params: {
                subject,
                title,
                writer:userName,
                content
        }})
            .then( resp => {
            console.log(resp);
            navigate('/cheesefriends/learning/EduInfoList');
            })
            .catch(err => console.log(err));

    }
    

   
    return (
        <div className='edumain'>
            <h2>교육 정보 작성</h2>
            <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
            <>
            제목
            <input type="text" id='title' className='title' name='title'
                value={title} onChange={(e) => setTitle(e.target.value)} />
            </>
            <hr/>
            <>
            과목
            <SelectBox />
            </>
            <hr/>
            <>
            작성자
            <input type="text" id='writer' className='writer' name='writer'
                value={userName} onChange={(e) => setWriter(e.target.value)} />
            </>
            <hr/>
            <>
            내용
            </>
            <input type="file" name="uploadFile" className='file' accept="*" onChange={handleFileSelect} />
            <br />
            <div className='efile'>
            {selectedFile && <img src={selectedFile} id="previewImage" alt="미리보기" style={{ maxWidth: "300px", marginTop:"13px" }} />}
            <textarea id='content' className='educontent' name='content'
                value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className='btnwrapper'>
            <button type='button' onClick={resetBtn} style={{marginRight:"17px"}}>취소</button>
            <button type='submit' value='file upload'>등록</button>
            </div>
            </form>
        </div>
    )
}



