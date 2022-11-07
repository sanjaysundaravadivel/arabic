import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";
import logo from "../img/logo.png"
import axios, * as others from 'axios';
const LoginComponent = (props) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    pass: "",
  });
  const config = {
    headers: {
    "Content-Type": "application/json",
    },
    };
  useEffect(() => {
    //fetch();
   }, [])
   
   const fetch= async ()=>{
     try {
      
      //  const formData1 = new FormData();
      //  formData1.append("name", "admin");
      //  formData1.append("uid", "admin001");
      //  formData1.append("role", "admin");
      //  formData1.append("password", "admin001");

      const formData1 = new FormData();
      const data = {
        category:"Membership Exams",
        invono:"12678",
        submittedDate:"01/10/2022",
        invoiceDate:"27/09/2022",
        address:"Seoul university, 1912 Harvest Lane,New York, NY 12210",
        total:"750.06",
        tax:"4",
        subtotal:"670",
        taxamount:"30",
        currency:"$",
        headers:[
          "#",
          "Course name",
          " AMOUNT "
      ],
      values:[
    [
        "1",
        "AWS Fundamentals",
        "670",
         ],
   
]

      }
      console.log(data)
       formData1.append("id", "cl/8264");
       formData1.append("name", "sanjay");
       formData1.append("uid", "emp001");
       formData1.append("role", "employee");
       formData1.append("status", "waiting");
       formData1.append("data", JSON.stringify(data));


       let res = await axios.post("http://127.0.0.1:5000/request", formData1,config);
       console.log(res)
     } catch (error) {
       window.alert("Some thing went wrong please try again")
       console.log(error)
       //window.location.reload();
     }
   }
  const submitHandler = async (event) => {
   
    
    event.preventDefault();
    console.log(formData);
    const formData1 = new FormData();
    formData1.append("uid", formData.name);
    formData1.append("password", formData.pass);
    let res = { data: {msg:"Success",role:"",name:""} };
    res = await axios.post("http://127.0.0.1:5000/login", formData1,config);
    console.log(res);
    if (res.data.msg == "Success") {
      props.setLogin(true);
      localStorage.setItem("name",res.data.name);
      localStorage.setItem("role",res.data.role);
      navigate("/dashboard");
    } else {
      window.alert("Invalid Credentials");
    }
    // props.setLogin(true);
  };
  return (
    <>
    <div className="Body11" >
    <div className="wrapper1">
        <div className="logo">
            <img src={logo} alt=""/>
        </div>
        <div className="text-center mt-4 name">
        <span style={{color:"black"}}>Invoice R</span>
        <span style={{color:"red"}}>ecognition</span>
        </div>
        <form className="p-3 mt-3" onSubmit={submitHandler}>
            <div className="form-field d-flex align-items-center">
                <span className="far fa-user"></span>
                <input type="text" name="userName"  value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    } id="userName" placeholder="Username"/>
            </div>
            <div className="form-field d-flex align-items-center">
                <span className="fas fa-key"></span>
                <input type="password"  value={formData.pass}
                    onChange={(e) =>
                      setFormData({ ...formData, pass: e.target.value })
                    } name="password" id="pwd" placeholder="Password"/>
            </div>
            <button className="btn mt-3"  type="submit"
                    value="Register">Login</button>
        </form>
       
    </div>

    </div>
        </>    
  );
};

export default LoginComponent;
