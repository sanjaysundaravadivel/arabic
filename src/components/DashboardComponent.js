import React,{useState,useEffect,useRef} from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import "../style/dashboard.scss";
import user from "../img/user.png"
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios, * as others from 'axios';
import menu from "../img/menu (1).png"
import level1 from "../img/level1.png";
import level2 from "../img/level2.png";
import level3 from "../img/level3.png";
import "../style/form.scss";

import { DarkModeContext } from "../context/darkModeContext";
import { useContext } from "react";

import { styled } from '@mui/system';
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from '@mui/base/TablePaginationUnstyled';



const DashboardComponent = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [mainData,setMainData]=useState([{
    id:"",
    status:"",
    data:{
    category:"",
    invono:"",
     submittedDate:"",
     invoiceDate:"",
     address:"",
     total:"",
     headers:[],
     values:[],
     subtotal:"",
     taxamount:"",
     tax:"",
     currency:""
  }
},])
const navigate = useNavigate();

  const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - mainData.length) : 0;

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};


const [dark,setDark]=useState(false);

  const [total,setTotal]=useState(0);
  const [accepted,setAccepted]=useState(0);
  const [rejected,setRejected]=useState(0);
  const [waiting,setWaiting]=useState(0);
  const [curr,setCurr]=useState('');
  const [navopen,setNavopen]= useState(true);
  const dataFetchedRef = useRef(false);

  
  let acc=0;
  let rej=0;
  let wait=0;
  let tot=0;
  useEffect(() => {
  setTotal(tot)
  }, [])
  
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
  
  const [tabdata,setTabdata] = useState({
    id:"",
    status:"",
    data:{
    category:"",
    invono:"",
     submittedDate:"",
     invoiceDate:"",
     address:"",
     total:"",
     headers:[],
     values:[[]],
     subtotal:"",
     taxamount:"",
     tax:"",
     currency:""
  }
});
useEffect( () => {
  async function fetchData() {
    let res={data:[
      {
        id:"",
        status:"",
        data:`{
        category:"",
        invono:"",
         submittedDate:"",
         invoiceDate:"",
         address:"",
         total:"",
         headers:[],
         values:[],
         subtotal:"",
         taxamount:"",
         tax:"",
         currency:""
      }`
    }
    ]}
     res = await axios.get("http://127.0.0.1:5000/request");
     res.data.map((it,index)=>{
     
      if(it.status=="rejected")
      {
        rej=rej+1
      }
      if(it.status=="waiting")
      {
        wait=wait+1
      }
      if(it.status=="accepted"){
        acc=acc+1;
        let temp={
          category:"",
          invono:"",
           submittedDate:"",
           invoiceDate:"",
           address:"",
           total:"",
           headers:[],
           values:[],
           subtotal:"",
           taxamount:"",
           tax:"",
           currency:""

      };
        try {
           temp=JSON.parse(it.data)
        } catch (error) {
          temp=it.data
        }
       
        tot=tot+parseFloat(temp.total)
        setCurr(temp.currency)
        
      }
     })
    setMainData(res.data)
    setTotal(tot)
    setAccepted(acc)
    setRejected(rej)
    setWaiting(wait)
  }
  if (dataFetchedRef.current) return;
  dataFetchedRef.current = true;
  fetchData();
 
 }, [])
  var date = new Date()
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className=' dashboard Body2' >
      
    <div class="wrapper">
 <div class="left-side" style={navopen?{}:{display:"none"}}>
 <button style={{background:"transparent",border:"none",color:"currentColor",marginBottom:"70px",marginTop:"-30px"}} onClick={()=>setNavopen(false)}><svg viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M18 6L6 18M6 6l12 12" />
          </svg>
 </button>
  <svg viewBox="0 1 511 512" fill="currentColor" class="active">
   <path d="M498.7 222.7L289.8 13.8a46.8 46.8 0 00-66.7 0L14.4 222.6l-.2.2A47.2 47.2 0 0047 303h8.3v153.7a55.2 55.2 0 0055.2 55.2h81.7a15 15 0 0015-15V376.5a25.2 25.2 0 0125.2-25.2h48.2a25.2 25.2 0 0125.1 25.2V497a15 15 0 0015 15h81.8a55.2 55.2 0 0055.1-55.2V303.1h7.7a47.2 47.2 0 0033.4-80.4zm-21.2 45.4a17 17 0 01-12.2 5h-22.7a15 15 0 00-15 15v168.7a25.2 25.2 0 01-25.1 25.2h-66.8V376.5a55.2 55.2 0 00-55.1-55.2h-48.2a55.2 55.2 0 00-55.2 55.2V482h-66.7a25.2 25.2 0 01-25.2-25.2V288.1a15 15 0 00-15-15h-23A17.2 17.2 0 0135.5 244L244.4 35a17 17 0 0124.2 0l208.8 208.8v.1a17.2 17.2 0 010 24.2zm0 0" /></svg>
   <div style={{    marginTop: "40px",
    marginBottom: "40px"}} onClick={()=>{
      setDark(!dark)
     if(!dark){
      dispatch({ type: "DARK" })
      console.log("Dark")
     }
     else{
      dispatch({ type: "LIGHT" })
      console.log("Light")
     }
   }}>
  { dark?<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
	 viewBox="0 0 246 246" >
<path d="M189.024,122.5c0,36.188-29.336,65.524-65.524,65.524c-36.188,0-65.524-29.336-65.524-65.524
	c0-36.188,29.336-65.524,65.524-65.524C159.688,56.976,189.024,86.312,189.024,122.5z M122.667,43c4.143,0,7.5-3.357,7.5-7.5v-28
	c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v28C115.167,39.643,118.524,43,122.667,43z M184.444,68.438
	c1.919,0,3.839-0.732,5.304-2.197l14.849-14.85c2.929-2.929,2.929-7.678-0.001-10.606c-2.928-2.928-7.677-2.929-10.606,0.001
	l-14.849,14.85c-2.929,2.929-2.929,7.678,0.001,10.606C180.605,67.705,182.525,68.438,184.444,68.438z M190.366,178.14
	c-2.93-2.928-7.678-2.928-10.607,0c-2.929,2.93-2.929,7.678,0,10.607l14.85,14.85c1.465,1.464,3.385,2.196,5.304,2.196
	s3.839-0.732,5.304-2.196c2.929-2.93,2.929-7.678,0-10.607L190.366,178.14z M57.253,178.759l-14.85,14.85
	c-2.929,2.93-2.929,7.678,0,10.607c1.465,1.464,3.385,2.196,5.304,2.196s3.839-0.732,5.304-2.196l14.85-14.85
	c2.929-2.93,2.929-7.678,0-10.607C64.931,175.831,60.183,175.831,57.253,178.759z M56.634,66.859
	c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196c2.93-2.929,2.93-7.678,0.001-10.606l-14.849-14.85
	c-2.93-2.93-7.679-2.929-10.606-0.001c-2.93,2.929-2.93,7.678-0.001,10.606L56.634,66.859z M238.5,114.5h-7h-21
	c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h21h7c4.143,0,7.5-3.357,7.5-7.5S242.643,114.5,238.5,114.5z M123.667,202
	c-4.143,0-7.5,3.357-7.5,7.5v21v8c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-8v-21C131.167,205.357,127.81,202,123.667,202z
	 M44,123c0-4.143-3.357-7.5-7.5-7.5h-21h-8c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h8h21C40.643,130.5,44,127.143,44,123z"/>

</svg>
:<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	 viewBox="0 0 455 455" fill="currentColor"  >
<g>
	<polygon points="320.18,162.705 280.63,171.052 307.72,201.052 303.437,241.245 340.34,224.751 377.243,241.245 372.96,201.052 
		400.05,171.052 360.5,162.705 340.34,127.67 	"/>
	<polygon points="440,325.677 414.091,320.208 400.883,297.253 387.675,320.208 361.766,325.677 379.513,345.33 376.708,371.661 
		400.884,360.855 425.063,371.661 422.254,345.329 	"/>
	<path d="M218,227.5c0-89.167,51.306-166.338,126-203.64C313.443,8.6,278.978,0,242.5,0C116.855,0,15,101.855,15,227.5
		S116.855,455,242.5,455c36.478,0,70.943-8.6,101.5-23.86C269.306,393.838,218,316.667,218,227.5z"/>
</g>
</svg>
}
   </div>

  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M 4 2 C 2.9 2 2 2.9 2 4 L 2 12 C 2 13.1 2.9 14 4 14 L 10 14 L 10 20 C 10 21.1 10.9 22 12 22 L 20 22 C 21.1 22 22 21.1 22 20 L 22 12 C 22 10.9 21.1 10 20 10 L 14 10 L 14 4 C 14 2.9 13.1 2 12 2 L 4 2 z M 7.1757812 4 L 8.8046875 4 L 11.259766 10.146484 C 10.622151 10.402863 10.149579 10.977115 10.033203 11.671875 L 9.40625 10 L 6.578125 10 L 5.828125 12.015625 L 4 12 L 7.1757812 4 z M 8 6 L 7 9 L 9 9 L 8 6 z M 15.669922 12.001953 C 16.572594 11.966064 17.150391 12.832031 17.150391 12.832031 L 17.150391 13.208984 C 17.150391 13.208984 16.772578 12.832031 16.017578 12.832031 C 15.806578 12.832031 15.297125 13.0155 15.203125 13.5625 C 15.101125 14.1575 16.128531 14.341797 16.394531 14.341797 C 17.149531 14.341797 17.998047 13.984375 17.998047 13.984375 L 17.4375 16 C 17.4375 16 16.757953 15.357375 15.626953 15.734375 C 14.826953 16.001375 14.683703 17.11575 14.845703 17.46875 C 15.625703 19.17275 19 19 19 19 C 19 19 18.015578 20 16.017578 20 C 14.687578 20 13 19.245328 13 17.736328 C 13 16.227328 14.509766 15.472656 14.509766 15.472656 C 14.509766 15.472656 14.119875 14.931375 14.046875 14.734375 C 13.749875 13.937375 14.131672 12.453172 15.263672 12.076172 C 15.405172 12.029047 15.540969 12.00708 15.669922 12.001953 z"/>
</svg>
  <button
  style={{background:"none",border:"none",marginTop: "190%"}}
  onClick={()=>{
   window.localStorage.clear()
   navigate("/");
   window.location.reload()
  }}><svg viewBox="0 0 512 512" fill="grey">
  <path d="M255.2 468.6H63.8a21.3 21.3 0 01-21.3-21.2V64.6c0-11.7 9.6-21.2 21.3-21.2h191.4a21.2 21.2 0 100-42.5H63.8A63.9 63.9 0 000 64.6v382.8A63.9 63.9 0 0063.8 511H255a21.2 21.2 0 100-42.5z" />
  <path d="M505.7 240.9L376.4 113.3a21.3 21.3 0 10-29.9 30.3l92.4 91.1H191.4a21.2 21.2 0 100 42.6h247.5l-92.4 91.1a21.3 21.3 0 1029.9 30.3l129.3-127.6a21.3 21.3 0 000-30.2z" /></svg>
</button>
  
   </div>
 <div class="main-container">
  <div class="header">
  {
    navopen ?<></> :   <img className='menu' src={menu} style={{cursor:"pointer"}} onClick={()=>{
      setNavopen(true);
    }}/>
  }
   <div class="logo">Digiver
    <span class="logo-det">Z</span></div>
   
   <div class="user-info">
   <Link to="/request" style={{ textDecoration: 'none' }} class="cards-button button" >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
       <path d="M12 5v14M5 12h14" />
      </svg>
      Create New
     </Link>
    <div class="user-name">{localStorage.getItem("name")}</div>
    <svg class="profile" viewBox="-42 0 512 512" fill="currentColor">
     <path d="M210.4 246.6c33.8 0 63.2-12.1 87.1-36.1 24-24 36.2-53.3 36.2-87.2 0-33.9-12.2-63.2-36.2-87.2-24-24-53.3-36.1-87.1-36.1-34 0-63.3 12.2-87.2 36.1S87 89.4 87 123.3c0 33.9 12.2 63.2 36.2 87.2 24 24 53.3 36.1 87.2 36.1zm-66-189.3a89.1 89.1 0 0166-27.3c26 0 47.5 9 66 27.3a89.2 89.2 0 0127.3 66c0 26-9 47.6-27.4 66a89.1 89.1 0 01-66 27.3c-26 0-47.5-9-66-27.3a89.1 89.1 0 01-27.3-66c0-26 9-47.6 27.4-66zm0 0M426.1 393.7a304.6 304.6 0 00-12-64.9 160.7 160.7 0 00-13.5-30.3c-5.7-10.2-12.5-19-20.1-26.3a88.9 88.9 0 00-29-18.2 100.1 100.1 0 00-37-6.7c-5.2 0-10.2 2.2-20 8.5-6 4-13 8.5-20.9 13.5-6.7 4.3-15.8 8.3-27 11.9a107.3 107.3 0 01-66 0 119.3 119.3 0 01-27-12l-21-13.4c-9.7-6.3-14.8-8.5-20-8.5a100 100 0 00-37 6.7 88.8 88.8 0 00-29 18.2 114.4 114.4 0 00-20.1 26.3 161 161 0 00-13.4 30.3A302.5 302.5 0 001 393.7c-.7 9.8-1 20-1 30.2 0 26.8 8.5 48.4 25.3 64.4C41.8 504 63.6 512 90.3 512h246.5c26.7 0 48.6-8 65.1-23.7 16.8-16 25.3-37.6 25.3-64.4a437 437 0 00-1-30.2zm-44.9 72.8c-11 10.4-25.4 15.5-44.4 15.5H90.3c-19 0-33.4-5-44.4-15.5C35.2 456.3 30 442.4 30 424c0-9.5.3-19 1-28.1A272.9 272.9 0 0141.7 338a131 131 0 0110.9-24.7A84.8 84.8 0 0167.4 294a59 59 0 0119.3-12 69 69 0 0123.6-4.5c1 .5 3 1.6 6 3.6l21 13.6c9 5.6 20.4 10.7 34 15.1a137.3 137.3 0 0084.5 0c13.7-4.4 25.1-9.5 34-15.1a2721 2721 0 0027-17.2 69 69 0 0123.7 4.5 59 59 0 0119.2 12 84.5 84.5 0 0114.9 19.4c4.5 8 8.2 16.3 10.8 24.7a275.2 275.2 0 0110.8 57.8c.6 9 1 18.5 1 28.1 0 18.5-5.3 32.4-16 42.6zm0 0" /></svg>
    <div class="hour">{strTime}</div>
   </div>
  </div>
  <div class="user-box first-box">
   
    
   <div class="cards-wrapper" style={{animationDelay:".6s"}}>
    <div class="cards-header">
     <div class="cards-header-date">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
       <path d="M15 18l-6-6 6-6" /></svg>
      <div class="title">Summary</div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
       <path d="M9 18l6-6-6-6" /></svg>
     </div>
    </div>
    <div class="cards card">
    <div class="destination">
     <div class="destination-card">
      <div class="destination-profile">
      Total Claim Requests
      </div>
      <div class="destination-points" style={{    display: "flex",
    alignItems: "center",
    justifyContent: "center"}}>
       <div class="point profile-img" style={{    display: "flex",
    alignItems: "center",
    justifyContent: "center"}}>{accepted+rejected+waiting}</div>
      </div>
     </div>
     <div class="destination-card">
      <div class="destination-profile">
      Total Claim Approved
      </div>
      <div class="destination-points" style={{    display: "flex",
    alignItems: "center",
    justifyContent: "center"}}>
       <div class="point profile-img" style={{    display: "flex",
    alignItems: "center",
    justifyContent: "center"}}>{accepted}</div>
      </div>
     </div>
     <div class="destination-card">
      <div class="destination-profile">
      Total Claim Rejected
      </div>
      <div class="destination-points" style={{    display: "flex",
    alignItems: "center",
    justifyContent: "center"}}>
       <div class="point profile-img" style={{    display: "flex",
    alignItems: "center",
    justifyContent: "center"}}>{rejected}</div>
      </div>
     </div>
     <div class="destination-card">
      <div class="destination-profile" >
      Total Claim Pending
      </div>
      <div class="destination-points" style={{    display: "flex",
    alignItems: "center",
    justifyContent: "center"}}>
       <div class="point profile-img" style={{    display: "flex",
    alignItems: "center",
    justifyContent: "center"}}>{" "}{" "}{" "}{""}{" "}{waiting}</div>
      </div>
     </div>
     
     
    </div>
    
    
     </div>
   </div>
   <div class="account-wrapper" style={{animationDelay:".8s"}}>
    <div class="account-profile">
     <img src={user} alt=""/>
     <div class="blob-wrap">
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
     </div>
     <div class="account-name">{localStorage.getItem("name")}</div>
     <div class="account-title">{localStorage.getItem("role")}</div>
    </div>
    <div class="account card">
     <div class="account-cash">{curr} {total}</div>
     <div class="account-income">Total Claim</div>
    </div>
   </div>
  </div>
  <div class="user-box second-box">
   <div class="cards-wrapper" style={{animationDelay:"1s",marginRight:"10px"}}>
    <div class="cards-header">
     <div class="cards-view">
      
     Requests history 
     
     </div>
   
     
    </div>
    <div class="cards card">
     <table class="table" aria-label="custom pagination table">
      <thead>
       <tr>
        <th>Code</th>
        <th>Date</th>
        <th>Delivery claim</th>
        <th>Amount requested</th>
        <th>Approvers</th>
        <th>Currency</th>
        <th>Status</th>
       </tr>
      </thead>
      <tbody>
       
      {(rowsPerPage > 0 ? mainData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : mainData
          ).
      map((item,index)=>{
      
        let temp={
          category:"",
          invono:"",
           submittedDate:"",
           invoiceDate:"",
           address:"",
           total:"",
           headers:[],
           values:[],
           subtotal:"",
           taxamount:"",
           tax:"",
           currency:""

      };
        try {
           temp=JSON.parse(item.data)
        } catch (error) {
          temp=item.data
        }
       
      
        //item.data=JSON.parse(item.data)
        let it = {
          id:"",
          status:"",
          data:{
          category:"",
          invono:"",
           submittedDate:"",
           invoiceDate:"",
           address:"",
           total:"",
           headers:[],
           values:[],
           subtotal:"",
           taxamount:"",
           tax:"",
           currency:""
        }
      }
        it=item;

        
        return <tr>
        <td>
          <button style={{border:"none",background:"transparent"}} onClick={()=>{
            let temp1=item;
            temp1.data=temp;
            handleShow();
            setTabdata(temp1)
          }}> <span  class="time">{it.id}</span></button>
        
        </td>
        <td>{temp.submittedDate}</td>
        <td>{temp.category}</td>
        <td>{temp.total}</td>
        <td > <OverlayTrigger
      placement="top"
      popperConfig={{
    modifiers: {
      preventOverflow: {
        enabled: false
      }
    }
  }}
      delay={{ show: 950, hide: 900 }}
      overlay={ <Tooltip id="button-tooltip" >

      Mythili D <br/>
      Manager : L&D <br/>
      Level 1 
    </Tooltip>}
    >
      <img style={{transition:'1s'}} class="profile-img" src={level1} alt="" />
      </OverlayTrigger>
      <OverlayTrigger
      placement="top"
      popperConfig={{
    modifiers: {
      preventOverflow: {
        enabled: false
      }
    }
  }}
      delay={{ show: 950, hide: 900 }}
      overlay={ <Tooltip id="button-tooltip" >
      Vignesh R <br/>
      Head : Human Resources <br/>
      Level 2 
    </Tooltip>}
    >
      <img style={{transition:'1s'}} class="profile-img" src={level2} alt="" />
      </OverlayTrigger>
      <OverlayTrigger
      placement="top"
      popperConfig={{
    modifiers: {
      preventOverflow: {
        enabled: false
      }
    }
  }}
      delay={{ show: 950, hide: 900 }}
      overlay={ <Tooltip id="button-tooltip" >
      Girish M P <br/>
      Practice lead : DigiverZ <br/>
      Level 3 
    </Tooltip>}
    >
      <img style={{transition:'1s'}} class="profile-img" src={level3} alt="" />
      </OverlayTrigger>
      </td>
       <td>{temp.currency}</td>
        <td>
          {
            it.status=='waiting' ? <div class="status is-wait"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
           </svg>
           Waiting
          </div> : (it.status=='accepted'?  <div class="status is-green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M20 6L9 17l-5-5" />
          </svg>
         Accepted
         </div>:  <div class="status is-red">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          Rejected
         </div> )
          }
        
        </td>
       </tr>
      })
      
     }
     {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
    
       
      </tbody>
      <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[4,mainData.length<10?{ label: 'All', value: -1 }:10]}
              colSpan={3}
              count={mainData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
     </table>
    </div>
   </div>
   
   
  </div>
 </div>
 </div>
 <Modal size="lg"

      aria-labelledby="contained-modal-title-vcenter"
      className='modal-dialog-centered' style={{minWidth:"100vw"}} show={show} onHide={handleClose}>
        <Modal.Header style={{background: "rgb(44 44 44 / 80%)",
      backdropFilter: "saturate(180%) blur(10px)",borderBottom:"none"}} closeButton>
         
        </Modal.Header>
        <Modal.Body style={{background: "rgb(44 44 44 / 80%)",
      backdropFilter: "saturate(180%) blur(10px)"}}>
    <section class="ftco-section" >
		<div class="container">
			<div class="row justify-content-center" >
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section" style={{color:"white"}}>Request ID : {tabdata.id}</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-lg-10">
					<div class="wrapper">
						<div class="row no-gutters">
							<div class="col-md-6 d-flex align-items-stretch" style={{marginTop:"5px"}}>
								<div class="contact-wrap w-100 p-md-5 p-4 py-5">
									<form method="POST" id="contactForm" name="contactForm" class="contactForm">
										<div class="row">
											
											<div class="col-md-12">
												<div class="form-group">
                        <div style={{overflowX : "overlay"}}>
                <table class="Tab " style={{marginTop:"0" ,     background: "#eee",
    borderBottom: "2px solid #adb5bd",boxShadow:"2px 2px 4px 4px #adb5bd"}} >
                          <thead>                           
                            {
                              tabdata.data.headers.map((itt)=>{
                                return <th style={{borderTop:"none",padding:"11px 11px",fontSize:"unset"}}>{itt}</th>
                              })
                            }
                          </thead>
                          <tbody>
                                    
                                  {
                                    tabdata.data.values.map((itt)=>{
                                      if(itt.length<tabdata.data.headers.length){
                                        return <></>
                                      }
                                      
                                     let ttt=[]
                                     ttt=itt
                                     return <tr> {
                                     ttt.map((it1,index)=>{
                                      if(index==itt.length-1){
                                        return <td style={{ padding: "15px",
                                        background: "#ddd",
                                        borderBottom: "1px solid #fff"}}> {it1} </td>
                                      }
                                      else{
                                        return  <td style={{ padding: "15px",
                                        background: "#eee",
                                        borderBottom: "1px solid #fff"}}> {it1} </td>
                                      }
                                     })
                                    }
                                     </tr>
                                    })
                                  }                            
                                 
      
                                
                                <tr>                 
                                    
                                    {[...Array(tabdata.data.headers.length>2?tabdata.data.headers.length-2:0)].map((x, i) =>{
                                            return <td> </td>;
                                    }       
                                    )}
                                    <td style={{ padding: "15px",
                                     background: "#eee",
                                     borderBottom: "1px solid #fff"}}> Sub Total </td>
                                     
                                     <td style={{ padding: "15px",
                                     background: "#eee",
                                     borderBottom: "1px solid #fff"}}> {tabdata.data.subtotal} </td>
                                   
                                     </tr> 
                                     <tr>                 
                                     {[...Array(tabdata.data.headers.length>2?tabdata.data.headers.length-2:0)].map((x, i) =>{
                                            return <td> </td>;
                                    }       
                                    )}
                                    <td style={{ padding: "15px",
                                     background: "#eee",
                                     borderBottom: "1px solid #fff"}}> Tax </td>
                                     
                                     <td style={{ padding: "15px",
                                     background: "#eee",
                                     borderBottom: "1px solid #fff"}}> {tabdata.data.tax} %</td>
                                   
                                     </tr> 

                                <tr>                 
                                {[...Array(tabdata.data.headers.length>2?tabdata.data.headers.length-2:0)].map((x, i) =>{
                                            return <td> </td>;
                                    }       
                                    )}
                                    <td style={{padding: "15px",
                                     background: "rgb(30 30 30 / 85%)",
                                     color: "#ffffff",
                                     borderBottom: "1px solid #fff"}}> Total </td>

                                     <td style={{padding: "15px",
                                     background: "rgb(30 30 30 / 85%)",
                                     color: "#ffffff",
                                     borderBottom: "1px solid #fff"}}> {tabdata.data.total} </td>
                                   
                                     </tr> 
                             
                            </tbody>
                            </table>
                            <br/>
                            </div>
                            												</div>
											</div>
											{/* {
                        tabdata.status==="waiting" && <div class="col-md-12">
												<div class="form-group">
													<input type="submit" value="Edit" class="btn btn-primary"/>
													<div class="submitting"></div>
												</div>
											</div>
                      } */}
										</div>
									</form>
								</div>
							</div>
							<div class="col-md-6 d-flex align-items-stretch" style={{marginTop:"5px"}}>
								<div class="info-wrap w-100 p-md-5 p-4 py-5 img">
                <div class="dbox w-100 d-flex align-items-start">
               
               <div class="text pl-3">
                 <p><span>Invoice Number:</span> {tabdata.data.invono}</p>
               </div>
               </div>
                  
                <div class="dbox w-100 d-flex align-items-center">
               
				        		<div class="text pl-3">
					            <p><span>Category:</span> {tabdata.data.category}</p>
					          </div>
                    </div>
                  
				        	<div class="dbox w-100 d-flex align-items-center">
				        		
				        		<div class="text pl-3">
					            <p><span>Address:</span> {tabdata.data.address}</p>
					          </div>
				          </div>
				        	<div class="dbox w-100 d-flex align-items-center">
				        		
				        		<div class="text pl-3">
					            <p><span>Submitted Date: </span> {tabdata.data.submittedDate}</p>
					          </div>
				          </div>
				        	<div class="dbox w-100 d-flex align-items-center">
				        		
				        		<div class="text pl-3">
					            <p><span>Invoice Date: </span> {tabdata.data.invoiceDate}</p>
					          </div>
				          </div>
				        	<div class="dbox w-100 d-flex align-items-center">
				        		
				        		<div class="text pl-3">
					            <p><span>Status: </span>{tabdata.status}</p>
					          </div>
				          </div>
			          </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</Modal.Body>
       
      </Modal>
 </div>
  )
}

export default DashboardComponent