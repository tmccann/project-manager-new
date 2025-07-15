export type ProjectData = {
  title: string;
  description: string;
  dueDate: string;
};
export type SelectedProjectProps = {
  projectData: ProjectData;
  handleDelete: () => void;
};
const SelectedProject = ({ projectData }: SelectedProjectProps) => {
  return <div>SelectedProject</div>;
};

export default SelectedProject;
