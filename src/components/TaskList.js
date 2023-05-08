import React, { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from 'react-js-pagination';
import { useNavigate, Link } from 'react-router-dom';
import './asset/css/TaskList.css';
import { faAngleRight, faAngleLeft, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function TaskList() {

    const [tasklist, setTaskList] = useState([]);
    const movePage = useNavigate();

    const loginInfo = JSON.parse(localStorage.getItem("login"));
    const userId = loginInfo?.id;
    const userAuth = loginInfo?.auth;

    function writelink() {
        movePage('/cheesefriends/learning/TaskWrite');
    }

    
    function getTaskList() {
        axios.get("http://localhost:3000/tasklist")
        .then(function(resp){
            setTaskList(resp.data);
            console.log(resp.data);
            
        })
        .catch(function(err){
            // alert(err);
        })

    }

    useEffect(function(){
        getTaskList(0);
    },[]);
    
 
    const [subList, setSubList] = useState([]);
    const [choice, setChoice] = useState('');
    const [search, setSearch] = useState('');

    //paging
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    function getSubList(choice, search, page){
        axios.get("http://localhost:3000/tasklist", { params:{"choice":choice, "search":search, "pageNumber":page } })
        .then(function(resp) {
          console.log(resp.data);

          setSubList(resp.data.list);
          setTotalCnt(resp.data.cnt);
        })
        .catch(function(err){
                alert(err);
        })
    }

    function searchBtn(){

        getSubList(choice, search, 0);
    }


    function pageChange(page) {
        setPage(page);
        getSubList(choice, search, page-1);
    }

    useEffect(function(){
        getSubList("", "", 0);
    }, []);

    return(

        <div className="tasklist">
            <div style={{marginTop:"-627PX"}}>
                <h2 style={{marginLeft:"42px", color:"#434343", marginTop:"-50px"}}>과제제출</h2>
                <div>
                    {/* {userAuth === 'student' && ( */}
                        <button type="button" className="learnBtn"  onClick={writelink}>
                            글쓰기
                    </button>
                    {/* )} */}
                </div>
            </div>


        {/* 목록 */}
        <div style={{display:"block", width:"1000px", marginTop:"25px", marginLeft:"20px"}}>
        <div style={{display:"flex", marginTop:"-208px", justifyContent:"flex-end"}}>
            
            <select vlaue={choice} onChange={(e)=>setChoice(e.target.value)}
            style={{border:"none", borderBottom:"1px solid lightgray", height:"31px", marginTop:"14px", marginRight:"6px" }}>
                <option value="">검색</option>
                <option value="subject">과목</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
            </select>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} style={{marginTop:"14px", height:"31px"}} placeholder="검색어를 입력하세요"/>
            <button onClick={searchBtn} style={{marginTop:"14px"}} className='searchbtn'>검색</button>
        </div>
            
        <table className="table" style={{marginTop:"28px"}}>
            <thead>
                <tr style={{backgroundColor:"#FFEBB4"}}>
                    <th scope="col">번호</th>
                    <th scope="col">과목</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성일</th>
                    <th scope="col">작성자</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
            {
                subList.map(function(list, i){
                    return (
                        <tr key={i}>
                            <td>{list.seq}</td>
                            <td>{list.subject}</td>
                            <td>
                            <Link style={{textDecoration:"none"}} to={`/cheesefriends/learning/TaskDetail/${list.seq}`}>{list.title}</Link>
                            </td>
                            <td>{list.regdate}</td>
                            <td>{list.writer}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        <br/>
        <Pagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={totalCnt}
                pageRangeDisplayed={10}
                firstPageText={<FontAwesomeIcon icon={faAnglesLeft} />}
                lastPageText={<FontAwesomeIcon icon={faAnglesRight} />}
                prevPageText={<FontAwesomeIcon icon={faAngleLeft} />}
                nextPageText={<FontAwesomeIcon icon={faAngleRight} />}
                onChange={pageChange} />

        </div>

</div>
    )
}

