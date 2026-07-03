<template>
  <q-page class="q-pa-lg bg-slate-50">
    <div class="max-width-container q-mx-auto">
      <div class="row items-center justify-between q-mb-xl hero-section q-pa-xl text-white rounded-2xl shadow-6">
        <div class="col-12 col-md-8">
          <h1 class="text-h3 text-weight-bold q-my-none text-shadow flex items-center gap-sm">
            <q-icon name="shopping_cart" class="q-mr-sm" size="50px" />
            Carrito de Compras
          </h1>
          <p class="text-subtitle1 q-mt-md q-mb-none opacity-90 font-light">
            Seleccione un colaborador para visualizar los productos de su carrito de compras.
          </p>
        </div>
      </div>

      <div class="row q-col-gutter-lg q-mb-lg">
        <div class="col-12">
          <q-card class="selector-card shadow-3 rounded-xl">
            <q-card-section class="bg-teal-700 text-white q-pa-md rounded-t-xl">
              <div class="text-h6 text-weight-bold flex items-center">
                <q-icon name="person" class="q-mr-sm" />
                Colaborador
                <q-chip v-if="selectedUser" size="sm" color="white" text-color="teal-700" class="q-ml-sm text-weight-bold">
                  #{{ selectedUser.id }}
                </q-chip>
              </div>
            </q-card-section>

            <q-card-section class="q-pa-md">
              <q-input
                v-model="search"
                outlined
                dense
                placeholder="Buscar por nombre, cargo o empresa..."
                class="search-input"
                color="teal-7"
                bg-color="white"
                :loading="searching"
                debounce="400"
                @update:model-value="onSearch"
              >
                <template v-slot:append>
                  <q-icon v-if="search" name="clear" class="cursor-pointer" @click="clearUser" />
                  <q-icon name="search" color="teal-7" />
                </template>
              </q-input>

              <q-list v-if="searchResults.length > 0 && !selectedUser" bordered separator class="q-mt-sm search-results rounded-lg">
                <q-item v-for="u in searchResults" :key="u.id" clickable v-close-popup class="search-result-item" @click="selectUser(u)">
                  <q-item-section avatar>
                    <q-avatar size="36px">
                      <img :src="u.image" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium">{{ u.firstName }} {{ u.lastName }}</q-item-label>
                    <q-item-label caption class="text-grey-6">{{ u.company?.title }} — {{ u.company?.name }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-chip size="sm" :color="u.gender === 'female' ? 'pink-4' : 'blue-4'" text-color="white">
                      {{ u.gender === 'female' ? 'F' : 'M' }}
                    </q-chip>
                  </q-item-section>
                </q-item>
              </q-list>

              <div v-if="searched && searchResults.length === 0 && !selectedUser && !searching" class="q-mt-sm no-results q-pa-md text-center rounded-lg">
                <q-icon name="search_off" size="28px" class="text-grey-4 q-mb-xs block" />
                <div class="text-caption text-grey-5">No se encontraron resultados</div>
              </div>

              <div v-if="userLoading" class="q-mt-md text-center">
                <q-spinner-dots color="teal-7" size="30px" />
                <div class="text-caption text-grey-6 q-mt-xs">Cargando datos...</div>
              </div>

              <div v-if="selectedUser" class="q-mt-md selected-user-card rounded-lg bg-teal-50 border-teal-200 q-pa-md">
                <div class="row items-center q-col-gutter-sm">
                  <div class="col-auto">
                    <q-avatar size="56px" class="shadow-2">
                      <img :src="selectedUser.image" />
                    </q-avatar>
                  </div>
                  <div class="col">
                    <div class="text-weight-bold text-teal-900 text-subtitle1">
                      {{ selectedUser.firstName }} {{ selectedUser.lastName }}
                    </div>
                    <div class="text-caption text-teal-700">@{{ selectedUser.username }}</div>
                  </div>
                  <div class="col-auto">
                    <q-btn flat round dense icon="close" color="teal-7" size="sm" @click="clearUser" />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-slide-transition>
        <div v-if="cartProducts.length > 0">
          <q-card class="cart-card shadow-4 rounded-2xl overflow-hidden q-mb-lg">
            <q-card-section class="bg-white q-pa-lg">
              <div class="text-h6 text-weight-bold text-slate-800 flex items-center">
                <q-icon name="inventory_2" class="q-mr-sm" color="primary" />
                Productos del Carrito
                <q-badge color="teal-6" class="q-ml-md q-py-xs q-px-sm text-weight-bold">
                  {{ totalQuantity }} artículos
                </q-badge>
              </div>
            </q-card-section>

            <q-separator />

            <q-table
              :rows="cartProducts"
              :columns="columns"
              row-key="id"
              flat
              square
              hide-pagination
              hide-bottom
              class="cart-table"
            >
              <template v-slot:body-cell-product="props">
                <q-td :props="props">
                  <div class="text-weight-medium text-slate-800">{{ props.row.title }}</div>
                </q-td>
              </template>

              <template v-slot:body-cell-quantity="props">
                <q-td :props="props" class="text-center">
                  <q-badge color="grey-2" text-color="black" class="q-py-xs q-px-sm text-weight-medium border-grey-300">
                    {{ props.row.quantity }}
                  </q-badge>
                </q-td>
              </template>

              <template v-slot:body-cell-price="props">
                <q-td :props="props" class="text-right">
                  <span class="text-weight-medium">${{ formatPrice(props.row.price) }}</span>
                </q-td>
              </template>

              <template v-slot:body-cell-subtotal="props">
                <q-td :props="props" class="text-right">
                  <span class="text-weight-bold text-teal-700">${{ formatPrice(props.row.total) }}</span>
                </q-td>
              </template>

              <template v-slot:no-data>
                <div class="q-pa-xl text-center">
                  <q-icon name="shopping_cart_off" size="64px" color="grey-4" />
                  <div class="text-h6 text-weight-bold text-grey-7 q-mt-md">Carrito vacío</div>
                  <div class="text-body2 text-grey-5 q-mt-sm">Este colaborador no tiene productos en su carrito.</div>
                </div>
              </template>

              <template v-slot:loading>
                <q-inner-loading showing color="primary">
                  <q-spinner-gears size="60px" color="primary" />
                  <div class="text-primary text-subtitle1 text-weight-bold q-mt-md">Cargando carrito...</div>
                </q-inner-loading>
              </template>
            </q-table>

            <q-separator />

            <q-card-section class="bg-white q-pa-lg">
              <div class="row items-center justify-end q-col-gutter-md">
                <div class="col-auto text-right">
                  <div class="text-caption text-grey-6 text-weight-medium text-uppercase letter-spacing-1">Total General</div>
                  <div class="text-h4 text-weight-bold text-teal-700 q-mt-xs">$ {{ formatPrice(grandTotal) }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-slide-transition>

      <q-slide-transition>
        <div v-if="selectedUser && cartProducts.length === 0 && !cartLoading">
          <q-card class="shadow-4 rounded-2xl">
            <q-card-section class="q-pa-xl text-center">
              <q-icon name="shopping_cart_off" size="80px" color="grey-4" class="q-mb-md" />
              <div class="text-h6 text-weight-bold text-grey-7">Sin Carrito de Compras</div>
              <div class="text-body2 text-grey-5 q-mt-sm">
                El colaborador {{ selectedUser.firstName }} {{ selectedUser.lastName }} no tiene carritos registrados.
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-slide-transition>

      <div v-if="!selectedUser" class="text-center text-grey-5 q-py-xl">
        <q-icon name="shopping_cart" size="80px" class="q-mb-md block" />
        <div class="text-h6 text-weight-medium">Seleccione un colaborador para ver su carrito</div>
        <div class="text-subtitle2">Use el buscador de arriba para encontrar y elegir un colaborador</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const search = ref('')
const searchResults = ref([])
const searching = ref(false)
const searched = ref(false)
const selectedUser = ref(null)
const userLoading = ref(false)
const cartData = ref([])
const cartLoading = ref(false)

let searchTimeout = null

const columns = [
  { name: 'product', label: 'Producto', field: 'title', align: 'left' },
  { name: 'quantity', label: 'Cantidad', field: 'quantity', align: 'center', style: 'width: 100px' },
  { name: 'price', label: 'Precio Unitario', field: 'price', align: 'right', style: 'width: 150px' },
  { name: 'subtotal', label: 'Subtotal', field: 'total', align: 'right', style: 'width: 150px' },
]

const cartProducts = computed(() => {
  const products = []
  for (const cart of cartData.value) {
    for (const product of cart.products) {
      products.push({
        ...product,
        cartId: cart.id,
      })
    }
  }
  return products
})

const totalQuantity = computed(() => {
  return cartProducts.value.reduce((sum, p) => sum + p.quantity, 0)
})

const grandTotal = computed(() => {
  return cartProducts.value.reduce((sum, p) => sum + p.total, 0)
})

function formatPrice(price) {
  return price.toFixed(2)
}

function onSearch(val) {
  if (!val || val.trim().length < 2) {
    searchResults.value = []
    searched.value = false
    return
  }

  searched.value = false

  if (searchTimeout) clearTimeout(searchTimeout)

  searchTimeout = setTimeout(async () => {
    searching.value = true
    try {
      const response = await fetch(`https://dummyjson.com/users/search?q=${encodeURIComponent(val)}&limit=6`)
      if (response.ok) {
        const data = await response.json()
        searchResults.value = data.users
        searched.value = true
      }
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      searching.value = false
    }
  }, 400)
}

async function selectUser(user) {
  searchResults.value = []
  search.value = `${user.firstName} ${user.lastName}`

  userLoading.value = true
  try {
    const response = await fetch(`https://dummyjson.com/users/${user.id}`)
    if (response.ok) {
      const data = await response.json()
      selectedUser.value = data
      await fetchCarts(data.id)
    } else {
      throw new Error('Error fetching user details')
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    $q.notify({
      color: 'negative',
      position: 'bottom-right',
      message: 'No se pudo cargar la información del colaborador.',
      icon: 'report_problem',
    })
  } finally {
    userLoading.value = false
  }
}

async function fetchCarts(userId) {
  cartLoading.value = true
  try {
    const response = await fetch(`https://dummyjson.com/users/${userId}/carts`)
    if (response.ok) {
      const data = await response.json()
      cartData.value = data.carts || []
    } else {
      cartData.value = []
      throw new Error('Error fetching carts')
    }
  } catch (error) {
    console.error('Error fetching carts:', error)
    $q.notify({
      color: 'negative',
      position: 'bottom-right',
      message: 'No se pudo cargar el carrito de compras.',
      icon: 'report_problem',
    })
  } finally {
    cartLoading.value = false
  }
}

function clearUser() {
  selectedUser.value = null
  search.value = ''
  searchResults.value = []
  cartData.value = []
}
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

.gap-sm {
  gap: 12px;
}

.selector-card {
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.12);
  }
}

.search-input {
  :deep(.q-field__control) {
    border-radius: 10px;
  }
}

.search-results {
  max-height: 320px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
}

.search-result-item {
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f1f5f9;
  }
}

.no-results {
  border: 1px dashed #e2e8f0;
  background-color: #fafafa;
}

.selected-user-card {
  border: 1px solid #b2dfdb;
}

.cart-card {
  border: 1px solid rgba(226, 232, 240, 0.8);
  background-color: white;
}

.cart-table {
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
      background-color: #f8fafc;
    }
  }

  :deep(tbody td) {
    padding: 14px 16px;
    border-bottom: 1px solid #f1f5f9;
  }
}

.border-grey-300 {
  border: 1px solid #e2e8f0;
}

.block {
  display: block;
}

.rounded-t-xl {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}
</style>
