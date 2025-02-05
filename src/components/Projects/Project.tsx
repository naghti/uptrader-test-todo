import { FC } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Project as ProjectT } from "../../types"
import "./Project.scss"
import { removeProject } from "../../services/projectService"

export const Project: FC<{ project: ProjectT; setProjects: Function }> = ({
  project,
  setProjects,
}) => {
  console.log(project)
  const navigate = useNavigate()
  const handleDelete = () => {
    const conf = confirm("Are you sure to delete this project?")
    if (!conf) return
    const updatedProjects = removeProject(project.id)
    setProjects(updatedProjects)
    navigate("/")
  }
  return (
    <div className="projects__item project" key={project.id}>
      <div className="div_delete">
        <button onClick={handleDelete} className="btn_delete">
          ❌
        </button>
      </div>
      <h2 className="title_project">{project.projectName}</h2>
      <div className="project__stats">
        {project.data &&
          project.data.map((status) => {
            return (
              <h5 key={status.id}>
                {status.title.split("").slice(0, 3).join("")}
                <span>{status.items.length}</span>
              </h5>
            )
          })}
      </div>
      <NavLink to={`/project/${project.id}`} className="project__item-go">
        Go to project
      </NavLink>
    </div>
  )
}
