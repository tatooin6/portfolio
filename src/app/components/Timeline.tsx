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
      <h1 className="text-lg">Experience Timeline</h1>
      <p className="pb-6">Latest Experience</p>
      <ol className="relative border-s border-gray-700 dark:border-white">
        {milestones.map((milestone) => (
          <MilestoneItem
            key={milestone.startDate.toString()}
            milestone={milestone}
          />
        ))}
      </ol>
      <p>Earliest Experience</p>
    </div>
  );
};

export default Timeline;
