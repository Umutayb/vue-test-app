<template>
  <div class="page">
    <h1>Dynamic Form</h1>
    <p class="page-desc">Form with dynamically added and removed fields</p>

    <form data-testid="dynamic-form" @submit.prevent="onSubmit">
      <div
        v-for="(field, index) in fields"
        :key="field.id"
        class="field-row"
      >
        <label class="field-label">{{ field.label }}</label>
        <input
          v-model="field.value"
          :data-testid="`dynamic-field-${field.id}`"
          class="field-input"
          type="text"
          :placeholder="field.label"
        />
        <button
          v-if="fields.length > 1"
          type="button"
          :data-testid="`dynamic-remove-${field.id}`"
          class="btn-remove"
          @click="removeField(index)"
        >
          Remove
        </button>
      </div>

      <div class="form-actions">
        <button
          type="button"
          data-testid="dynamic-add"
          class="btn-add"
          @click="addField"
        >
          Add Field
        </button>
        <button
          type="submit"
          data-testid="dynamic-submit"
          class="btn-submit"
        >
          Submit
        </button>
      </div>
    </form>

    <div v-if="submittedValues" data-testid="dynamic-result" class="result">
      <h2>Submitted Values</h2>
      <ul>
        <li v-for="(value, label) in submittedValues" :key="label">
          <strong>{{ label }}:</strong> {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [{ id: 1, label: 'Field 1', value: '' }],
      nextId: 2,
      fieldCount: 1,
      submittedValues: null,
    }
  },
  methods: {
    addField() {
      this.fieldCount++;
      this.fields.push({ id: this.nextId++, label: `Field ${this.fieldCount}`, value: '' });
    },
    removeField(index) {
      if (this.fields.length <= 1) return;
      this.fields.splice(index, 1);
    },
    onSubmit() {
      const result = {};
      for (const field of this.fields) {
        result[field.label] = field.value;
      }
      this.submittedValues = result;
    },
  },
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }

.field-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

.field-label {
  min-width: 6rem;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.field-input {
  flex: 1;
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 0.875rem;
}

.btn-remove {
  padding: 0.3rem 0.7rem;
  font-size: 0.8rem;
  border: 1px solid #ef4444;
  border-radius: var(--radius);
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  white-space: nowrap;
}
.btn-remove:hover { background: rgba(239, 68, 68, 0.08); }

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.btn-add,
.btn-submit {
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  background: var(--accent);
  color: #fff;
}
.btn-add:hover,
.btn-submit:hover { background: var(--accent-hover); }

.result {
  margin-top: 2rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-primary);
}
.result h2 {
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}
.result ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.result li { font-size: 0.875rem; color: var(--text-secondary); }
.result li strong { color: var(--text-primary); }
</style>
