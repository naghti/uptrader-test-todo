import { FC, useState } from "react"
import { Project as ProjectComponent } from "../components/Projects"
import { createProject } from "../services/projectService"
import { Project } from "../types"

export const Home: FC<{ setProjects: Function; projects: Project[] }> = ({
  setProjects,
  projects,
}) => {
  const [name, setName] = useState("")

  const handleCreate = (e: any) => {
    e.preventDefault()
    if (!name) return
    setProjects(createProject(name))
    setName("")
  }

  return (
    <div className="projects">
      <form className="projects__form">
        <input
          maxLength={20}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name project"
        />
        <button onClick={(e) => handleCreate(e)}>Create</button>
      </form>

      <h1 className="projects__title">Projects:</h1>

      <ul className="container projects__container">
        {projects &&
          projects.map((project) => (
            <ProjectComponent
              key={project.id}
              project={project}
              setProjects={setProjects}
            />
          ))}
      </ul>
    </div>
  )
}
