import MilestoneItem from "./MilestoneItem";

export interface Milestone {
  startDate: Date;
  endDate: Date;
  title: string;
  company?: string;
  summary: string;
  extendedDescription?: string;
}

const Timeline = ({ milestones }: { milestones: Milestone[] }) => {
  return (
    <div>
      <h1 className="text-lg dark:text-gray-200">Experience Timeline</h1>
      <p className="pb-6 dark:text-gray-200">Latest Experience</p>
      <ol className="relative border-s border-gray-700 dark:border-white">
        {milestones.map((milestone) => (
          <MilestoneItem
            key={milestone.startDate.toString()}
            milestone={milestone}
          />
        ))}
      </ol>
      <p className="dark:text-gray-200">Earliest Experience</p>
    </div>
  );
};

export default Timeline;
