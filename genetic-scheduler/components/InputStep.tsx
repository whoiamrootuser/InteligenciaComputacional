import React, { useState } from 'react';
import { AppData, Teacher, Discipline } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import Input from './ui/Input';
import { TrashIcon } from './icons/TrashIcon';

interface InputStepProps {
  onSubmit: (data: AppData) => void;
}

const defaultTeachers: Teacher[] = [
  { id: 1, name: 'Professor 001' },
  { id: 2, name: 'Professor 002' },
  { id: 3, name: 'Professor 003' },
  { id: 4, name: 'Professor 004' },
  { id: 5, name: 'Professor 005' },
  { id: 6, name: 'Professor 006' },
  { id: 7, name: 'Professor 007' },
  { id: 8, name: 'Professor 008' },
  { id: 9, name: 'Professor 009' },
  { id: 10, name: 'Professor 010' },
];

const defaultDisciplines: Discipline[] = [
  { id: 1, name: 'EMPREENDEDORISMO', hoursPerWeek: 4, teacherId: 1, period: 0 },
  { id: 2, name: 'FUNDAMENTOS DE SISTEMAS PARA INTERNET', hoursPerWeek: 4, teacherId: 2, period: 0 },
  { id: 3, name: 'LINGUAGEM DE PROGRAMACAO', hoursPerWeek: 4, teacherId: 3, period: 0 },
  { id: 4, name: 'PROGRAMACAO WEB', hoursPerWeek: 4, teacherId: 4, period: 0 },
  { id: 5, name: 'REQUISITOS', hoursPerWeek: 4, teacherId: 5, period: 0 },
  
  { id: 6, name: 'ALGORITMOS E PROGRAMAÇÃO', hoursPerWeek: 4, teacherId: 6, period: 1 },
  { id: 7, name: 'FUNDAMENTOS DE BANCO DE DADOS', hoursPerWeek: 4, teacherId: 7, period: 1 },
  { id: 8, name: 'JAVASCRIPT BÁSICO', hoursPerWeek: 4, teacherId: 8, period: 1 },
  { id: 9, name: 'PROGRAMAÇÃO ORIENTADA A OBJETOS 1', hoursPerWeek: 4, teacherId: 9, period: 1 },
  { id: 10, name: 'PROJETO SISTEMA WEB MVC E SQL', hoursPerWeek: 4, teacherId: 10, period: 1 },

  { id: 11, name: 'BANCO DE DADOS AVANÇADO', hoursPerWeek: 4, teacherId: 1, period: 2 },
  { id: 12, name: 'PROGRAMAÇÃO ORIENTADA A OBJETOS 2', hoursPerWeek: 4, teacherId: 2, period: 2 },
  { id: 13, name: 'PROJETO BACK-END MONOLÍTICO COM ORM', hoursPerWeek: 4, teacherId: 3, period: 2 },
  { id: 14, name: 'PROJETO FRONT-END WEB JAVASCRIPT', hoursPerWeek: 4, teacherId: 4, period: 2 },
  { id: 15, name: 'TESTES AUTOMATIZADOS', hoursPerWeek: 4, teacherId: 5, period: 2 },

  { id: 16, name: 'BANCO DE DADOS NOSQL', hoursPerWeek: 4, teacherId: 6, period: 3 },
  { id: 17, name: 'INTERFACE HUMANO-COMPUTADOR', hoursPerWeek: 4, teacherId: 7, period: 3 },
  { id: 18, name: 'PROJETO APLICAÇÃO PARA DISPOSITIVOS MÓVEIS', hoursPerWeek: 4, teacherId: 8, period: 3 },
  { id: 19, name: 'PROJETO BACK-END MICROSSERVIÇOS E NOSQL', hoursPerWeek: 4, teacherId: 9, period: 3 },
  { id: 20, name: 'SISTEMAS DISTRIBUÍDOS', hoursPerWeek: 4, teacherId: 10, period: 3 },

  { id: 21, name: 'INTELIGÊNCIA COMPUTACIONAL', hoursPerWeek: 4, teacherId: 10, period: 4 },
  { id: 22, name: 'LIBRAS', hoursPerWeek: 4, teacherId: 10, period: 4 },
  { id: 23, name: 'PRODUÇÃO DE RELATÓRIO, ARTIGO E MONOGRAFIA', hoursPerWeek: 4, teacherId: 10, period: 4 },
  { id: 24, name: 'SEGURANÇA EM SISTEMAS PARA INTERNET', hoursPerWeek: 4, teacherId: 10, period: 4 },
  { id: 25, name: 'TÓPICOS ESPECIAIS 1', hoursPerWeek: 4, teacherId: 10, period: 4 },
];


const InputStep: React.FC<InputStepProps> = ({ onSubmit }) => {
  const [teachers, setTeachers] = useState<Teacher[]>(defaultTeachers);
  const [disciplines, setDisciplines] = useState<Discipline[]>(defaultDisciplines);

  const [newTeacherName, setNewTeacherName] = useState('');
  const [newDisciplineName, setNewDisciplineName] = useState('');
  const [newDisciplineHours, setNewDisciplineHours] = useState(3);
  const [newDisciplineTeacherId, setNewDisciplineTeacherId] = useState<string>('');


  const handleAddTeacher = () => {
    if (newTeacherName.trim()) {
      setTeachers([...teachers, { id: Date.now(), name: newTeacherName.trim() }]);
      setNewTeacherName('');
    }
  };

  const handleRemoveTeacher = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };
  
  const handleUpdateDisciplineTeacher = (disciplineId: number, teacherId: number) => {
    setDisciplines(prev => prev.map(d => 
        d.id === disciplineId ? { ...d, teacherId } : d
    ));
  };

  const handleAddDiscipline = () => {
    if (newDisciplineName.trim() && newDisciplineHours > 0 && newDisciplineTeacherId) {
      setDisciplines([...disciplines, { 
        id: Date.now(), 
        name: newDisciplineName.trim(), 
        hoursPerWeek: newDisciplineHours,
        teacherId: parseInt(newDisciplineTeacherId, 10) 
      }]);
      setNewDisciplineName('');
      setNewDisciplineHours(3);
      setNewDisciplineTeacherId('');
    }
  };

  const handleRemoveDiscipline = (id: number) => {
    setDisciplines(disciplines.filter(d => d.id !== id));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allDisciplinesAssigned = disciplines.every(d => d.teacherId !== null);
    if (teachers.length > 0 && disciplines.length > 0 && allDisciplinesAssigned) {
      onSubmit({ teachers, disciplines: disciplines as (Discipline & { teacherId: number })[] });
    } else {
      alert('Por favor, defina pelo menos um professor e uma disciplina, e atribua um professor para cada disciplina.');
    }
  };

  const selectStyles = "block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm";

  return (
    <Card className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Defina os Parâmetros de Agendamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Teachers Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Professores</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {teachers.map(teacher => (
                <div key={teacher.id} className="flex items-center justify-between bg-slate-50 p-2 rounded-md">
                  <span>{teacher.name}</span>
                  <button type="button" onClick={() => handleRemoveTeacher(teacher.id)} className="text-slate-400 hover:text-red-500">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2 items-end">
              <Input label="Nome do professor" id="new-teacher" value={newTeacherName} onChange={e => setNewTeacherName(e.target.value)} placeholder="e.g., Mr. Smith" />
              <Button type="button" variant="secondary" onClick={handleAddTeacher}>Add</Button>
            </div>
          </div>
          
          {/* Disciplines Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Diciplinas</h3>
             <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {disciplines.map(d => (
                <div key={d.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 bg-slate-50 p-2 rounded-md">
                  <span className="truncate" title={`${d.name} (${d.hoursPerWeek}h/wk)`}>{d.name} ({d.hoursPerWeek}h/wk)</span>
                   <select 
                    value={d.teacherId ?? ''} 
                    onChange={(e) => handleUpdateDisciplineTeacher(d.id, parseInt(e.target.value, 10))}
                    className={`${selectStyles} max-w-[150px]`}
                    aria-label={`Professor para ${d.name}`}
                  >
                    <option value="" disabled>Atribuir Professor</option>
                    {teachers.map(teacher => <option key={teacher.id} value={teacher.id}>{teacher.name}</option>)}
                  </select>
                  <button type="button" onClick={() => handleRemoveDiscipline(d.id)} className="text-slate-400 hover:text-red-500">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] md:grid-cols-1 lg:grid-cols-[2fr_1fr_2fr_auto] gap-2 items-end">
              <Input label="Nova Disciplina" id="new-discipline" value={newDisciplineName} onChange={e => setNewDisciplineName(e.target.value)} placeholder="e.g., Algebra II"/>
              <Input label="Horas/Semana" id="new-hours" type="number" min="1" max="10" value={newDisciplineHours} onChange={e => setNewDisciplineHours(parseInt(e.target.value, 10))} />
              <div>
                <label htmlFor="new-teacher-select" className="block text-sm font-medium text-slate-700 mb-1">Professor</label>
                <select 
                    id="new-teacher-select"
                    value={newDisciplineTeacherId} 
                    onChange={e => setNewDisciplineTeacherId(e.target.value)}
                    className={selectStyles}
                >
                    <option value="" disabled>-- Selecionar --</option>
                    {teachers.map(teacher => <option key={teacher.id} value={teacher.id}>{teacher.name}</option>)}
                </select>
              </div>
              <Button type="button" variant="secondary" onClick={handleAddDiscipline} className="self-stretch md:self-end">Add</Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 flex justify-end">
          <Button type="submit">
            Iniciar Algoritmo
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default InputStep;