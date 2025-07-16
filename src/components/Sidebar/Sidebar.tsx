import { Project } from "../../types/types";

type SideBarProps = {
  projects: Project[];
  getSelectedProject: (id: string) => void;
};

const Sidebar = ({ projects, getSelectedProject }: SideBarProps) => {
  return (
    <aside>
      <h2>Your Projects</h2>
      <button>Create New Project</button>
      <div>
        <ul>
          {projects.map((proj, index) => (
            <li key={index}>
              <button onClick={() => getSelectedProject(proj.id)} id={proj.id}>
                {proj.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
