const employees = [
  { id: 1, name: "Carlos Henrique Alves", role: "Diretor Geral", sector: "Diretoria Executiva", managerId: null },

  { id: 2, name: "Mariana Costa Lima", role: "Gerente de Recursos Humanos", sector: "Recursos Humanos", managerId: 1 },
  { id: 3, name: "Ricardo Mendes Souza", role: "Gerente de Produção", sector: "Produção", managerId: 1 },
  { id: 4, name: "Fernanda Oliveira Rocha", role: "Gerente de Tecnologia da Informação", sector: "Tecnologia da Informação", managerId: 1 },
  { id: 5, name: "André Luiz Martins", role: "Gerente Financeiro", sector: "Financeiro", managerId: 1 },
  { id: 6, name: "Patrícia Gomes Ferreira", role: "Gerente Comercial", sector: "Comercial", managerId: 1 },

  { id: 7, name: "Paulo Martins", role: "Analista de RH", sector: "Recursos Humanos", managerId: 2 },
  { id: 8, name: "Juliana Ferreira", role: "Assistente de RH", sector: "Recursos Humanos", managerId: 2 },
  { id: 9, name: "Larissa Almeida", role: "Analista de Treinamento", sector: "Recursos Humanos", managerId: 2 },
  { id: 10, name: "Bruno Tavares", role: "Supervisor de Produção", sector: "Produção", managerId: 3 },
  { id: 11, name: "Camila Rodrigues", role: "Coordenadora de Qualidade", sector: "Produção", managerId: 3 },
  { id: 12, name: "Leonardo Pires", role: "Analista de Processos", sector: "Produção", managerId: 3 },
  { id: 13, name: "Lucas Ribeiro", role: "Analista de Sistemas", sector: "Tecnologia da Informação", managerId: 4 },
  { id: 14, name: "Renata Lopes", role: "Suporte de TI", sector: "Tecnologia da Informação", managerId: 4 },
  { id: 15, name: "Thiago Menezes", role: "Administrador de Redes", sector: "Tecnologia da Informação", managerId: 4 },
  { id: 16, name: "Aline Batista", role: "Analista Financeira", sector: "Financeiro", managerId: 5 },
  { id: 17, name: "Gustavo Farias", role: "Assistente Contábil", sector: "Financeiro", managerId: 5 },
  { id: 18, name: "Débora Nunes", role: "Controladora", sector: "Financeiro", managerId: 5 },
  { id: 19, name: "Felipe Cardoso", role: "Coordenador Comercial", sector: "Comercial", managerId: 6 },
  { id: 20, name: "Vanessa Moura", role: "Executiva de Vendas", sector: "Comercial", managerId: 6 },
  { id: 21, name: "Roberta Silva", role: "Analista de Atendimento", sector: "Comercial", managerId: 6 },

  { id: 22, name: "Igor Santana", role: "Auxiliar de Produção", sector: "Produção", managerId: 10 },
  { id: 23, name: "Mateus Oliveira", role: "Auxiliar de Produção", sector: "Produção", managerId: 10 },
  { id: 24, name: "Sabrina Costa", role: "Inspetora de Qualidade", sector: "Produção", managerId: 11 },
  { id: 25, name: "Vinícius Azevedo", role: "Técnico de Processos", sector: "Produção", managerId: 12 },
  { id: 26, name: "Beatriz Rocha", role: "Assistente de TI", sector: "Tecnologia da Informação", managerId: 13 },
  { id: 27, name: "Eduardo Lima", role: "Técnico de Infraestrutura", sector: "Tecnologia da Informação", managerId: 15 },
  { id: 28, name: "Marcos Vinicius", role: "Analista de Segurança", sector: "Tecnologia da Informação", managerId: 15 },
  { id: 29, name: "Tatiane Souza", role: "Assistente Financeira", sector: "Financeiro", managerId: 16 },
  { id: 30, name: "Rafael Barros", role: "Auxiliar Contábil", sector: "Financeiro", managerId: 17 },
  { id: 31, name: "Henrique Prado", role: "Consultor de Vendas", sector: "Comercial", managerId: 19 },
  { id: 32, name: "Gabriela Freitas", role: "Consultora Comercial", sector: "Comercial", managerId: 19 },
  { id: 33, name: "Mônica Ribeiro", role: "Assistente Comercial", sector: "Comercial", managerId: 21 },
  { id: 34, name: "Rodrigo Nascimento", role: "Auxiliar Administrativo", sector: "Administrativo", managerId: 5 },
  { id: 35, name: "Priscila Duarte", role: "Analista Administrativo", sector: "Administrativo", managerId: 5 },
  { id: 36, name: "João Pedro Lima", role: "Comprador Júnior", sector: "Suprimentos", managerId: 3 },
  { id: 37, name: "Amanda Correia", role: "Assistente de Compras", sector: "Suprimentos", managerId: 36 },
  { id: 38, name: "Diego Santos", role: "Planejador de Produção", sector: "Produção", managerId: 12 },
  { id: 39, name: "Brenda Oliveira", role: "Analista de PCP", sector: "Produção", managerId: 38 },
  { id: 40, name: "Caio Fernandes", role: "Técnico de Suporte", sector: "Tecnologia da Informação", managerId: 14 }
];

const visualOrgChart = document.getElementById("visualOrgChart");
const orgContainer = document.getElementById("orgContainer");
const searchInput = document.getElementById("searchInput");
const sectorFilter = document.getElementById("sectorFilter");
const totalEmployeesEl = document.getElementById("totalEmployees");
const totalSectorsEl = document.getElementById("totalSectors");
const totalLevelsEl = document.getElementById("totalLevels");

function getEmployeeById(id) {
  return employees.find(emp => emp.id === id);
}

function getChildren(id, data = employees) {
  return data.filter(emp => emp.managerId === id);
}

function populateSectorFilter() {
  const sectors = [...new Set(employees.map(emp => emp.sector))].sort();

  sectors.forEach(sector => {
    const option = document.createElement("option");
    option.value = sector;
    option.textContent = sector;
    sectorFilter.appendChild(option);
  });
}

/* =========================
   ORGANOGRAMA VISUAL
========================= */
function createTreeNode(employee, data) {
  const children = data.filter(emp => emp.managerId === employee.id);

  const li = document.createElement("li");

  const card = document.createElement("div");
  card.className = "org-card";
  card.innerHTML = `
    <div class="org-card-name">${employee.name}</div>
    <div class="org-card-role">${employee.role}</div>
    <div class="org-card-sector">${employee.sector}</div>
  `;

  li.appendChild(card);

  if (children.length > 0) {
    const ul = document.createElement("ul");

    children.forEach(child => {
      ul.appendChild(createTreeNode(child, data));
    });

    li.appendChild(ul);
  }

  return li;
}

function renderVisualOrgChart() {
  const roots = employees.filter(emp => emp.managerId === null);

  const tree = document.createElement("ul");
  tree.className = "org-tree";

  roots.forEach(root => {
    tree.appendChild(createTreeNode(root, employees));
  });

  visualOrgChart.innerHTML = "";
  visualOrgChart.appendChild(tree);
}

/* =========================
   VISÃO COMPLETA INFERIOR
========================= */
function buildLevels(data) {
  const levels = [];
  const queue = [];

  const roots = data.filter(emp => emp.managerId === null);

  roots.forEach(root => {
    queue.push({ ...root, level: 1 });
  });

  while (queue.length > 0) {
    const current = queue.shift();

    if (!levels[current.level - 1]) {
      levels[current.level - 1] = [];
    }

    levels[current.level - 1].push(current);

    const children = data.filter(emp => emp.managerId === current.id);
    children.forEach(child => {
      queue.push({ ...child, level: current.level + 1 });
    });
  }

  return levels.filter(level => level && level.length > 0);
}

function filterEmployees() {
  const term = searchInput.value.trim().toLowerCase();
  const selectedSector = sectorFilter.value;

  return employees.filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(term) ||
      emp.role.toLowerCase().includes(term) ||
      emp.sector.toLowerCase().includes(term);

    const matchesSector =
      selectedSector === "todos" || emp.sector === selectedSector;

    return matchesSearch && matchesSector;
  });
}

function renderDirectory() {
  const filtered = filterEmployees();
  const filteredIds = new Set(filtered.map(emp => emp.id));
  const expandedIds = new Set(filteredIds);

  filtered.forEach(emp => {
    let currentManagerId = emp.managerId;

    while (currentManagerId !== null) {
      expandedIds.add(currentManagerId);
      const manager = getEmployeeById(currentManagerId);
      currentManagerId = manager ? manager.managerId : null;
    }
  });

  const finalData = employees.filter(emp => expandedIds.has(emp.id));
  const levels = buildLevels(finalData);

  orgContainer.innerHTML = "";

  if (filtered.length === 0) {
    orgContainer.innerHTML = `
      <div class="empty-state">
        Nenhum colaborador encontrado com os filtros informados.
      </div>
    `;
    totalEmployeesEl.textContent = "0";
    totalSectorsEl.textContent = "0";
    totalLevelsEl.textContent = "0";
    return;
  }

  levels.forEach((level, index) => {
    const levelBlock = document.createElement("div");
    levelBlock.className = "level-block";

    const levelHeader = document.createElement("div");
    levelHeader.className = "level-header";

    const levelTitle = document.createElement("h3");
    levelTitle.className = "level-title";
    levelTitle.textContent = `Nível ${index + 1}`;

    const levelCount = document.createElement("span");
    levelCount.className = "level-count";
    levelCount.textContent = `${level.length} colaborador(es)`;

    levelHeader.appendChild(levelTitle);
    levelHeader.appendChild(levelCount);

    const levelGrid = document.createElement("div");
    levelGrid.className = "level-grid";

    level.forEach(emp => {
      const manager = emp.managerId ? getEmployeeById(emp.managerId) : null;

      const card = document.createElement("div");
      card.className = "employee-card";

      card.innerHTML = `
        <div class="employee-name">${emp.name}</div>
        <div class="employee-role">${emp.role}</div>
        <div class="employee-sector">${emp.sector}</div>
        <div class="employee-manager">
          ${manager ? `Reporta para: ${manager.name}` : "Topo da hierarquia"}
        </div>
      `;

      levelGrid.appendChild(card);
    });

    levelBlock.appendChild(levelHeader);
    levelBlock.appendChild(levelGrid);
    orgContainer.appendChild(levelBlock);
  });

  const sectors = new Set(filtered.map(emp => emp.sector));
  totalEmployeesEl.textContent = filtered.length;
  totalSectorsEl.textContent = sectors.size;
  totalLevelsEl.textContent = levels.length;
}

searchInput.addEventListener("input", renderDirectory);
sectorFilter.addEventListener("change", renderDirectory);

populateSectorFilter();
renderVisualOrgChart();
renderDirectory();

/*
Para adicionar mais colaboradores, siga este padrão:

{
  id: 41,
  name: "Nome do Colaborador",
  role: "Função",
  sector: "Setor",
  managerId: 10
}

O managerId deve apontar para o id do gestor direto.
*/