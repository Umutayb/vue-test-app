<template>
  <div class="page">
    <h1>Table</h1>
    <p class="page-desc">Sortable, filterable, paginated data table with row selection</p>

    <div class="table-controls">
      <input
        type="text"
        v-model="searchQuery"
        data-testid="table-search"
        placeholder="Search..."
        class="search-input"
      />
      <span class="selected-count" data-testid="table-selected-count">{{ selectedEmails.length }} rows selected</span>
    </div>

    <div class="table-wrapper">
      <table class="data-table" data-testid="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                data-testid="table-select-all"
                :checked="allSelected"
                @change="toggleAll"
              />
            </th>
            <th
              v-for="col in columns"
              :key="col.key"
              class="sortable-header"
              :data-testid="`table-header-${col.key}`"
              @click="sortBy(col.key)"
            >
              {{ col.label }}
              <span class="sort-icon">{{ sortColumn === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in paginatedRows"
            :key="row.email"
            :data-testid="`table-row-${i + 1}`"
            :class="{ selected: selectedEmails.includes(row.email) }"
          >
            <td>
              <input
                type="checkbox"
                :data-testid="`table-row-checkbox-${i + 1}`"
                :checked="selectedEmails.includes(row.email)"
                @change="toggleRow(row.email)"
              />
            </td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.role }}</td>
            <td><span class="status-badge" :class="`status-${row.status.toLowerCase()}`">{{ row.status }}</span></td>
            <td>{{ row.joinDate }}</td>
          </tr>
          <tr v-if="paginatedRows.length === 0">
            <td colspan="6" class="empty-row">No results</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button data-testid="table-prev" :disabled="currentPage === 1" @click="currentPage--">Prev</button>
      <span data-testid="table-page-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button data-testid="table-next" :disabled="currentPage >= totalPages" @click="currentPage++">Next</button>
    </div>
  </div>
</template>

<script>
const ALL_ROWS = [
  { name: 'Alice Martin',   email: 'alice@example.com',   role: 'Admin',   status: 'Active',   joinDate: '2022-01-15' },
  { name: 'Bob Chen',       email: 'bob@example.com',     role: 'User',    status: 'Active',   joinDate: '2022-03-22' },
  { name: 'Carol White',    email: 'carol@example.com',   role: 'Editor',  status: 'Inactive', joinDate: '2022-05-10' },
  { name: 'David Kim',      email: 'david@example.com',   role: 'User',    status: 'Active',   joinDate: '2022-07-08' },
  { name: 'Eve Torres',     email: 'eve@example.com',     role: 'Admin',   status: 'Active',   joinDate: '2022-09-14' },
  { name: 'Frank Johnson',  email: 'frank@example.com',   role: 'User',    status: 'Pending',  joinDate: '2022-11-01' },
  { name: 'Grace Lee',      email: 'grace@example.com',   role: 'Editor',  status: 'Active',   joinDate: '2023-01-20' },
  { name: 'Henry Park',     email: 'henry@example.com',   role: 'User',    status: 'Inactive', joinDate: '2023-03-05' },
  { name: 'Iris Nguyen',    email: 'iris@example.com',    role: 'User',    status: 'Active',   joinDate: '2023-05-17' },
  { name: 'Jack Wilson',    email: 'jack@example.com',    role: 'Editor',  status: 'Active',   joinDate: '2023-07-22' },
  { name: 'Karen Brown',    email: 'karen@example.com',   role: 'Admin',   status: 'Active',   joinDate: '2023-09-30' },
  { name: 'Leo Davis',      email: 'leo@example.com',     role: 'User',    status: 'Pending',  joinDate: '2023-11-11' },
  { name: 'Mia Taylor',     email: 'mia@example.com',     role: 'User',    status: 'Active',   joinDate: '2024-01-08' },
  { name: 'Nate Anderson',  email: 'nate@example.com',    role: 'Editor',  status: 'Inactive', joinDate: '2024-03-14' },
  { name: 'Olivia Moore',   email: 'olivia@example.com',  role: 'User',    status: 'Active',   joinDate: '2024-05-25' },
  { name: 'Paul Jackson',   email: 'paul@example.com',    role: 'User',    status: 'Active',   joinDate: '2024-07-19' },
  { name: 'Quinn Harris',   email: 'quinn@example.com',   role: 'Admin',   status: 'Active',   joinDate: '2024-09-03' },
  { name: 'Rachel Clark',   email: 'rachel@example.com',  role: 'Editor',  status: 'Pending',  joinDate: '2024-11-27' },
  { name: 'Sam Lewis',      email: 'sam@example.com',     role: 'User',    status: 'Active',   joinDate: '2025-01-15' },
  { name: 'Tina Walker',    email: 'tina@example.com',    role: 'User',    status: 'Inactive', joinDate: '2025-03-08' },
];

const PAGE_SIZE = 5;

export default {
  data() {
    return {
      rows: ALL_ROWS,
      searchQuery: '',
      sortColumn: '',
      sortDir: 'asc',
      currentPage: 1,
      selectedEmails: [],
      columns: [
        { key: 'name',     label: 'Name' },
        { key: 'email',    label: 'Email' },
        { key: 'role',     label: 'Role' },
        { key: 'status',   label: 'Status' },
        { key: 'joindate', label: 'Join Date' },
      ]
    };
  },
  computed: {
    filteredRows() {
      const q = this.searchQuery.toLowerCase();
      if (!q) return this.rows;
      return this.rows.filter(r => Object.values(r).some(v => v.toLowerCase().includes(q)));
    },
    sortedRows() {
      if (!this.sortColumn) return this.filteredRows;
      // column key 'joindate' maps to property 'joinDate'
      const prop = this.sortColumn === 'joindate' ? 'joinDate' : this.sortColumn;
      return [...this.filteredRows].sort((a, b) => {
        const av = a[prop] || ''; const bv = b[prop] || '';
        return this.sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    },
    totalPages() { return Math.max(1, Math.ceil(this.sortedRows.length / PAGE_SIZE)); },
    paginatedRows() {
      const start = (this.currentPage - 1) * PAGE_SIZE;
      return this.sortedRows.slice(start, start + PAGE_SIZE);
    },
    allSelected() {
      return this.paginatedRows.length > 0 &&
        this.paginatedRows.every(r => this.selectedEmails.includes(r.email));
    }
  },
  watch: {
    searchQuery() { this.currentPage = 1; },
    sortColumn() { this.currentPage = 1; }
  },
  methods: {
    sortBy(col) {
      if (this.sortColumn === col) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = col;
        this.sortDir = 'asc';
      }
    },
    toggleRow(email) {
      const idx = this.selectedEmails.indexOf(email);
      if (idx >= 0) this.selectedEmails.splice(idx, 1);
      else this.selectedEmails.push(email);
    },
    toggleAll(e) {
      this.paginatedRows.forEach(r => {
        const idx = this.selectedEmails.indexOf(r.email);
        if (e.target.checked && idx < 0) this.selectedEmails.push(r.email);
        else if (!e.target.checked && idx >= 0) this.selectedEmails.splice(idx, 1);
      });
    }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 960px; }
.page-desc { color: var(--text-secondary); margin-bottom: 1.5rem; }
.table-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.search-input {
  padding: 0.5rem 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-primary); font-size: 0.875rem; width: 280px;
}
.search-input:focus { outline: none; border-color: var(--accent); }
.selected-count { font-size: 0.875rem; color: var(--text-secondary); }
.table-wrapper { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius); }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
.data-table th {
  background: var(--bg-sidebar); padding: 0.75rem 1rem; text-align: left;
  font-weight: 600; color: var(--text-secondary); border-bottom: 1px solid var(--border);
}
.sortable-header { cursor: pointer; user-select: none; }
.sortable-header:hover { color: var(--accent); }
.sort-icon { font-size: 0.7rem; margin-left: 4px; }
.data-table td { padding: 0.6rem 1rem; border-bottom: 1px solid var(--border); color: var(--text-primary); }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr.selected td { background: var(--accent-light); }
.empty-row { text-align: center; color: var(--text-muted); padding: 2rem !important; }
.status-badge { padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: 500; }
.status-active   { background: #dcfce7; color: #16a34a; }
.status-inactive { background: var(--border); color: var(--text-muted); }
.status-pending  { background: #fef9c3; color: #ca8a04; }
.pagination { display: flex; align-items: center; gap: 1rem; margin-top: 1rem; justify-content: flex-end; }
.pagination button {
  padding: 0.4rem 0.9rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-secondary); cursor: pointer;
}
.pagination button:disabled { opacity: 0.4; cursor: not-allowed; }
.pagination button:not(:disabled):hover { background: var(--border); }
.pagination span { font-size: 0.875rem; color: var(--text-secondary); }
</style>
