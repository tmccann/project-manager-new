import { Project } from "../../types/types";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";
import Button from "../ui/Buttons";

type SideBarProps = {
  projects: Project[];
  getSelectedProject: (id: string) => void;
  onAddProject: () => void;
};

const Sidebar = ({
  projects,
  getSelectedProject,
  onAddProject,
}: SideBarProps) => {
  return (
    <aside className="bg-stone-900 px-8 pt-16 h-screen rounded-tr-2xl md:w-72 text-stone-200 mt-8">
      <h2 className="text-xl font-bold mb-8 uppercase border-b border-stone-700 pb-2">
        Your Projects
      </h2>

      <Button
        variant="secondary"
        autoMargin
        onClick={onAddProject}
        data-testid="SideBarAddProject"
      >
        Create New Project
      </Button>
      <ul className="space-y-2 mt-5 overflow-y-auto">
        {projects.map((proj) => {
          const title = proj.title;
          const capitalised = capitaliseFirstLetter(title);
          return (
            <li key={proj.id}>
              <button
                onClick={() => getSelectedProject(proj.id)}
                className="w-full text-left p- text-stone-500 hover:bg-stone-800 hover:text-stone-200 transition-colors"
              >
                {capitalised}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
