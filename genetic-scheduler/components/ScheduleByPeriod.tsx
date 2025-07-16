import React from 'react';
import { Chromosome, AppData } from '../types';

interface ScheduleByPeriodProps {
  chromosome: Chromosome;
  appData: AppData;
}

const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
const HOURS = [19, 20, 21, 22];

export const ScheduleByPeriod: React.FC<ScheduleByPeriodProps> = ({ chromosome, appData }) => {
  // Agrupa genes por período
  const periodMap: Record<number, typeof chromosome.genes> = {};
  chromosome.genes.forEach(gene => {
    const discipline = appData.disciplines.find(d => d.id === gene.disciplineId);
    if (!discipline) return;
    const period = discipline.period;
    if (!periodMap[period]) periodMap[period] = [];
    periodMap[period].push(gene);
  });

  // Para cada período, gera uma tabela de horários
  return (
    <div className="space-y-10">
      {Object.keys(periodMap).sort((a, b) => Number(a) - Number(b)).map(period => (
        <div key={period}>
          <h3 className="text-xl font-bold mb-2">Período {period}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-300 bg-white">
              <thead>
                <tr>
                  <th className="border px-2 py-1 bg-slate-100">Horário</th>
                  {DAYS.map(day => (
                    <th key={day} className="border px-2 py-1 bg-slate-100">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS.map(hour => (
                  <tr key={hour}>
                    <td className="border px-2 py-1 font-semibold">{hour}:00</td>
                    {DAYS.map((_, dayIdx) => {
                      const gene = periodMap[period].find(g => g.day === dayIdx && g.hour === hour);
                      if (!gene) return <td key={dayIdx} className="border px-2 py-1"></td>;
                      const discipline = appData.disciplines.find(d => d.id === gene.disciplineId);
                      const teacher = appData.teachers?.find(t => t.id === gene.teacherId);
                      return (
                        <td key={dayIdx} className="border px-2 py-1">
                          <div className="text-xs font-bold">{discipline?.name}</div>
                          <div className="text-xs text-slate-500">{teacher?.name}</div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};