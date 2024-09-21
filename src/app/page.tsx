'use client'

import React, { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

type Education = {
  school: string
  degree: string
  location: string
  date: string
}

type Experience = {
  title: string
  company: string
  location: string
  date: string
  responsibilities: string[]
}

type Project = {
  name: string
  technologies: string
  date: string
  details: string[]
}

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'JAKE RYAN',
    phone: '123-456-7890',
    email: 'jake@su.edu',
    linkedin: 'linkedin.com/in/jake',
    github: 'github.com/jake'
  })

  const [education, setEducation] = useState<Education[]>([
    {
      school: 'Southwestern University',
      degree: 'Bachelor of Arts in Computer Science, Minor in Business',
      location: 'Georgetown, TX',
      date: 'Aug. 2018 - May 2021'
    },
    {
      school: 'Blinn College',
      degree: 'Associate in Liberal Arts',
      location: 'Bryan, TX',
      date: 'Aug. 2014 - May 2018'
    }
  ])

  const [technicalSkills, setTechnicalSkills] = useState({
    languages: 'Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R',
    frameworks: 'React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI',
    developerTools: 'Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse',
    libraries: 'pandas, NumPy, Matplotlib'
  })

  const [experience, setExperience] = useState<Experience[]>([
    {
      title: 'Undergraduate Research Assistant',
      company: 'Texas A&M University',
      location: 'College Station, TX',
      date: 'June 2020 - Present',
      responsibilities: [
        'Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems',
        'Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data',
        'Explored ways to visualize GitHub collaboration in a classroom setting'
      ]
    },
    {
      title: 'Information Technology Support Specialist',
      company: 'Southwestern University',
      location: 'Georgetown, TX',
      date: 'Sep. 2018 - Present',
      responsibilities: [
        'Communicate with managers to set up campus computers used on campus',
        'Assess and troubleshoot computer problems brought by students, faculty and staff',
        'Maintain upkeep of computers, classroom equipment, and 200 printers across campus'
      ]
    }
  ])

  const [projects, setProjects] = useState<Project[]>([
    {
      name: 'Gitlytics',
      technologies: 'Python, Flask, React, PostgreSQL, Docker',
      date: 'June 2020 - Present',
      details: ["lorem ipsum", "lorem ipsum", "lorem ipsum   "]
    },
    {
      name: 'Simple Paintball',
      technologies: 'Spigot API, Java, Maven, TravisCI, Git',
      date: 'May 2018 - May 2020',
      details: [
        'Developed a Minecraft server plugin to entertain kids during free time for a previous job',
        'Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review',
        'Implemented continuous delivery using TravisCI to build the plugin upon new a release',
        'Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin'
      ]
    }
  ])

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
  }

  const handleTechnicalSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechnicalSkills({ ...technicalSkills, [e.target.name]: e.target.value })
  }

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...education]
    newEducation[index][field] = value
    setEducation(newEducation)
  }

  const handleExperienceChange = (index: number, field: keyof Experience, value: string | string[]) => {
    const newExperience = [...experience]

    // Check if the field being updated is 'responsibilities', which is a string array
    if (field === 'responsibilities') {
      newExperience[index][field] = value as string[] // Ensure value is an array when updating responsibilities
    } else {
      newExperience[index][field] = value as string // Other fields expect a string
    }

    setExperience(newExperience)
  }


  const handleResponsibilityChange = (expIndex: number, respIndex: number, value: string) => {
    const newExperience = [...experience]
    newExperience[expIndex].responsibilities[respIndex] = value
    setExperience(newExperience)
  }

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...projects]
    // @ts-ignore - Ignoring type check for this line
    newProjects[index][field] = value
    setProjects(newProjects)
  }

  const handleProjectDetailChange = (projIndex: number, detailIndex: number, value: string) => {
    const newProjects = [...projects]
    newProjects[projIndex].details[detailIndex] = value
    setProjects(newProjects)
  }

  const addEducation = () => {
    setEducation([...education, { school: '', degree: '', location: '', date: '' }])
  }

  const addExperience = () => {
    setExperience([...experience, { title: '', company: '', location: '', date: '', responsibilities: [''] }])
  }

  const addProject = () => {
    setProjects([...projects, { name: '', technologies: '', date: '', details: [''] }])
  }

  const addResponsibility = (index: number) => {
    const newExperience = [...experience]
    newExperience[index].responsibilities.push('')
    setExperience(newExperience)
  }

  const addProjectDetail = (index: number) => {
    const newProjects = [...projects]
    newProjects[index].details.push('')
    setProjects(newProjects)
  }

  const deleteEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const deleteExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  const deleteProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  const deleteResponsibility = (expIndex: number, respIndex: number) => {
    const newExperience = [...experience]
    newExperience[expIndex].responsibilities = newExperience[expIndex].responsibilities.filter((_, i) => i !== respIndex)
    setExperience(newExperience)
  }

  const deleteProjectDetail = (projIndex: number, detailIndex: number) => {
    const newProjects = [...projects]
    newProjects[projIndex].details = newProjects[projIndex].details.filter((_, i) => i !== detailIndex)
    setProjects(newProjects)
  }

  const resumeRef = useRef(null)

  const downloadPDF = async () => {
    if (resumeRef.current) {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2
      });
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      })
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      // const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgX = 1
      const imgY = 1
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save(`${personalInfo.name.replace(' ', '_')}_resume.pdf`)
    }
  }
  const handleDonateClick = () => {
    const paymentButton = document.querySelector("script[data-payment_button_id]");
    if (paymentButton) {
      paymentButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  }
  <form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_OzpiyhYJwqNlWe" async> </script> </form>

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col justify-between items-center md:items-start">
          <div className="mb-auto">
            <h1 className="text-2xl font-bold md:text-3xl">Resume Builder</h1>
          </div>
          <div className="mt-auto">
            <form>
              <script
                src="https://checkout.razorpay.com/v1/payment-button.js"
                data-payment_button_id="pl_OzpiyhYJwqNlWe"
                async
              ></script>
              {/* <button
                type="button" // Set to button to prevent form submission
                className="bg-secondary text-white font-semibold py-2 px-4 rounded-md"
                onClick={handleDonateClick} // Trigger the payment button
              >
                Donate
              </button> */}
            </form>
          </div>
        </div>
      </header>
      <div className="w-full md:w-1/2 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Resume</h2>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
          {Object.entries(personalInfo).map(([key, value]) => (
            <div key={key} className="mb-2">
              <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <Input
                id={key}
                name={key}
                value={value}
                onChange={handlePersonalInfoChange}
              />
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Technical Skills</h3>
          {Object.entries(technicalSkills).map(([key, value]) => (
            <div key={key} className="mb-2">
              <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <Input
                id={key}
                name={key}
                value={value}
                onChange={handleTechnicalSkillsChange}
              />
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              {Object.entries(edu).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <Label htmlFor={`edu-${key}-${index}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input
                    id={`edu-${key}-${index}`}
                    value={value}
                    onChange={(e) => handleEducationChange(index, key as keyof Education, e.target.value)}
                  />
                </div>
              ))}
              <Button variant="destructive" onClick={() => deleteEducation(index)} className="mt-2">
                <Trash2 className="mr-2 h-4 w-4" />Delete Education
              </Button>
            </div>
          ))}
          <Button onClick={addEducation}><PlusCircle className="mr-2 h-4 w-4" />Add Education</Button>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Experience</h3>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              {Object.entries(exp).map(([key, value]) => (
                <div key={key} className="mb-2">
                  {key !== 'responsibilities' ? (
                    <>
                      <Label htmlFor={`exp-${key}-${index}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                      <Input
                        id={`exp-${key}-${index}`}
                        value={value}
                        onChange={(e) => handleExperienceChange(index, key as keyof Experience, e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <Label>Responsibilities</Label>
                      {Array.isArray(value) && value.map((resp: string, respIndex: number) => (
                        <div key={respIndex} className="flex items-center mb-2">
                          <Input
                            value={resp}
                            onChange={(e) => handleResponsibilityChange(index, respIndex, e.target.value)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteResponsibility(index, respIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button onClick={() => addResponsibility(index)}><PlusCircle className="mr-2 h-4 w-4" />Add Responsibility</Button>
                    </>
                  )}
                </div>
              ))}
              <Button variant="destructive" onClick={() => deleteExperience(index)} className="mt-2">
                <Trash2 className="mr-2 h-4 w-4" />Delete Experience
              </Button>
            </div>
          ))}
          <Button onClick={addExperience}><PlusCircle className="mr-2 h-4 w-4" />Add Experience</Button>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              {Object.entries(project).map(([key, value]) => (
                <div key={key} className="mb-2">
                  {key !== 'details' ? (
                    <>
                      <Label htmlFor={`project-${key}-${index}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                      <Input
                        id={`project-${key}-${index}`}
                        value={value}
                        onChange={(e) => handleProjectChange(index, key as keyof Project, e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <Label>Details</Label>
                      {Array.isArray(value) && value.map((detail: string, detailIndex: number) => (
                        <div key={detailIndex} className="flex items-center mb-2">
                          <Input
                            value={detail}
                            onChange={(e) => handleProjectDetailChange(index, detailIndex, e.target.value)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteProjectDetail(index, detailIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <Button onClick={() => addProjectDetail(index)}><PlusCircle className="mr-2 h-4 w-4" />Add Detail</Button>
                    </>
                  )}
                </div>
              ))}
              <Button variant="destructive" onClick={() => deleteProject(index)} className="mt-2">
                <Trash2 className="mr-2 h-4 w-4" />Delete Project
              </Button>
            </div>
          ))}
          <Button onClick={addProject}><PlusCircle className="mr-2 h-4 w-4" />Add Project</Button>
        </section>
      </div>

      <div className="w-full md:w-1/2 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4 mt-3">
          <h2 className="text-2xl font-bold dark:text-white">Resume Preview</h2>
          <Button onClick={downloadPDF} className="">
            Download as PDF
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-none">
          <div ref={resumeRef} className="bg-white dark:bg-gray-800 p-8">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 dark:text-white">{personalInfo.name}</h1>
              <p className="text-sm dark:text-gray-400">
                {personalInfo.phone} | {personalInfo.email} | {personalInfo.linkedin} | {personalInfo.github}
              </p>
            </header>

            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b-2 border-gray-300 dark:border-gray-700 dark:text-white">
                EDUCATION
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between dark:text-white">
                    <strong>{edu.school}</strong>
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex justify-between text-sm dark:text-gray-400">
                    <em>{edu.degree}</em>
                    <span>{edu.date}</span>
                  </div>
                </div>
              ))}
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b-2 border-gray-300 dark:border-gray-700 dark:text-white">
                TECHNICAL SKILLS
              </h2>
              <p className="dark:text-gray-400"><strong>Languages:</strong> {technicalSkills.languages}</p>
              <p className="dark:text-gray-400"><strong>Frameworks:</strong> {technicalSkills.frameworks}</p>
              <p className="dark:text-gray-400"><strong>Developer Tools:</strong> {technicalSkills.developerTools}</p>
              <p className="dark:text-gray-400"><strong>Libraries:</strong> {technicalSkills.libraries}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b-2 border-gray-300 dark:border-gray-700 dark:text-white">
                EXPERIENCE
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between dark:text-white">
                    <strong>{exp.title}</strong>
                    <span>{exp.date}</span>
                  </div>
                  <div className="flex justify-between text-sm dark:text-gray-400">
                    <em>{exp.company}</em>
                    <span>{exp.location}</span>
                  </div>
                  <ul className="list-disc list-inside dark:text-gray-400">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="text-sm">{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2 border-b-2 border-gray-300 dark:border-gray-700 dark:text-white">
                PROJECTS
              </h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between dark:text-white">
                    <strong>{project.name}</strong>
                    <span>{project.date}</span>
                  </div>
                  <p className="text-sm italic dark:text-gray-400">{project.technologies}</p>
                  <ul className="list-disc list-inside dark:text-gray-400">
                    {project.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm">{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>

    </div>
  )
}