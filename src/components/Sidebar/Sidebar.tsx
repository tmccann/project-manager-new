import { Project } from "../../types/types";

type SideBarProps = {
  projects: Project[];
  getSelectedProject: (id: string) => void;
};

const Sidebar = ({ projects, getSelectedProject }: SideBarProps) => {
  return (
    <aside className="bg-stone-900 px-8 pt-16 h-screen rounded-tr-2xl md:w-72 text-stone-200">
      <h2 className="text-xl font-bold mb-8 uppercase border-b border-stone-700 pb-2">
        Your Projects
      </h2>

      <button className="bg-stone-700 hover:bg-stone-600 text-stone-400 hover:text-stone-200 transition-colors py-2 px-2 rounded-md mb-6 text-sm font-semibold">
        Create New Project
      </button>

      <ul className="space-y-2 overflow-y-auto">
        {projects.map((proj) => (
          <li key={proj.id}>
            <button
              onClick={() => getSelectedProject(proj.id)}
              className="w-full text-left p-2 text-stone-500 hover:bg-stone-800 hover:text-stone-200 transition-colors"
            >
              {proj.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
