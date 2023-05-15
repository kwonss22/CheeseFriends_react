import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheese } from "@fortawesome/free-solid-svg-icons";
import './asset/css/LectureDetail.css';

function EduInfoDetail(){
    let history = useNavigate();
    const[eduDetail, setEduDetail] = useState([]);
    
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const [bbs, setBbs] = useState();
    const [imageUrl, setImageUrl] = useState('');


    // 데이터를 모두 읽어 들일 때까지 rendering을 조절하는 변수
    const [loading, setLoading] = useState(false);

    let params = useParams();
    console.log(params);
    console.log(params.seq);

    const bbsData = async(seq) => {
        const response = await axios.get('http://localhost:3000/getEduInfo', { params:{"seq":seq} });

        console.log("bbs:" + JSON.stringify(response.data));
        setBbs(response.data);

        setLoading(true);   // 여기서 rendering 해 준다
    }

    useEffect(()=>{
        bbsData(params.seq);
    }, [params.seq])

    if(loading === false){
        return <div>Loading...</div>
    }
    
    const edulist = () => {        
        history('/cheesefriends/learning/EduInfoList');
    }

    const updateBbs = () => {
        history("/bbsupdate/" + bbs.seq);
    }


    const download = async () => {
        let filename = "다운로드-1.png";
    
        const url = `http://localhost:3000/fileDownload?filename=${encodeURIComponent(filename)}`;
    
        // react에서 window를 붙여줘야 한다
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
      }


        // 이미지 업로드 input의 onChange
      const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };



    return (
        <div className="lecdeMain">
            <h2 className="lech2">교육정보 상세보기</h2>
            <table className="lectable">
            <tbody>
            <div style={{marginLeft:"140px"}}>
            <tr style={{height:"32px"}}>
                <th  style={{paddingRight:"103px", maxWidth:"200px"}} className="tableth">제목</th>
                <td style={{ textAlign:"left" }}>{bbs.title}</td>
            </tr>
            <tr style={{height:"32px"}}>
                <th className="tableth">과목</th>
                <td style={{ textAlign:"left", minWidth:"800px" }}>{bbs.subject}</td>
            </tr>
            <tr style={{height:"32px"}}>
                <th className="tableth">작성자</th>
                <td style={{ textAlign:"left" }}>{bbs.writer}</td>
            </tr>
            <tr style={{height:"32px"}}>
                <th className="tableth">작성일</th>
                <td style={{ textAlign:"left" }}>{bbs.regdate}</td>
            </tr>
            <tr style={{height:"32px"}}>	
                <td colSpan="2" style={{ backgroundColor:'white', wordBreak:"break-all", width:"1000px" }}>
                {/* <button onClick={download} style={{backgroundColor:'white', paddingTop:"10px", width:"133px", fontWeight:"bold", color:"#fbca73"}}><FontAwesomeIcon icon={faCheese} color="#fbca73" /> 첨부파일</button> */}
                <img src='./img/eduinfo-1.png'></img>
                    {imageUrl && <img src={imageUrl} alt="미리보기" style={{ maxWidth: "300px" }} />}
                    <pre id="content" style={{ fontSize:'20px', fontFamily:'고딕, arial', backgroundColor:'white', textAlign:"left", width:"1000px", whiteSpace:"pre-wrap"}}>{bbs.content}</pre>
                </td>
            </tr>
            </div>
            </tbody>
            </table>
            <div style={{textAlign:"center"}}>
                <button style={{width:"100px", height:"42px"}} type="button" onClick={edulist}  className="leclistBtn">목록으로</button>
            </div>
            
        </div>
    )
}

export default EduInfoDetail;

