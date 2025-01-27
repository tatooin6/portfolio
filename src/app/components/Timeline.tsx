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
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {milestones.map((milestone) => (
          <MilestoneItem
            key={milestone.startDate.toString()}
            milestone={milestone}
          />
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
