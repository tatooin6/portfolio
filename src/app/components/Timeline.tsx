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
      <h1 className="text-lg pb-5 dark:text-gray-200">Experience Timeline</h1>
      <p className="pb-1 dark:text-gray-200">Latest Experience</p>
      <ol className="relative border-s border-gray-700 dark:border-white">
        {milestones.map((milestone, index) => (
          <MilestoneItem
            key={milestone.startDate.toString()}
            milestone={milestone}
            isLast={index === milestones.length - 1}
          />
        ))}
      </ol>
      <p className="dark:text-gray-200">Earliest Experience</p>
    </div>
  );
};

export default Timeline;
