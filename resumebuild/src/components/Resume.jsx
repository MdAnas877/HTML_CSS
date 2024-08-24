import React from 'react';
import '../assets/style/resume.css'
import FirstTemplateForm from './FirstTemplateForm';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';


function Resume() {

      const location    =  useLocation();
     const formData = location.state || {};
     console.log("For graduation",formData);


     let  grad    =     formData.graduation
    //  console.log("Grad",formData);
    //  console.log("Image",formData.image);
     
    const handleDownloadPDF = () => {
        const input = document.getElementById('resume-content');
        console.log("Resume",input);
        
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('resume.pdf');
        });
    };
    return (
        <div>
            <button
                onClick={handleDownloadPDF}
                className="btn btn-primary mt-3"
                style={{ backgroundColor: "#00adb5", borderColor: "#00adb5" }}
            >
                Download PDF
            </button>
        <div className="mb-5 p-4 w-100" style={{border:"5px solid #00adb5", backgroundColor:"biege"}}>
           

        <div >
            <div className="row  m-0 d-flex align-items-center" style={{height:"200px"}}>
                <div className="col-2 text-center media" >
                    <img className="rounded align-self-center mx-auto " src={ formData.image}alt='profile-pic'
                         style={{maxHeight:'180px',minHeight:"120px", width:'100px', background:'grey',padding:0}}/>
                   
                </div>
                <div className="col-6    text-left font-weight-bold " style={{fontFamily:"Serif"}}>
                    <div className=' d-flex justify-content-center' style={{color:"#00adb5",fontSize:"55px"}}></div>
                    <h1 className=' d-flex justify-content-center'>{formData.fullName}</h1>
                    <h2 className=' d-flex justify-content-center'>{formData.jobtitle}</h2>
                </div>
                <div className="col-4  ">
                    <div className=' p-3' style={{fontSize:"18px",float:"left",display:"inline-block"}}>
                        <div >{formData.email}</div>
                        <div>{formData.mobileNo}</div>
                        <div>{formData.address}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr style={{height:"5px",backgroundColor:"#00adb5"}}/>
        <div className="text-justify mx-4">{formData.objective}</div>
        <hr style={{height:"5px",backgroundColor:"#00adb5"}}/>

        <div className="container" style={{fontFamily:"Serif",}}>
            <div className="row">
                <div className="col-3 text-left  " style={{color:"#00adb5"}}> <h4> Projects</h4></div>
                <div className="col-9  text-left " style={{fontSize:"18px"}}>
                {formData.projects.map((project, index) => (
                <div key={index} className="mt-1">
                    <b>{project.projectname}</b>
                    <div className="mt-1">{project.projectdes}</div>
                </div>
            ))}
                </div>
                <div className="w-100 mt-4"> </div>
                <hr style={{height:"5px",backgroundColor:"#00adb5"}}/>
                <div className="col-3 text-left" style={{color:"#00adb5"}}><h4>Education</h4></div>
                <div className="col-9 text-left" >
                    <div style={{fontSize:"18px"}}>
                        {
                            grad.map((val,index)=>{
                               return(
                                 <div>
                                   <div>{val.schoolname}</div>  
                                   <div>{val.schoolduration}</div> 
                                 </div>
                               )
                            })
                        }
                    </div>
                </div>
                <div className="w-100 mt-4"> </div>
                <hr style={{height:"5px",backgroundColor:"#00adb5"}}/>
                <div className="col-3 text-left " >
                    <h4 style={{color:"#00adb5"}}>Key Skills</h4>
                </div>
                <div className="col-9 text-left" style={{fontSize:"18px"}}>
                    <div>{formData.skills}</div>
                </div>  

                 <div className="w-100 mt-4"> </div>
                <hr style={{height:"5px",backgroundColor:"#00adb5"}}/>
                <div className="col-3 text-left " >
                    <h4 style={{color:"#00adb5"}}>Languages</h4>
                </div>
                <div className="col-9 text-left" style={{fontSize:"18px"}}>
                    <div>{formData.languages}</div>
                </div>                
                </div>
        </div>
    </div>
    </div>
    );
}

export default Resume;
