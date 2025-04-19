document.addEventListener("DOMContentLoaded", function () {
  // Estrutura de professores e disciplinas por período
  const dados = [
    {
      professor: "001",
      periodos: [
        { id: 1, disciplinas: ["FBD"] },
        { id: 2, disciplinas: ["BDA"] },
      ],
    },
    {
      professor: "002",
      periodos: [
        { id: 0, disciplinas: ["FSI"] },
        { id: 1, disciplinas: ["AP"] },
        { id: 3, disciplinas: ["BDNSQL"] },
      ],
    },
    {
      professor: "003",
      periodos: [
        { id: 2, disciplinas: ["POO2"] },
        { id: 3, disciplinas: ["IHC"] },
      ],
    },
    {
      professor: "004",
      periodos: [
        { id: 1, disciplinas: ["LP"] },
        { id: 3, disciplinas: ["JB"] },
      ],
    },
    {
      professor: "005",
      periodos: [
        { id: 1, disciplinas: ["POO1"] },
        { id: 3, disciplinas: ["BD"] },
      ],
    },
    {
      professor: "006",
      periodos: [
        { id: 0, disciplinas: ["PWE"] },
        { id: 2, disciplinas: ["PBMO"] },
        { id: 1, disciplinas: ["PSWMS"] },
       
      ],
    },
    {
      professor: "007",
      periodos: [
        { id: 2, disciplinas: ["PFWJS"] },
        { id: 3, disciplinas: ["PBMSNSQL"] },
        { id: 4, disciplinas: ["LIB"] },
      ],
    },
    {
      professor: "008",
      periodos: [
        { id: 1, disciplinas: ["AP"] },
        { id: 3, disciplinas: ["PADM"] },
        { id: 4, disciplinas: ["SSI"] },
      ],
    },
    {
      professor: "009",
      periodos: [
        { id: 0, disciplinas: ["REQ"] },
        { id: 3, disciplinas: ["SI"] },
        { id: 4, disciplinas: ["PRAM"] },
      ],
    },
    {
      professor: "010",
      periodos: [
        { id: 0, disciplinas: ["EMP"] },
        { id: 2, disciplinas: ["TA"] },
        { id: 4, disciplinas: ["TE1"] },
      ],
    },
  ];

  function popularHorarios(geracoes) {
    const scheduleDataSet = [];
    for (let i = 0; i < geracoes; i++) {
      let horarios = Array(100).fill(null);

      let cargaDisciplinas = new Map();

      dados.forEach(({ professor, periodos }) => {
        periodos.forEach(({ id, disciplinas }) => {
          disciplinas.forEach((disciplina) => {
            if (!cargaDisciplinas.has(disciplina)) {
              cargaDisciplinas.set(disciplina, {
                professor,
                periodo: id,
                count: 0,
              });
            }
          });
        });
      });

      cargaDisciplinas.forEach((info, disciplina) => {
        let baseIndex = info.periodo * 20;
        let horariosDisponiveis = Array.from(
          { length: 20 },
          (_, i) => baseIndex + i
        );
        let alocacoesFeitas = 0;

        while (alocacoesFeitas < 4 && horariosDisponiveis.length > 0) {
          let index = Math.floor(Math.random() * horariosDisponiveis.length);
          let horarioSorteado = horariosDisponiveis.splice(index, 1)[0];

          if (!horarios[horarioSorteado]) {
            horarios[horarioSorteado] = {
              professor: info.professor,
              disciplina,
            };
            info.count++;
            alocacoesFeitas++;
          }
        }
      });

      horarios.forEach((horario, i) => {
        if (!horario) {
          let disciplinasFaltantes = Array.from(
            cargaDisciplinas.entries()
          ).filter(([_, info]) => info.count < 4);

          if (disciplinasFaltantes.length > 0) {
            let [disciplina, info] =
              disciplinasFaltantes[
                Math.floor(Math.random() * disciplinasFaltantes.length)
              ];
            horarios[i] = { professor: info.professor, disciplina };
            info.count++;
          }
        }
      });

      scheduleDataSet.push(
        horarios.map((h) => `${h.professor}-${h.disciplina}`)
      );
    }
    return scheduleDataSet;
  }

  // Avaliar quantidades de horarios que o professor tem no mesmo horario, considerando que a cada 5
  function popAvaliation(scheduleDataSet) {
    return scheduleDataSet.map((s) => {
      let fitness = 0;
      const daysOfWeek = 5;
      const diciplinesOfDay = 4;

    for (let day = 0; day < daysOfWeek; day++) {
        for (let j = 0; j< diciplinesOfDay; j++) {
          const currentTeacher = s[j].substring(0, 3);
            const nextSchedule = s[(j + 1) * 20];
            if (nextSchedule) {
              const nextTeacher = nextSchedule.substring(0, 3);
              if (currentTeacher === nextTeacher) {
                fitness++;
              }
            }
        }
      }
      return {fitness, schedule: s};
    });
  }

  // Chama a função para popular os horários
  const geracoes = 50; // Número de gerações desejadas
  const scheduleDataSet = popularHorarios(geracoes);
  const avaliation = popAvaliation(scheduleDataSet);

  const table = document.createElement("table");
  table.style.border = "1px solid black";
  table.style.borderCollapse = "collapse";

  avaliation.forEach(({fitness, schedule}) => {
    const row = document.createElement("tr");
    row.style.border = "1px solid black"; // Add border to rows
    const cell = document.createElement("td");
    cell.textContent = `Fitness: ${fitness}`;
    row.appendChild(cell);
    schedule.forEach((discipline) => {
      const cell = document.createElement("td");
      cell.textContent = discipline;
      cell.style.border = "1px solid black"; // Add border to cells
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  //   Append the table to the body or a specific container
  document.body.appendChild(table);
});
