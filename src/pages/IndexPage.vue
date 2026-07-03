<template>
  <q-page class="q-pa-lg bg-slate-50">
    <div class="max-width-container q-mx-auto">
      <div class="row items-center justify-between q-mb-xl hero-section q-pa-xl text-white rounded-2xl shadow-6">
        <div class="col-12 col-md-8">
          <h1 class="text-h3 text-weight-bold q-my-none text-shadow flex items-center gap-sm">
            <q-icon name="contacts" class="q-mr-sm" size="50px" />
            Directorio Corporativo
          </h1>
          <p class="text-subtitle1 q-mt-md q-mb-none opacity-90 font-light">
            Busque, explore y consulte la información detallada de todos los colaboradores de la organización de forma
            rápida y eficiente.
          </p>
        </div>
        <div class="col-12 col-md-4 text-right gt-sm q-pr-md">
          <q-btn outline color="white" icon="group_add" label="Registrar Empleado" no-caps
            class="text-weight-bold q-px-md q-py-sm btn-action-hover" @click="notifyMock" />
        </div>
      </div>

      <div class="row q-col-gutter-lg q-mb-lg">
        <div class="col-12 col-sm-4">
          <q-card class="stat-card shadow-2 rounded-xl">
            <q-card-section class="row items-center justify-between q-py-md">
              <div>
                <div class="text-grey-6 text-caption text-uppercase text-weight-bold letter-spacing-1">Colaboradores
                  Totales</div>
                <div class="text-h4 text-weight-bold text-slate-800 q-mt-xs">{{ totalUsers }}</div>
              </div>
              <div class="stat-icon-wrapper bg-blue-50 text-blue-6 rounded-lg q-pa-sm">
                <q-icon name="groups" size="30px" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-4">
          <q-card class="stat-card shadow-2 rounded-xl">
            <q-card-section class="row items-center justify-between q-py-md">
              <div>
                <div class="text-grey-6 text-caption text-uppercase text-weight-bold letter-spacing-1">Promedio de Edad
                </div>
                <div class="text-h4 text-weight-bold text-slate-800 q-mt-xs">{{ averageAge }} años</div>
              </div>
              <div class="stat-icon-wrapper bg-teal-50 text-teal-6 rounded-lg q-pa-sm">
                <q-icon name="analytics" size="30px" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-4">
          <q-card class="stat-card shadow-2 rounded-xl">
            <q-card-section class="row items-center justify-between q-py-md">
              <div>
                <div class="text-grey-6 text-caption text-uppercase text-weight-bold letter-spacing-1">Géneros
                  Registrados</div>
                <div class="text-h4 text-weight-bold text-slate-800 q-mt-xs">
                  <span class="text-pink-6">F: {{ femaleCount }}</span> | <span class="text-blue-6">M: {{ maleCount
                    }}</span>
                </div>
              </div>
              <div class="stat-icon-wrapper bg-purple-50 text-purple-6 rounded-lg q-pa-sm">
                <q-icon name="wc" size="30px" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-card class="directory-card shadow-4 rounded-2xl overflow-hidden border-grey-100">
        <q-card-section class="bg-white q-pa-lg row items-center justify-between q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <div class="text-h6 text-weight-bold text-slate-800">Búsqueda de Colaboradores</div>
            <div class="text-caption text-grey-6">Busque colaboradores por nombre o apellido en tiempo real</div>
          </div>
          <div class="col-12 col-sm-6 col-md-5">
            <q-input v-model="filter" outlined dense placeholder="Buscar por nombre o apellido..."
              class="search-input" color="primary" bg-color="white">
              <template v-slot:append>
                <q-icon v-if="filter" name="clear" class="cursor-pointer" @click="filter = ''" />
                <q-icon name="search" color="primary" />
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-none">
          <q-table :rows="rows" :columns="columns" v-model:pagination="pagination" row-key="id" :loading="loading"
            @request="onRequest" binary-state-sort flat square class="employees-table"
            :rows-per-page-options="[5, 10, 20, 50]"
            rows-per-page-label="Registros por página:">
            <template v-slot:body-cell-image="props">
              <q-td :props="props" class="text-center">
                <q-avatar size="46px" class="avatar-table shadow-1">
                  <img :src="props.row.image" alt="Avatar" />
                </q-avatar>
              </q-td>
            </template>

            <template v-slot:body-cell-fullName="props">
              <q-td :props="props">
                <div class="text-weight-bold text-slate-800">{{ props.value }}</div>
                <div class="text-caption text-grey-6">@{{ props.row.username }}</div>
              </q-td>
            </template>

            <template v-slot:body-cell-age="props">
              <q-td :props="props" class="text-center">
                <q-badge color="grey-2" text-color="slate-800"
                  class="q-py-xs q-px-sm text-weight-medium border-grey-300">
                  {{ props.value }} años
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-gender="props">
              <q-td :props="props" class="text-center">
                <q-chip size="sm" :color="props.value === 'female' ? 'pink-5' : 'blue-5'" text-color="white"
                  class="text-weight-bold" :icon="props.value === 'female' ? 'female' : 'male'">
                  {{ props.value === 'female' ? 'F' : 'M' }}
                </q-chip>
              </q-td>
            </template>

            <template v-slot:body-cell-email="props">
              <q-td :props="props">
                <a :href="'mailto:' + props.value" class="email-link text-primary flex items-center no-decoration">
                  <q-icon name="mail" size="14px" class="q-mr-xs" />
                  {{ props.value }}
                  <q-tooltip>Enviar correo electrónico</q-tooltip>
                </a>
              </q-td>
            </template>

            <template v-slot:body-cell-companyName="props">
              <q-td :props="props">
                <span class="text-weight-medium text-slate-800">{{ props.value }}</span>
              </q-td>
            </template>

            <template v-slot:body-cell-companyTitle="props">
              <q-td :props="props">
                <q-badge outline color="indigo-7" class="q-py-xs q-px-sm">
                  {{ props.value }}
                </q-badge>
              </q-td>
            </template>

            <template v-slot:body-cell-location="props">
              <q-td :props="props">
                <div class="text-slate-800 text-weight-medium">{{ props.row.address?.city }}</div>
                <div class="text-caption text-grey-6">{{ props.row.address?.country }}</div>
              </q-td>
            </template>

            <template v-slot:body-cell-action="props">
              <q-td :props="props" class="text-center">
                <q-btn flat round color="primary" icon="visibility" size="sm" class="action-btn-hover"
                  @click="viewUserDetail(props.row)">
                  <q-tooltip>Ver detalle completo</q-tooltip>
                </q-btn>
              </q-td>
            </template>

            <template v-slot:no-data>
              <div class="q-pa-xl no-data-container text-center">
                <q-icon :name="filter ? 'search_off' : 'group_off'" size="64px" :color="filter ? 'orange-5' : 'grey-4'" />
                <div class="text-h6 text-weight-bold text-grey-7 q-mt-md">
                  {{ filter ? 'Sin resultados' : 'Directorio vacío' }}
                </div>
                <div class="text-body2 text-grey-5 q-mt-sm">
                  {{ filter ? 'No se encontraron colaboradores que coincidan con "' + filter + '".' : 'No hay colaboradores registrados en el directorio.' }}
                </div>
              </div>
            </template>

            <template v-slot:loading>
              <q-inner-loading showing color="primary">
                <q-spinner-gears size="60px" color="primary" />
                <div class="text-primary text-subtitle1 text-weight-bold q-mt-md">Cargando directorio...</div>
              </q-inner-loading>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>

    <user-detail-dialog v-if="showDetail && selectedUser" v-model="showDetail" :user="selectedUser" />
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import UserDetailDialog from '@/components/UserDetailDialog.vue'

const $q = useQuasar()

const rows = ref([])
const loading = ref(false)
const filter = ref('')
const totalUsers = ref(0)
const averageAge = ref(0)
const femaleCount = ref(0)
const maleCount = ref(0)

const showDetail = ref(false)
const selectedUser = ref(null)

const pagination = ref({
  sortBy: 'firstName',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

const columns = [
  {
    name: 'image',
    label: 'Foto',
    field: 'image',
    align: 'center',
    style: 'width: 60px'
  },
  {
    name: 'fullName',
    label: 'Colaborador',
    field: row => `${row.firstName} ${row.lastName}`,
    align: 'left',
    sortable: true
  },
  {
    name: 'age',
    label: 'Edad',
    field: 'age',
    align: 'center',
    sortable: true
  },
  {
    name: 'gender',
    label: 'Gen',
    field: 'gender',
    align: 'center',
    sortable: true
  },
  {
    name: 'email',
    label: 'Correo Electrónico',
    field: 'email',
    align: 'left',
    sortable: true
  },
  {
    name: 'companyName',
    label: 'Empresa',
    field: row => row.company?.name || 'N/A',
    align: 'left',
    sortable: true
  },
  {
    name: 'companyTitle',
    label: 'Cargo',
    field: row => row.company?.title || 'N/A',
    align: 'left',
    sortable: true
  },
  {
    name: 'location',
    label: 'Ubicación',
    field: row => row.address?.city || '',
    align: 'left',
    sortable: true
  },
  {
    name: 'action',
    label: 'Acciones',
    field: 'action',
    align: 'center',
    style: 'width: 80px'
  }
]

async function onRequest(props) {
  const { page, rowsPerPage, sortBy, descending } = props.pagination
  const filterValue = filter.value

  loading.value = true

  const limit = rowsPerPage
  const skip = (page - 1) * rowsPerPage

  try {
    let url = ''
    if (filterValue) {
      url = `https://dummyjson.com/users/search?q=${encodeURIComponent(filterValue)}&limit=${limit}&skip=${skip}`
    } else {
      url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
    }

    if (sortBy) {
      url += `&sortBy=${sortBy}&order=${descending ? 'desc' : 'asc'}`
    }

    const response = await fetch(url)
    if (!response.ok) throw new Error('Error al consultar el servidor corporativo')

    const data = await response.json()

    rows.value = data.users

    pagination.value.rowsNumber = data.total
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending

  } catch (error) {
    console.error('Error fetching users:', error)
    $q.notify({
      color: 'negative',
      position: 'bottom-right',
      message: 'No se pudo cargar la información del directorio corporativo.',
      icon: 'report_problem'
    })
  } finally {
    loading.value = false
  }
}

async function fetchDirectoryStats() {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=250')
    if (response.ok) {
      const data = await response.json()
      totalUsers.value = data.total

      const totalAge = data.users.reduce((sum, u) => sum + u.age, 0)
      averageAge.value = Math.round(totalAge / data.users.length)

      femaleCount.value = data.users.filter(u => u.gender === 'female').length
      maleCount.value = data.users.filter(u => u.gender === 'male').length
    }
  } catch (error) {
    console.error('Error fetching statistics:', error)
  }
}

let searchTimeout = null
watch(filter, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.page = 1
    onRequest({
      pagination: pagination.value,
      filter: newValue
    })
  }, 500)
})

function viewUserDetail(row) {
  selectedUser.value = row
  showDetail.value = true
}

function notifyMock() {
  $q.notify({
    color: 'info',
    position: 'top-right',
    message: 'Esta funcionalidad es una demostración. Registro de empleados fuera de alcance.',
    icon: 'info'
  })
}

onMounted(() => {
  onRequest({
    pagination: pagination.value,
    filter: filter.value
  })
  fetchDirectoryStats()
})
</script>

<style lang="scss" scoped>
.max-width-container {
  max-width: 1300px;
}

.hero-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f766e 100%);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(15, 118, 110, 0.3), 0 8px 10px -6px rgba(15, 118, 110, 0.3);

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    pointer-events: none;
  }
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.stat-card {
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.15);
  }
}

.stat-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.directory-card {
  background-color: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.search-input {
  max-width: 100%;

  :deep(.q-field__control) {
    border-radius: 10px;
  }
}

.employees-table {
  background-color: transparent;
  width: 100%;

  :deep(thead tr th) {
    font-weight: 700;
    color: #475569;
    background-color: #f8fafc;
    border-bottom: 2px solid #e2e8f0;
    padding: 16px;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
  }

  :deep(tbody tr) {
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f1f5f9;
    }
  }

  :deep(tbody td) {
    padding: 14px 16px;
    border-bottom: 1px solid #f1f5f9;
  }

  :deep(tbody td.text-center) {
    text-align: center !important;
  }
}

.avatar-table {
  border: 2px solid #f1f5f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.email-link {
  color: var(--q-primary);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
    opacity: 0.9;
  }
}

.btn-action-hover {
  transition: all 0.3s ease;

  &:hover {
    background-color: white !important;
    color: #0f766e !important;
  }
}

.action-btn-hover {
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.15);
    background-color: rgba(25, 118, 210, 0.08);
  }
}

.gap-sm {
  gap: 12px;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

.border-grey-100 {
  border: 1px solid #f1f5f9;
}

.border-grey-300 {
  border: 1px solid #e2e8f0;
}

.no-data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

</style>
