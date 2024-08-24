import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './SideBar';
import Resume from './Resume';
import axios from 'axios';
import '../assets/style/form.css'
import { useNavigate } from 'react-router-dom';

function FirstTemplateForm() {
     const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        mobileNo: '',
        objective: '',
        graduation: [
            {schoolname : '',schoolduration : ''}
        ],
        skills: '',
        jobtitle : '',
        projects: [
            { projectname: '', projectdes: '' }
        ],
        languages : '',
        image: null
    });
  const[isSubmitted,setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data State",formData);
        setIsSubmitted(true)
        axios.post('https://66a49bd55dc27a3c19095649.mockapi.io/student',formData)
        .then((res)=>{        
        })
    };
    
 const handleChangeProject = (index, e) => {
        const { name, value } = e.target;
        const updatedProjects = [...formData.projects];
        updatedProjects[index][name] = value;
        setFormData({ ...formData, projects: updatedProjects });
    };

    const handleChangeGraguation = (index, e) => {
        const { name, value } = e.target;
        const updatedGraduation = [...formData.graduation];
        updatedGraduation[index][name] = value;
        setFormData({ ...formData, graduation: updatedGraduation });
    };

    const addGraduation = () => {
        setFormData({ ...formData, graduation: [...formData.graduation, { schoolname: '', schoolduration: '' }] });
    };

    const removeGraduation = (index) =>{
        const updatedGraduation = formData.graduation.filter((_, i) => i !== index);
        setFormData({ ...formData, graduation : updatedGraduation });
    }

    const addProject = () => {
        setFormData({ ...formData, projects: [...formData.projects, { projectname: '', projectdes: '' }] });
    };

    const removeProject = (index) => {
        const updatedProjects = formData.projects.filter((_, i) => i !== index);
        setFormData({ ...formData, projects: updatedProjects });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevState) => ({
                    ...prevState,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file); // Converts the file to a data URL
        }
    };
     
    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <Sidebar />
                    </div>
                    <div className="col py-2" id="resume-content">
                        {
                            isSubmitted ? (   
                                   
                                //    navigate('/Resume',{state : formData})
                                navigate('/resume2',{state : formData})


                                // <Resume formData={formData}/>
                            ) : (
                                <form onSubmit={handleSubmit} >
                                <div className="row">
                                    <div className="mb-3 col-3">
                                        <label htmlFor="fullName" className="form-label">Full Name</label>
                                        <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter Full Name" />
                                    </div>
                                    <div className="mb-3 col-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="767,cubic colony" />
                                    </div>
                                    <div className="mb-3 col-3">
                                        <label htmlFor="mobileNo" className="form-label">Mobile No:</label>
                                        <input type="text" className="form-control" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="91+0000000000" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-12">
                                        <label htmlFor="objective" className="form-label">Objective</label>
                                        <textarea className="form-control" name="objective" value={formData.objective} onChange={handleChange} placeholder="about yourself" />
                                    </div>
                                </div>
                                <div className="row">
                                    
                                    <div className="mb-3 col-4">
                                        <label htmlFor="skills" className="form-label">Skills</label>
                                        <input type="text" className="form-control" name="skills" value={formData.skills} onChange={handleChange} placeholder="---" />
                                    </div>
                                    <div className="mb-3 col-4">
                                        <label htmlFor="skill" className="form-label"                          
                                        >Language                                    
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter a language and press Enter"
                                            onChange={handleChange} 
                                            name='languages'
                                            value={formData.languages}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-6">
                                        <label htmlFor="formFile" className="form-label">Upload Image</label>
                                        <input className="form-control" type="file" 
                                        name="image" onChange={handleFileChange} />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="graduation" className="form-label">Job Title</label>
                                        <input type="text" className="form-control" name="jobtitle" value={formData.jobtitle} onChange={handleChange} placeholder="Job Title" />
                                    </div>
                                   
                                </div>
                                <div className="row">
    {formData.graduation.map((graduation, index) => (
        <div key={index} className="row mb-3">  
            <div className="col-4">
                <label htmlFor="schoolname" className="form-label">School Name / College Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="schoolname"
                    value={graduation.schoolname}
                    onChange={(e) => handleChangeGraguation(index, e)}
                    placeholder="School Name / College Name"
                />
            </div>
            <div className="col-6">
                <label htmlFor="schoolduration" className="form-label">School Duration</label>
                <input
                type='text'
                    className="form-control"
                    name="schoolduration"
                    value={graduation.schoolduration}
                    onChange={(e) => handleChangeGraguation(index, e)}
                    placeholder="School Duration"
                />
            </div>
            <div className="row mt-3">
                <div className="col-6">
                    <button type="button" onClick={addGraduation} className="btn btn-primary w-50">
                        Add School/College
                    </button>
                </div>
                <div className="col-6">
                    <button type="button" onClick={() => removeGraduation(index)} className="btn btn-danger w-50">
                        Remove School/College
                    </button>
                </div>
            </div>
        </div>
    ))}
</div>

                                <div className="row">
                                
                                    {formData.projects.map((project, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="mb-3 col-4">
                                                <label htmlFor="projectname" className="form-label">Project Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="projectname"
                                                    value={project.projectname}
                                                    onChange={(e) => handleChangeProject(index, e)}
                                                    placeholder="Project Name"
                                                />
                                            </div>
                                            <div className="mb-3 col-12">
                                                <label htmlFor="projectdes" className="form-label">Project Description</label>
                                                <textarea
                                                    className="form-control"
                                                    name="projectdes"
                                                    value={project.projectdes}
                                                    onChange={(e) => handleChangeProject(index, e)}
                                                    placeholder="Project Description"
                                                />
                                            </div>
                                            <div class="row">
                                                <div class="col-6">
                                                <button type="button" onClick={addProject} className="btn btn-primary w-50">
                                        Add Project
                                    </button>
                                                </div>
                                                <div class="col-6">
                                                <button type="button" onClick={() => removeProject(index)} className="btn btn-danger w-50">
                                                Remove Project
                                            </button>
                                                </div>
                                            </div>                                           
                                        </div>
                                    ))}                                
                                </div>
                                <div className="mb-3 col-6 mt-4">
                                        <button className="btn btn-primary mt-2 w-100">Submit</button>
                                    </div>
                            </form>
                            )
                        }                      
                    </div>
                </div>
            </div>
                
        </div>
    );
}

export default FirstTemplateForm;
