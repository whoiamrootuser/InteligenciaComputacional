import React from 'react';
import { AppData, Chromosome } from '../types';

interface ScheduleViewProps {
  schedule: Chromosome;
  appData: AppData;
}

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const HOURS = Array.from({ length: 4 }, (_, i) => i + 19); // 7pm to 11pm (19:00 to 23:00)

const ScheduleView: React.FC<ScheduleViewProps> = ({ schedule, appData }) => {
  const teacherMap = new Map(appData.teachers.map(t => [t.id, t.name]));
  const disciplineMap = new Map(appData.disciplines.map(d => [d.id, d.name]));

  const scheduleGrid = HOURS.map(hour =>
    DAYS.map(dayStr => {
        const day = DAYS.indexOf(dayStr);
        return schedule.genes.filter(gene => gene.day === day && gene.hour === hour);
    })
  );

  return (
    <div className="overflow-x-auto bg-slate-50 p-4 rounded-lg border">
      <div className="grid grid-cols-6 min-w-[1000px]">
        {/* Header */}
        <div className="font-bold text-slate-600 p-2 border-b border-r">Time</div>
        {DAYS.map(day => (
          <div key={day} className="font-bold text-center text-slate-600 p-2 border-b">
            {day}
          </div>
        ))}

        {/* Rows */}
        {HOURS.map((hour, hourIndex) => (
          <React.Fragment key={hour}>
            <div className="font-semibold text-sm text-slate-500 p-2 border-r flex items-center justify-center">
              {`${hour}:00 - ${hour + 1}:00`}
            </div>
            {DAYS.map((_, dayIndex) => {
              const genesInSlot = scheduleGrid[hourIndex][dayIndex];
              return (
                <div key={`${hour}-${dayIndex}`} className="p-1 border-t min-h-[80px]">
                  <div className="space-y-1">
                  {genesInSlot.map((gene, geneIndex) => (
                    <div key={geneIndex} className="bg-sky-100 text-sky-900 rounded p-2 text-xs shadow-sm">
                      <p className="font-bold">{disciplineMap.get(gene.disciplineId) || 'Unknown Discipline'}</p>
                      <p className="text-sky-800">{teacherMap.get(gene.teacherId) || 'Unknown Teacher'}</p>
                    </div>
                  ))}
                  {genesInSlot.length === 0 && <div className="h-full w-full"></div>}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScheduleView;
