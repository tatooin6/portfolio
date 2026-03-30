import MilestoneItem from "./MilestoneItem";

export interface Milestone {
  startDate: Date;
  endDate: string | Date | null;
  title: string;
  company?: string;
  summary: string;
  extendedDescription?: string;
}

const Timeline = ({ milestones }: { milestones: Milestone[] }) => {
  return (
    <div>
      <h1 className="pb-5 text-lg text-theme-accent">Experience Timeline</h1>
      <p className="pb-1 text-theme-secondary">Latest Experience</p>
      <ol className="relative border-s border-theme-border/70">
        {milestones.map((milestone, index) => (
          <MilestoneItem
            key={milestone.startDate.toString()}
            milestone={milestone}
            isLast={index === milestones.length - 1}
          />
        ))}
      </ol>
      <p className="text-theme-secondary">Earliest Experience</p>
    </div>
  );
};

export default Timeline;
